# Deploy Big Day Studios

## 1. Push to GitHub ([DesikanJ](https://github.com/DesikanJ))

### Create the repository (one time)

1. Sign in at https://github.com/DesikanJ
2. Click **New repository**
3. Name: `big-day-studios`
4. Visibility: **Public** (required for free Cloudflare Pages on personal accounts) or Private if you use a paid plan
5. Do **not** add README, .gitignore, or license (this project already has them)
6. Click **Create repository**

### Push from your PC

```powershell
cd c:\BigDayStudios
git remote add origin https://github.com/DesikanJ/big-day-studios.git
git branch -M main
git push -u origin main
```

If prompted, sign in with GitHub (browser or personal access token).

---

## 2. Cloudflare Pages (free hosting)

### Important: use **Pages**, not **Worker**

If you see **"Create a Worker"** and only a single **Build command** field (no output directory), you are in the **Worker** flow. That is the wrong type for this Astro **static** site.

1. Click **Back** until you can exit, or open: [Create a Pages project](https://dash.cloudflare.com/?to=/:account/pages/new)
2. Choose **Connect to Git** (not "Create Worker")
3. Select **DesikanJ/big-day-studios**

You should then see **Framework preset**, **Build command**, **Build output directory**, etc.

### If the UI only shows "Build command"

Enter:

```
npm run build
```

This repo also includes `wrangler.toml` (`pages_build_output_dir = "./dist"`) and `.node-version` (`20`) so Cloudflare can pick up output folder and Node without extra fields.

### Full build settings (when visible)

| Setting | Value |
|---------|--------|
| Framework preset | Astro (or None) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` (or set env var `NODE_VERSION` = `20` under **Settings → Environment variables**) |

5. **Environment variables** (Production):

   ```
   PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
   PUBLIC_WEB3FORMS_ACCESS_KEY=your_key
   PUBLIC_SITE_URL=https://your-domain.com
   ```

6. Deploy → note the `*.pages.dev` URL

---

## 3. Connect GoDaddy domain

1. In Cloudflare Pages → your project → **Custom domains** → add your domain
2. At **GoDaddy** → DNS for your domain:
   - **Option A (recommended):** Change nameservers to Cloudflare (Cloudflare will show the values)
   - **Option B:** Keep GoDaddy DNS; add CNAME `www` → `big-day-studios.pages.dev` and redirect apex per Cloudflare instructions

3. Update `PUBLIC_SITE_URL`, `astro.config.mjs` `site`, and `public/sitemap.xml` to your live domain

---

## 4. After launch checklist

- [ ] Real WhatsApp number in env
- [ ] Replace `public/images/` with studio stills (or Cloudinary)
- [ ] Web3Forms key for contact page
- [ ] Test PageSpeed on mobile: https://pagespeed.web.dev/
- [ ] Google Business Profile link in footer (optional)
