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
- `js/config.js` — **the one place to edit CTA links** (Tally form, TestFlight, Play)
- `js/main.js` — CTA wiring, FAQ accordion, scroll reveals, hero card animation

## Configure the beta CTA

Edit [`js/config.js`](js/config.js) — that is the single source of truth:

- `tallyFormUrl`: signup form, used for desktop visitors and as the default
- `iosTestFlightUrl`: TestFlight public link (leave `''` until live)
- `androidBetaUrl`: Play Store testing opt-in URL (leave `''` until live)

Phone visitors are routed to their platform's link automatically; everyone else gets the form. Only put public links here — no secrets.

## Deployment

Hosted free on GitHub Pages, deployed automatically by GitHub Actions on every push to `main`. See [DEPLOY.md](DEPLOY.md) for the live URL, custom-domain setup, and one-time settings.
