# Big Day Studios — Website

Performance-focused marketing site for **Big Day Studios** (Chennai photography). Built with [Astro](https://astro.build) for fast ad landing pages and gallery browsing.

## Stack (free tier)

| Layer | Service |
|-------|---------|
| Site | Astro static |
| Host | [Cloudflare Pages](https://pages.cloudflare.com) |
| DNS | Cloudflare (domain stays at GoDaddy) |
| Images (optional) | [Cloudinary](https://cloudinary.com) |
| Contact form | [Web3Forms](https://web3forms.com) |

## Quick start

```bash
cd c:\BigDayStudios
npm install
cp .env.example .env
# Edit .env — WhatsApp number, form key, Cloudinary (optional)
npm run dev
```

Open http://localhost:4321

## Environment variables

Copy `.env.example` to `.env`:

- `PUBLIC_WHATSAPP_NUMBER` — e.g. `919876543210` (no + or spaces)
- `PUBLIC_WEB3FORMS_ACCESS_KEY` — from web3forms.com (free)
- `PUBLIC_CLOUDINARY_CLOUD_NAME` — when you move images off the repo
- `PUBLIC_SITE_URL` — production URL for SEO

Without Cloudinary, images load from `public/images/` (Figma exports included for launch).

## Adding photos

See **[docs/UPDATE-IMAGES.md](docs/UPDATE-IMAGES.md)** for step-by-step instructions.

For fast, sharp photos on every device, see **[docs/IMAGES-PERFORMANCE.md](docs/IMAGES-PERFORMANCE.md)** (Cloudinary recommended).

To pull all category folders from Cloudinary into gallery pages, see **[docs/CLOUDINARY-GALLERIES.md](docs/CLOUDINARY-GALLERIES.md)**.

1. **Launch:** Replace files in `public/images/` or edit `src/data/galleries.ts`.
2. **Scale:** Upload to Cloudinary under folder `big-day/`, set `PUBLIC_CLOUDINARY_CLOUD_NAME`, use public IDs in `galleries.ts` (e.g. `wedding/IMG_001`).

Category covers: `src/data/categories.ts`.

## GitHub

Repository (create if missing): **[github.com/DesikanJ/big-day-studios](https://github.com/DesikanJ/big-day-studios)**

```powershell
cd c:\BigDayStudios
git remote add origin https://github.com/DesikanJ/big-day-studios.git   # skip if already added
git branch -M main
git push -u origin main
```

Create the empty repo first: [New repository](https://github.com/new?name=big-day-studios&description=Big+Day+Studios+photography+website) (no README/license). Full steps: see **DEPLOY.md**.

## Deploy to Cloudflare Pages

1. Push this repo to GitHub (see above).
2. Cloudflare Dashboard → Pages → Create project → Connect GitHub.
3. Build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
   - **Node version:** 20
4. Add environment variables (same as `.env`).
5. GoDaddy → point domain nameservers to Cloudflare (or CNAME `www` to Pages URL).

## Project structure

```
src/
  components/   # Hero, categories, gallery grid, etc.
  data/         # categories.ts, galleries.ts
  layouts/      # BaseLayout
  pages/        # Routes
  lib/          # Cloudinary helpers
public/images/  # Static photos (replace with real stills)
```

## Performance notes

- Static HTML; minimal JS (mobile menu only).
- Responsive images via `srcset` + lazy loading.
- Set real WhatsApp number before running ads.
- Run [PageSpeed Insights](https://pagespeed.web.dev/) on `/` and gallery URLs after deploy.

## License

Private — Big Day Studios.
