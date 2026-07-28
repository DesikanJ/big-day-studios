# How to update photos on Big Day Studios

## Cloudinary (main photo workflow)

Photos live in Cloudinary folders: Wedding, Maternity, Baby Photoshoot, Birthday, Family Photoshoot, Celebrity.

| Change | What to do |
|--------|------------|
| **Replace** a photo (same public ID) | Nothing — hard-refresh the site (Ctrl+Shift+R) |
| **Add / delete / rename** | Automatic if near-real-time sync is set up (see [`REALTIME-GALLERY-SYNC.md`](./REALTIME-GALLERY-SYNC.md)). Otherwise run sync below. |

### Manual sync (if automation is not set up yet)

```powershell
cd c:\BigDayStudios
npm run sync:galleries
git add src/data/galleries.generated.ts
git commit -m "Sync gallery photos"
git push
```

Cloudflare rebuilds in ~1–2 minutes.

### Aspect ratios (avoid trimming)

| Placement | Ratio | Size |
|-----------|-------|------|
| Gallery grid | **4∶3** | **2400×1800** |
| Services cover (first photo in folder) | **370∶407** | **1850×2035** |

Full near-real-time setup: **[`REALTIME-GALLERY-SYNC.md`](./REALTIME-GALLERY-SYNC.md)**

---

## Local files in `public/images/` (hero, banners)

1. Replace JPEGs/PNGs in `public/images/`
2. Commit and push:

```powershell
cd c:\BigDayStudios
git add public/images
git commit -m "Update portfolio photos"
git push
```
