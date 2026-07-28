# Near real-time Cloudinary → website sync

Gallery photo **lists** are baked into the site at build time. This setup keeps them close to real time without running sync by hand.

## What updates how fast

| Change in Cloudinary | Speed |
|----------------------|--------|
| Replace image (same public ID) | **Instant** (CDN). Hard-refresh browser. |
| Add / delete / rename photos | **~2–4 minutes** via auto sync + Cloudflare rebuild |

## What we set up

1. **GitHub Action** (`.github/workflows/sync-galleries.yml`)
   - Runs every **15 minutes**
   - Can be run manually (Actions → Sync Cloudinary galleries → Run workflow)
   - Can be triggered by webhook (`repository_dispatch`)

2. **Webhook endpoint** (`/api/sync-galleries`)
   - Cloudinary calls this on upload/delete
   - Endpoint tells GitHub to run the sync workflow

---

## One-time setup

### A. GitHub secrets

Repo → **Settings** → **Secrets and variables** → **Actions** → add:

| Secret | Value |
|--------|--------|
| `PUBLIC_CLOUDINARY_CLOUD_NAME` | `dtpsk76yw` |
| `CLOUDINARY_API_KEY` | from Cloudinary API keys |
| `CLOUDINARY_API_SECRET` | from Cloudinary API keys |

### B. Cloudflare Pages env (Production)

**Workers & Pages** → **big-day-studios** → **Settings** → **Environment variables**:

| Variable | Value |
|----------|--------|
| `SYNC_WEBHOOK_SECRET` | long random string (you invent) |
| `GITHUB_SYNC_TOKEN` | GitHub Personal Access Token with permission to trigger workflows on this repo (`repo` scope, or fine-grained: Contents read/write + Actions write) |
| `GITHUB_REPO` | `DesikanJ/big-day-studios` (optional if that is the default) |

Redeploy Pages after adding env vars so the Function picks them up.

### C. Cloudinary notification URL

Cloudinary → **Settings** → **Upload** → **Notifications** (or Media Library notifications):

```text
https://bigdaystudios.in/api/sync-galleries?secret=YOUR_SYNC_WEBHOOK_SECRET
```

Use the same secret as `SYNC_WEBHOOK_SECRET`.

Enable notifications for upload / delete / rename if those options are available.

---

## After setup

1. Upload or delete photos in Cloudinary folders (Wedding, Birthday, etc.)
2. Webhook fires → GitHub syncs `galleries.generated.ts` → push → Cloudflare rebuilds
3. Wait **2–4 minutes**, then hard-refresh the site

If the webhook is not configured, the **15-minute schedule** still picks up changes automatically.

---

## Manual trigger

GitHub → **Actions** → **Sync Cloudinary galleries** → **Run workflow**

Or locally:

```powershell
cd c:\BigDayStudios
npm run sync:galleries
git add src/data/galleries.generated.ts
git commit -m "Sync gallery photos"
git push
```
