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

## Connecting a custom domain (e.g. pushmeup.app)

1. **Buy the domain** and open your DNS provider.
2. **Add DNS records:**
   - Apex `pushmeup.app` → four `A` records:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (optionally `AAAA`: `2606:50c0:8000::153`, `2606:50c0:8001::153`,
     `2606:50c0:8002::153`, `2606:50c0:8003::153`)
   - `www.pushmeup.app` → `CNAME` record pointing to `uxmankaxmi.github.io`
3. **Tell GitHub the domain** — either option works:
   - **Repo Settings → Pages → Custom domain**, enter `pushmeup.app`, Save; **or**
   - Create a file named `CNAME` (no extension) at the repo root containing a
     single line `pushmeup.app`, then push. The workflow publishes it
     automatically on the next deploy.
4. Wait for DNS to propagate, then tick **Enforce HTTPS** in Settings → Pages.

## One-time repo settings

- The repository is **public** (required for free Pages).
- **Settings → Pages → Build and deployment → Source: GitHub Actions.**
  The workflow enables this automatically on first run, so no manual step is
  normally needed.
