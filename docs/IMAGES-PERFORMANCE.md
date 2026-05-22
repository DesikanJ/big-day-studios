# Best-quality photos without lag

## The short answer

| Approach | Quality | Speed | Best for |
|----------|---------|-------|----------|
| **Cloudinary** (recommended) | Excellent per device | Fast CDN | Many photos, easy updates |
| Local PNG in `public/images/` | Heavy files | Slow on mobile | Launch / dev only |
| Build-time WebP (Astro assets) | Good | Fast | Small sites, few images |

For a photography studio, **use Cloudinary on the free tier** and keep `PUBLIC_CLOUDINARY_CLOUD_NAME` set in Cloudflare.

---

## What the site does automatically

When Cloudinary is configured, each photo uses:

1. **`srcset`** — browser picks 320w … 1920w based on screen and `sizes`
2. **`f_auto`** — AVIF or WebP on modern phones, JPEG fallback elsewhere
3. **`q_auto:good`** — sharp look, smaller than raw JPEG
4. **`c_limit`** — never upscale a small file (no blurry stretch)
5. **`dpr_auto`** — crisp on Retina without sending huge files to every phone
6. **LQIP blur** — tiny blurred preview, then fade-in (feels instant)
7. **`loading="lazy"`** — below-fold images load only when scrolled near
8. **`fetchpriority="high"`** — hero/LCP image loads first

---

## Cloudflare setup (5 minutes)

1. [cloudinary.com](https://cloudinary.com) → sign up (free)
2. Upload folders: `big-day/wedding/`, `big-day/maternity/`, etc.
3. Cloudflare → **big-day-studios** → **Environment variables**:

   ```
   PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   PUBLIC_CLOUDINARY_FOLDER=big-day
   ```

4. In `src/data/galleries.ts`, use public IDs:

   ```ts
   { src: 'wedding/IMG_001.jpg', alt: '...', width: 4000, height: 2667 }
   ```

5. Redeploy. URLs become `res.cloudinary.com/...` automatically.

---

## Export settings from Lightroom (studio workflow)

- **Format:** JPEG (not PNG for photos)
- **Long edge:** 2500–4000px for gallery masters
- **Quality:** 80–85%
- **sRGB** color space
- One folder per category → upload batch to Cloudinary

Avoid putting 5MB+ PNGs in Git — they slow builds and mobile loads.

---

## `sizes` attribute (important)

Tell the browser how wide the image will appear on screen. Examples already in components:

- Hero tiles: `180px`
- Gallery grid: `(max-width: 640px) 100vw, 33vw`
- Category card: `(max-width: 640px) 100vw, 280px`

Wrong `sizes` = wrong file picked = lag or soft images.

---

## Check performance after changes

- [PageSpeed Insights](https://pagespeed.web.dev/) — mobile, home + one gallery URL
- Target: **LCP &lt; 2.5s**, no “serve images in next-gen formats” warning once Cloudinary is on

---

## Optional upgrades later

- **Cloudflare Polish** (paid) — extra optimization at edge
- **Sanity CMS** — swap photos without Git
- **Native `<picture>`** — only needed if not using Cloudinary `f_auto`
