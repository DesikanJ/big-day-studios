# How to update photos on Big Day Studios

You can replace images **any time**. After you push to GitHub, Cloudflare rebuilds the site in about 1–2 minutes.

## Method 1 — Replace files (easiest)

1. Export photos from Lightroom (or phone) as **JPEG**, long edge **1600–2000px**.
2. Copy files into `public/images/` (overwrite old names or use new names).
3. If you use **new filenames**, update the lists below.
4. Commit and push:

```powershell
cd c:\BigDayStudios
git add public/images
git commit -m "Update portfolio photos"
git push
```

### Common files

| File | Used on |
|------|---------|
| `hero-1.png` … `hero-5.png` | Home page collage |
| `category-wedding.png` | Wedding service card |
| `category-maternity.png` | Maternity service card |
| `gallery-1.png` … `gallery-6.png` | Home “Our Works” + gallery pages |
| `why-choose.png` | Why Choose us section |
| `cta-banner.png` | Bottom banner |
| `testimonial-avatar.png` | Review card (small square) |

### Gallery pages (per category)

Edit `src/data/galleries.ts` — each photo needs:

```ts
{ src: 'your-file.jpg', alt: 'Short description for SEO', width: 1600, height: 1067 }
```

`width` / `height` should match the real image ratio (prevents layout shift). Example: 1600×1067 ≈ 3:2 landscape.

### Service card covers

Edit `src/data/categories.ts` → `coverImage: 'your-wedding-cover.jpg'`.

---

## Method 2 — Cloudinary (many photos)

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier).
2. Upload folders: `big-day/wedding/`, `big-day/maternity/`, etc.
3. In Cloudflare → **Environment variables**:
   - `PUBLIC_CLOUDINARY_CLOUD_NAME` = your cloud name
   - `PUBLIC_CLOUDINARY_FOLDER` = `big-day`
4. In `galleries.ts`, use public IDs instead of local names:

```ts
{ src: 'wedding/IMG_0123', alt: '...', width: 1600, height: 1067 }
```

Redeploy after changing env vars.

---

## Tips for best look

- **Landscape** for banners and service cards (3:2).
- **Portrait** OK for hero collage tiles.
- Avoid tiny images — they get upscaled and look soft.
- Keep files under ~500 KB each (compress at [squoosh.app](https://squoosh.app) if needed).

---

## Wrong image on a category?

The site does not auto-match photos to “Wedding” / “Maternity” — you assign them in `categories.ts` and `galleries.ts`. Use the correct cover and gallery list per category.
