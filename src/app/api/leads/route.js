import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request-info";

const LEAD_WINDOW_MS = 60_000;
const LEAD_ATTEMPT_LIMIT = 20;

const CRM_URL = process.env.CRM_LEADS_URL || "https://leads.dizitaladda.com/api/public/leads";
const DEFAULT_SOURCE = process.env.CRM_SOURCE || "main website";
const DEFAULT_DOMAIN = process.env.CRM_DOMAIN || "nifase";

const toText = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return String(value);
};

const trimOrEmpty = (value) => toText(value).trim();

const truncate = (value, maxLen = 4000) => {
  const text = toText(value);
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen);
};

export async function POST(request) {
  const ip = await getClientIp(request);

  const isAllowed = rateLimit({
    key: `leads:${ip}`,
    limit: LEAD_ATTEMPT_LIMIT,
    windowMs: LEAD_WINDOW_MS,
  });

  if (!isAllowed) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = trimOrEmpty(body?.name);
  const email = trimOrEmpty(body?.email);
  const phone = trimOrEmpty(body?.phone || body?.phoneRaw);

  if (!name && !email && !phone) {
    return NextResponse.json({ error: "Missing required contact fields" }, { status: 400 });
  }

  const payload = {
    name,
    email,
    phone,
    source: DEFAULT_SOURCE,
    domain: DEFAULT_DOMAIN,
    course: trimOrEmpty(body?.course),
    message: trimOrEmpty(body?.message || body?.subject),
    subject: trimOrEmpty(body?.subject),
    form: trimOrEmpty(body?.form || "lead-form"),
    contextTitle: trimOrEmpty(body?.contextTitle),
    pageUrl: trimOrEmpty(body?.pageUrl),
    submittedAt: new Date().toISOString(),
    ip,
    userAgent: truncate(request.headers.get("user-agent") || ""),
    referer: truncate(request.headers.get("referer") || ""),
  };

  try {
    const upstream = await fetch(CRM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await upstream.text();
    let json = null;
    try {
      json = JSON.parse(text);
    } catch {
      // Non-JSON response
    }

    if (!upstream.ok) {
      console.error("POST /api/leads: CRM endpoint error", upstream.status, text);
      return NextResponse.json(
        { error: json?.message || json?.error || "Unable to record lead in CRM" },
        { status: upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502 }
      );
    }

    if (json && json.success === false) {
      return NextResponse.json({ error: json.error || json.message || "Unable to record lead" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, success: true });
  } catch (error) {
    console.error("POST /api/leads failed to reach CRM", error);
    return NextResponse.json({ error: "Unable to connect to CRM endpoint" }, { status: 502 });
  }
}
