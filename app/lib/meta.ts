// ─────────────────────────────────────────────────────────────────────────────
// Meta (Facebook) Lead Ads helper. The leadgen webhook only sends a leadgen_id,
// so we fetch the lead's field_data from the Graph API with the page token, then
// normalize it into our LeadMapped shape (tolerant of Meta field-name variations).
// ─────────────────────────────────────────────────────────────────────────────

import type { LeadMapped } from "./jobber";

export type MetaField = { name: string; values: string[] };

export async function fetchLead(leadgenId: string): Promise<{ id: string; field_data: MetaField[]; [k: string]: any }> {
  const version = process.env.META_GRAPH_VERSION || "v21.0";
  const token = process.env.META_PAGE_TOKEN;
  if (!token) throw new Error("META_PAGE_TOKEN env var is not set.");
  const url =
    `https://graph.facebook.com/${version}/${encodeURIComponent(leadgenId)}` +
    `?fields=field_data,created_time,form_id,ad_id&access_token=${encodeURIComponent(token)}`;
  const res = await fetch(url);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) {
    throw new Error(`Meta lead fetch failed (${res.status}): ${JSON.stringify(json.error || json)}`);
  }
  return json;
}

// Normalize Meta's field_data (name/values pairs) into the fields Jobber needs.
// Meta field names vary by form, so match loosely (exact, then substring).
export function mapLeadFields(fieldData: MetaField[]): LeadMapped {
  const get = (...keys: string[]): string => {
    for (const key of keys) {
      // exact match first
      const exact = fieldData.find((f) => f.name?.toLowerCase().replace(/\s+/g, "_") === key);
      if (exact) return (exact.values?.[0] || "").trim();
    }
    for (const key of keys) {
      // then substring match
      const fuzzy = fieldData.find((f) => f.name?.toLowerCase().includes(key.replace(/_/g, " ")) || f.name?.toLowerCase().includes(key));
      if (fuzzy) return (fuzzy.values?.[0] || "").trim();
    }
    return "";
  };

  const fullName = get("full_name", "name");
  let firstName = get("first_name");
  let lastName = get("last_name");
  if (!firstName && fullName) {
    const i = fullName.indexOf(" "); // split on the FIRST space
    firstName = i === -1 ? fullName : fullName.slice(0, i);
    lastName = i === -1 ? "" : fullName.slice(i + 1).trim();
  }

  const description = get("description_of_work", "description", "work", "message", "details", "project", "notes");

  return {
    firstName: firstName || "Lead",
    lastName,
    email: get("email") || undefined,
    phone: get("phone_number", "phone") || undefined,
    street: get("street_address", "street", "address") || undefined,
    city: get("city") || undefined,
    province: get("state", "province") || undefined,
    postalCode: get("zip_code", "zip", "postal_code", "post_code") || undefined,
    note: description || "Website lead — landscaping",
  };
}
