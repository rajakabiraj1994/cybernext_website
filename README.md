# CYBERNEXT 2026 — event website

Single-page site for **CYBERNEXT 2026 · Beyond Compliance**
9th October 2026 · 5:00 p.m. – 9:00 p.m. · Hotel Altair, Kolkata · By Invitation Only

Built with React + Vite + Tailwind CSS. Fonts (Space Grotesk, Inter) are bundled, so the site has no external dependencies.

## Quick start: just upload

The ready-to-host site is in **`dist/`**. Upload the *contents* of `dist/` to your web root (e.g. `public_html/` on cPanel, or drag the folder into Netlify Drop). No server-side code is needed.

## Editing content

Everything you are likely to change lives in **`src/config.ts`**:

| Setting | What it does |
| --- | --- |
| `EVENT` | Date, time, venue, audience number, countdown start time |
| `REGISTRATION_ENDPOINT` | URL of your backend. The form POSTs JSON here. |
| `EXTERNAL_REGISTRATION_URL` | Use a Google Form / Typeform instead. All "Request invite" buttons open it. |
| `CONTACTS` | Names, phones and emails in the footer |

While both registration settings are empty, the form validates normally and then shows a "Registrations open shortly" message; it never pretends to submit.

**Form payload** sent to `REGISTRATION_ENDPOINT`:

```json
{ "fullName": "", "designation": "", "organisation": "", "email": "", "phone": "",
  "industry": "", "consent": true, "submittedAt": "2026-10-01T10:00:00.000Z" }
```

Any 2xx response is shown as success. Your endpoint must allow CORS from `https://www.cybernext.co.in`.

Speakers: edit the `Speakers()` section in `src/App.tsx` once names are confirmed.

After editing, rebuild:

```bash
npm install
npm run build      # outputs to dist/
npm run dev        # local preview at http://localhost:5173
```

## Pointing www.cybernext.co.in at the site

Do this at your domain registrar (where cybernext.co.in was bought). Exact values come from your host.

**Netlify / Vercel / Cloudflare Pages**
1. Add `www.cybernext.co.in` as a custom domain in the host's dashboard.
2. At the registrar, add a `CNAME` record: host `www` → the target the host gives you (e.g. `your-site.netlify.app` or `cname.vercel-dns.com`).
3. For the bare domain `cybernext.co.in`, add the `A` record the host lists, and set it to redirect to `www`.
4. Turn on HTTPS in the host dashboard (free certificate, usually automatic).

**cPanel / shared hosting**
1. Upload the contents of `dist/` to `public_html/`.
2. At the registrar, point `cybernext.co.in` (A record) and `www` (CNAME to `cybernext.co.in`) to your hosting server's IP.
3. Enable AutoSSL / Let's Encrypt in cPanel.

DNS changes can take a few minutes to 24 hours to take effect.

## Files

```
public/img/      logos (official files, cropped/resized only) and Kolkata skyline
public/og-image.png   social share preview (1200 × 630)
public/favicon.svg
src/config.ts    event details and registration settings
src/App.tsx      page sections
src/components/  Register form, Countdown
```
