# Cloudinary galleries — your checklist

Your Media Library folders map to website galleries like this:

| Cloudinary folder | Website URL |
|-------------------|-------------|
| Wedding | `/gallery/wedding/` |
| Maternity | `/gallery/maternity/` |
| Baby Photoshoot | `/gallery/baby-photoshoot/` |
| Birthday | `/gallery/birthday/` |
| Family Photoshoot | `/gallery/family-photoshoot/` |
| Celebrity | `/gallery/celebrity/` |
| **samples** | *not used* |

Folder names must match **exactly** (capital letters and spaces).

---

## What you do (one-time setup)

### 1. Cloudinary account

1. Log in at [cloudinary.com](https://cloudinary.com)
2. Upload photos into each folder (as in your screenshot)
3. Do **not** rely on the `samples` folder for the live site

### 2. API keys (for sync script)

1. **Settings** → **API Keys**
2. Copy **Cloud name**, **API Key**, **API Secret**

### 3. Local `.env` file

In `c:\BigDayStudios\.env` add:

```env
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Your folders are under **Home** (e.g. `Wedding`, `Baby Photoshoot`). You do **not** need `PUBLIC_CLOUDINARY_FOLDER` — the sync script uses Cloudinary’s **asset folder** labels, not file paths.

If sync shows `0 images` but you see files in the UI, wait until uploads finish (check the upload bar at the bottom of Cloudinary), then run sync again.

### 4. Run sync on your PC

```powershell
cd c:\BigDayStudios
npm install
npm run sync:galleries
```

You should see counts per folder, e.g. `Wedding → 42 image(s)`.

### 5. Push to GitHub

```powershell
git add src/data/galleries.generated.ts
git commit -m "Sync gallery photos from Cloudinary"
git push
```

Cloudflare rebuilds automatically.

### 6. Cloudflare production env (for fast images on the live site)

In **Workers & Pages** → **big-day-studios** → **Settings** → **Environment variables**:

| Variable | Value |
|----------|--------|
| `PUBLIC_CLOUDINARY_CLOUD_NAME` | same as above |
| `PUBLIC_CLOUDINARY_FOLDER` | only if you use a parent folder |

Do **not** put API Secret in Cloudflare unless you run sync in CI (optional). Secret is only needed on your machine for `sync:galleries`.

**Critical:** `PUBLIC_CLOUDINARY_CLOUD_NAME` must be set on Cloudflare or the site will look for images at `/images/...` and show broken/placeholder photos only.

Do **not** set `PUBLIC_CLOUDINARY_FOLDER` unless your files live under a parent folder. Your photos are at the account root (`TruptiRw11woborder-1_v3auwo`), not `big-day/...`.

---

## When you add new photos later

1. Upload to the right Cloudinary folder  
2. Run `npm run sync:galleries`  
3. Commit `galleries.generated.ts` and push  

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `0 image(s)` for a folder | Folder name mismatch — must match table above |
| Images in `big-day/Wedding` but sync finds 0 | Set `PUBLIC_CLOUDINARY_FOLDER=big-day` |
| Gallery page empty | Run sync and push `galleries.generated.ts` |
| Broken images on site | Set `PUBLIC_CLOUDINARY_CLOUD_NAME` in Cloudflare |
