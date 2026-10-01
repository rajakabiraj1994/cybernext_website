# How to update the CYBERNEXT website

Every change is made on **github.com**, inside the `cybernext-site` repository.
Vercel sees the change and republishes www.cybernext.co.in in about 1 minute.
If a change has a mistake, Vercel keeps the previous version online, so the site never breaks.

## The basic routine (same for every text change)

1. Open the repository on github.com.
2. Click into the file (most changes are in `src` → `config.ts`).
3. Click the ✏️ pencil icon (top right of the file).
4. Make your change. Only edit text **inside quotation marks** `"like this"`.
5. Click **Commit changes…** → **Commit changes**.
6. Wait 1 minute, then refresh www.cybernext.co.in (Ctrl + F5 / pull down on phone).

## What lives where

| I want to change… | File |
| --- | --- |
| Date, time, venue, audience number | `src/config.ts` → `EVENT` |
| Registration form link (buttons on the site) | `src/config.ts` → `EXTERNAL_REGISTRATION_URL` |
| Where `cybernext.co.in/register` goes (and printed QR codes) | `vercel.json` → `destination` |
| Footer contacts | `src/config.ts` → `CONTACTS` |
| Thin announcement strip at the top | `src/config.ts` → `ANNOUNCEMENT` |
| Speakers | `src/config.ts` → `SPEAKERS` (+ photos in `public/img/speakers/`) |
| Paragraph text, headings, themes, audience list | `src/App.tsx` (search with Ctrl + F) |
| A logo or the skyline image | `public/img/` (upload a replacement with the **same file name**) |

## Recipes

### Show an announcement strip
In `src/config.ts`:
```ts
export const ANNOUNCEMENT = {
  show: true,
  text: "Registrations are now open",
  link: "/register",
  linkText: "Register",
};
```
To hide it again, change `show: true` to `show: false`.

### Add speakers
1. **Upload the photo first.** Go to `public/img/speakers/` → **Add file → Upload files**. Use a portrait JPG about 800 × 1000 px, named in lowercase with hyphens, e.g. `anita-sharma.jpg`. Commit.
2. **Add the speaker** in `src/config.ts`, between the square brackets of `SPEAKERS`:
```ts
export const SPEAKERS: { name: string; designation: string; organisation: string; photo: string }[] = [
  { name: "Anita Sharma", designation: "Chief Information Security Officer", organisation: "Example Bank", photo: "/img/speakers/anita-sharma.jpg" },
  { name: "Rahul Sen", designation: "CIO", organisation: "Example Group", photo: "/img/speakers/rahul-sen.jpg" },
];
```
Each speaker is one `{ … },` line. Keep the comma at the end of each line.
While the list is empty, the site shows the four "Coming soon" cards.

### Change the registration form
1. `src/config.ts` → replace the link inside `EXTERNAL_REGISTRATION_URL = "…"`.
2. `vercel.json` → replace the link after `"destination":`.
Do both, so the buttons and the short link (and the printed QR) stay in sync.

## If something goes wrong
- Vercel → your project → **Deployments**. A red "Error" deployment means the last change had a typo; the live site still shows the previous version.
- Click the failed deployment to read the error. The usual cause is a missing quotation mark `"` or comma `,` in `config.ts`.
- On GitHub, open the file → **History** to see and undo your last change.
