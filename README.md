# PushMeUp marketing site

Static landing page for the PushMeUp beta. No build step, no dependencies. Deploy the folder as-is to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).

## Run locally

```sh
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Structure

- `index.html` — the whole page
- `css/theme.css` — design tokens, mirrored from the mobile app's `src/shared/theme/colors.ts`
- `css/components.css` — buttons, cards, chips, avatars, tally marks, FAQ
- `css/site.css` — layout and sections
- `js/main.js` — CTA wiring, FAQ accordion, scroll reveals, hero card animation

## Configure the beta CTA

Edit `CTA_CONFIG` at the top of `js/main.js`:

- `ios`: TestFlight public link
- `android`: Play Store testing opt-in URL
- `fallback`: signup form, used for desktop visitors and whenever a platform link is empty

Phone visitors are routed to their platform's link automatically; everyone else gets the fallback.
