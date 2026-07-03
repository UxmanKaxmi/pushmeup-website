# Deployment

The site is hosted **free on GitHub Pages** and deployed automatically by
GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

Every push to `main` rebuilds and publishes the site. There is no backend,
database, or paid hosting — it is static HTML, CSS, and JS only.

## Live URLs

- **Temporary GitHub Pages URL:** https://uxmankaxmi.github.io/pushmeup-website/
- **Custom domain (later):** e.g. https://pushmeup.app — see below.

## Configuring the beta links

All "Join the beta" destinations live in **one file**:
[js/config.js](js/config.js).

```js
window.PUSHMEUP_CONFIG = {
  tallyFormUrl: 'https://tally.so/r/MeyKbk', // signup form (default)
  iosTestFlightUrl: '',  // add when TestFlight is live
  androidBetaUrl: '',    // add when Play beta is live
};
```

- **Now:** every CTA opens the Tally form.
- **Later:** paste the TestFlight and Play opt-in URLs. Visitors on iPhone go
  to TestFlight, Android visitors go to Play, everyone else gets the form.

Only ever put **public, shareable** links here. No secrets, API keys, admin
URLs, or credentials — this file ships to the browser and the repo is public.

## Custom domain: pushmeup.app (via Cloudflare DNS → GitHub Pages)

The domain `pushmeup.app` is registered on Cloudflare, which is used for **DNS
only**. GitHub Pages hosts the site and issues HTTPS. The apex is canonical and
`www` redirects to it (GitHub Pages does this automatically).

The [CNAME](CNAME) file at the repo root holds `pushmeup.app`; the deploy
workflow publishes it, which sets the custom domain on every deploy.

**Cloudflare DNS records** (Cloudflare dashboard → DNS → Records). Every record
must be **DNS only / grey cloud** — if it is proxied (orange cloud), GitHub
cannot issue the HTTPS certificate:

| Type  | Name  | Value                                   | Proxy     |
| ----- | ----- | --------------------------------------- | --------- |
| A     | `@`   | `185.199.108.153`                       | DNS only  |
| A     | `@`   | `185.199.109.153`                       | DNS only  |
| A     | `@`   | `185.199.110.153`                       | DNS only  |
| A     | `@`   | `185.199.111.153`                       | DNS only  |
| CNAME | `www` | `uxmankaxmi.github.io`                  | DNS only  |

(Optional IPv6 for the apex — also DNS only: `AAAA @` →
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
`2606:50c0:8003::153`.)

Remove any conflicting `@`/`www` records Cloudflare auto-added (e.g. from the
earlier Workers connection). Once DNS propagates, GitHub provisions the cert;
then tick **Enforce HTTPS** in repo Settings → Pages.

## One-time repo settings

- The repository is **public** (required for free Pages).
- **Settings → Pages → Build and deployment → Source: GitHub Actions.**
  The workflow enables this automatically on first run, so no manual step is
  normally needed.
