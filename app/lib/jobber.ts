// ─────────────────────────────────────────────────────────────────────────────
// Jobber API helper — OAuth (authorization_code + refresh_token) and the
// GraphQL mutations that turn a Meta lead into a Jobber client + work request.
//
// Token model: Jobber access tokens expire after ~60 min. Refresh-token ROTATION
// IS OFF, so the refresh token stays stable. We therefore store ONLY the stable
// refresh token (in the JOBBER_REFRESH_TOKEN env var, captured once via the OAuth
// callback) and mint a fresh access token on demand for each lead. No database.
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN_URL = "https://api.getjobber.com/api/oauth/token";
const GRAPHQL_URL = "https://api.getjobber.com/api/graphql";
const GRAPHQL_VERSION = "2025-04-16"; // X-JOBBER-GRAPHQL-VERSION

export type JobberTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type?: string;
};

export type LeadMapped = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  province?: string; // US state
  postalCode?: string;
  note: string;
};

function creds() {
  const client_id = process.env.JOBBER_CLIENT_ID;
  const client_secret = process.env.JOBBER_CLIENT_SECRET;
  if (!client_id || !client_secret) {
    throw new Error("JOBBER_CLIENT_ID / JOBBER_CLIENT_SECRET env vars are not set.");
  }
  return { client_id, client_secret };
}

// One-time: exchange the OAuth code (from the callback) for tokens.
export async function exchangeCode(code: string, redirectUri: string): Promise<JobberTokens> {
  const { client_id, client_secret } = creds();
  const body = new URLSearchParams({
    client_id,
    client_secret,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) {
    throw new Error(`Jobber token exchange failed (${res.status}): ${JSON.stringify(json)}`);
  }
  return json as JobberTokens;
}

// Per-call: trade the stable refresh token for a fresh access token.
export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const { client_id, client_secret } = creds();
  const body = new URLSearchParams({
    client_id,
    client_secret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) {
    throw new Error(`Jobber token refresh failed (${res.status}): ${JSON.stringify(json)}`);
  }
  return json.access_token as string;
}

// The token the lead webhook uses (AOB's stored, stable refresh token).
export async function getJobberAccessToken(): Promise<string> {
  const rt = process.env.JOBBER_REFRESH_TOKEN;
  if (!rt) {
    throw new Error(
      "JOBBER_REFRESH_TOKEN is not set — AOB must complete the one-time authorization at /jobber/oauth/callback, then that refresh token goes in the env var."
    );
  }
  return refreshAccessToken(rt);
}

export async function jobberGraphQL(accessToken: string, query: string, variables: Record<string, unknown>): Promise<any> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-JOBBER-GRAPHQL-VERSION": GRAPHQL_VERSION,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json().catch(() => ({}));
  if (json.errors) console.error("Jobber GraphQL errors:", JSON.stringify(json.errors));
  return json;
}

const CLIENT_CREATE = `
mutation CreateClient($input: ClientCreateInput!) {
  clientCreate(input: $input) {
    client { id firstName lastName properties(first: 1) { nodes { id } } }
    userErrors { message path }
  }
}`;

const REQUEST_CREATE = `
mutation CreateRequest($input: RequestCreateInput!) {
  requestCreate(input: $input) {
    request { id }
    userErrors { message path }
  }
}`;

// Creates the client (with a property at the lead's address) then a work request.
export async function createClientAndRequest(token: string, lead: LeadMapped) {
  // ── 1) Client (+ property) ──
  const clientInput: any = { firstName: lead.firstName || "Lead", lastName: lead.lastName || "" };
  if (lead.email) clientInput.emails = [{ description: "MAIN", primary: true, address: lead.email }];
  if (lead.phone) clientInput.phones = [{ description: "MAIN", primary: true, number: lead.phone }];
  if (lead.street || lead.city || lead.postalCode) {
    clientInput.properties = [
      {
        address: {
          street1: lead.street || undefined,
          city: lead.city || undefined,
          province: lead.province || undefined,
          postalCode: lead.postalCode || undefined,
          country: "United States",
        },
      },
    ];
  }

  const cRes = await jobberGraphQL(token, CLIENT_CREATE, { input: clientInput });
  const clientPayload = cRes?.data?.clientCreate;
  const cErrors = clientPayload?.userErrors;
  if (cErrors?.length) throw new Error(`clientCreate userErrors: ${JSON.stringify(cErrors)}`);
  const clientId = clientPayload?.client?.id;
  const propertyId = clientPayload?.client?.properties?.nodes?.[0]?.id;
  if (!clientId) throw new Error(`clientCreate returned no client id: ${JSON.stringify(cRes)}`);

  // ── 2) Work request ──
  const requestInput: any = {
    clientId,
    title: "Website Lead — Landscaping",
    instructions: lead.note,
  };
  if (propertyId) requestInput.propertyId = propertyId;

  const rRes = await jobberGraphQL(token, REQUEST_CREATE, { input: requestInput });
  const requestPayload = rRes?.data?.requestCreate;
  const rErrors = requestPayload?.userErrors;
  if (rErrors?.length) throw new Error(`requestCreate userErrors: ${JSON.stringify(rErrors)}`);
  const requestId = requestPayload?.request?.id;

  return { clientId, propertyId, requestId };
}
