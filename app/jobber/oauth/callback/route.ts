// GET /jobber/oauth/callback
// One-time use. AOB clicks the Jobber authorize link; Jobber redirects here with
// ?code=...  We exchange it for tokens and surface the STABLE refresh token so it
// can be saved into the JOBBER_REFRESH_TOKEN env var (rotation is off → it lasts).

import { exchangeCode } from "../../../lib/jobber";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(body: string, status = 200) {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
     <title>Jobber connection</title>
     <style>body{font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:48px auto;padding:0 20px;line-height:1.6;color:#111}
     code{background:#f3f4f6;padding:2px 6px;border-radius:4px}textarea{font-family:ui-monospace,monospace;font-size:13px;padding:10px;border:1px solid #d1d5db;border-radius:8px}</style>
     </head><body>${body}</body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function esc(s: string) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const err = url.searchParams.get("error");

  if (err) return page(`<h1>Authorization failed</h1><p><code>${esc(err)}</code></p>`, 400);
  if (!code) return page(`<h1>Missing code</h1><p>No <code>?code</code> on the callback.</p>`, 400);

  const redirectUri = process.env.JOBBER_REDIRECT_URI || `${url.origin}/jobber/oauth/callback`;

  try {
    const tokens = await exchangeCode(code, redirectUri);
    // Surface for the operator (also in server logs). Rotation is off, so this is stable.
    console.log("JOBBER_REFRESH_TOKEN =", tokens.refresh_token);
    return page(`
      <h1>✅ Jobber connected for AOB</h1>
      <p>Save this <strong>refresh token</strong> into the <code>JOBBER_REFRESH_TOKEN</code> environment variable, then redeploy. The lead webhook uses it to mint a fresh access token for every lead.</p>
      <textarea readonly rows="4" style="width:100%" onclick="this.select()">${esc(tokens.refresh_token)}</textarea>
      <p style="color:#6b7280;font-size:14px">Rotation is off, so this token stays valid — you only do this once.</p>
    `);
  } catch (e: any) {
    console.error("Jobber OAuth callback error:", e);
    return page(`<h1>Token exchange failed</h1><p><code>${esc(e?.message || "unknown error")}</code></p>`, 500);
  }
}
