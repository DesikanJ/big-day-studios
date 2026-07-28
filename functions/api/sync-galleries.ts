/**
 * Cloudinary notification webhook → triggers GitHub gallery sync.
 *
 * Configure in Cloudinary (Settings → Upload → Notifications):
 *   Notification URL:
 *   https://bigdaystudios.in/api/sync-galleries?secret=YOUR_SYNC_WEBHOOK_SECRET
 *
 * Cloudflare Pages env (Production):
 *   SYNC_WEBHOOK_SECRET     — shared secret in the URL above
 *   GITHUB_SYNC_TOKEN       — GitHub PAT with `repo` scope (or fine-grained: contents write + actions write)
 *   GITHUB_REPO             — optional, default DesikanJ/big-day-studios
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret') || request.headers.get('x-sync-secret');

  if (!env.SYNC_WEBHOOK_SECRET || secret !== env.SYNC_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!env.GITHUB_SYNC_TOKEN) {
    return new Response(JSON.stringify({ ok: false, error: 'GITHUB_SYNC_TOKEN not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const repo = env.GITHUB_REPO || 'DesikanJ/big-day-studios';

  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.GITHUB_SYNC_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'big-day-studios-sync-webhook',
    },
    body: JSON.stringify({ event_type: 'cloudinary-sync' }),
  });

  if (!res.ok) {
    const body = await res.text();
    return new Response(JSON.stringify({ ok: false, status: res.status, body }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message: 'Gallery sync triggered. Site updates in ~2–4 minutes after the workflow finishes.',
    }),
    { status: 202, headers: { 'Content-Type': 'application/json' } },
  );
}

/** Health check / easy browser test (still requires secret) */
export async function onRequestGet(context) {
  return onRequestPost(context);
}
