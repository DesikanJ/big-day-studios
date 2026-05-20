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

1. Create a free account at https://dash.cloudflare.com
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Authorize GitHub and select **DesikanJ/big-day-studios**
4. Build settings:

   | Setting | Value |
   |---------|--------|
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Node version | 20 |

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
