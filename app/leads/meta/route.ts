// /leads/meta
//   GET  — Meta webhook verification handshake (hub.mode / hub.verify_token / hub.challenge)
//   POST — leadgen notification: { entry[].changes[].value.leadgen_id }
//          → fetch the lead from the Graph API → create Jobber client + work request.

import { fetchLead, mapLeadFields } from "../../lib/meta";
import { getJobberAccessToken, createClientAndRequest } from "../../lib/jobber";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Hardcoded default per spec; overridable via env. This is the value to give Meta
// when subscribing AOB's page to leadgen events.
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "d942ce33aca980c8a005d1350aad88f4";

// ── Webhook verification ──
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge || "", { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response("Forbidden", { status: 403 });
}

// ── Lead intake ──
export async function POST(req: Request) {
  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return new Response("ok", { status: 200 });
  }

  try {
    const leadIds: string[] = [];
    for (const entry of body?.entry || []) {
      for (const change of entry?.changes || []) {
        if (change?.field === "leadgen" && change?.value?.leadgen_id) {
          leadIds.push(String(change.value.leadgen_id));
        }
      }
    }

    for (const leadId of leadIds) {
      try {
        const lead = await fetchLead(leadId);
        const mapped = mapLeadFields(lead.field_data || []);
        const token = await getJobberAccessToken();
        const result = await createClientAndRequest(token, mapped);
        console.log("Lead → Jobber OK:", leadId, JSON.stringify(result), "fields:", JSON.stringify(mapped));
      } catch (e: any) {
        // Log loudly; keep going so one bad lead doesn't block others.
        console.error("Lead → Jobber FAILED:", leadId, e?.message, e);
      }
    }
  } catch (e: any) {
    console.error("Webhook handler error:", e?.message, e);
  }

  // Always 200 so Meta doesn't retry (avoids duplicate Jobber clients). Failures are logged.
  return new Response("ok", { status: 200 });
}
