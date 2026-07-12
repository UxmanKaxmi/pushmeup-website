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

## Circle invites: /c/&lt;token&gt; landing + universal links

Circle invite links (`https://pushmeup.app/c/<token>`) are served by
[404.html](404.html) — GitHub Pages renders it for every unknown path, and the
page's script branches: `/c/<token>` paths fetch the public invite preview from
the API (`GET /invites/<token>/preview`) and render the sentence + members +
get-the-app CTA; anything else shows a plain 404.

Universal/App Links files live in [.well-known/](.well-known/):

- `apple-app-site-association` — appID `ZW59CUVSS3.com.pushmeup.app`, paths
  `/c/*` and `/circles/*`.
- `assetlinks.json` — package `com.pushmeup.app`, with **both** fingerprints:
  the Play **App signing key** (`25:69:72:…:E6:22`, covers store installs —
  added from Play Console → App integrity on 2026-07-12) and the **upload
  key** (`E4:65:C3:…:E4:79`, covers locally-signed release builds).

**Post-deploy verification (do these once after the first deploy):**

1. `curl -sI https://pushmeup.app/.well-known/apple-app-site-association` —
   must be HTTP 200. Apple requires JSON served without redirects; GitHub
   Pages serves extensionless files as `application/octet-stream`, which
   Apple's CDN generally accepts — confirm with
   `https://app-site-association.cdn-apple.com/a/v1/pushmeup.app`. If Apple's
   CDN rejects the content type, front the site with Cloudflare (orange cloud
   + a response-header transform rule for that one path) or move hosting.
2. `curl -s https://pushmeup.app/.well-known/assetlinks.json` — 200 + JSON,
   then run Android Studio's App Links Assistant or
   `adb shell pm verify-app-links --re-verify com.pushmeup.app`.
3. **Backend CORS:** the landing page fetches the API from the browser, so
   `https://pushmeup.app` must be in the backend's `ALLOWED_ORIGINS` env var
   (Render dashboard), or the invite preview will render as "isn't valid".
4. iOS associated domains only take effect in builds whose provisioning
   profile includes the Associated Domains capability — enable it for the app
   ID in the Apple Developer portal before shipping the build.

## One-time repo settings

- The repository is **public** (required for free Pages).
- **Settings → Pages → Build and deployment → Source: GitHub Actions.**
  The workflow enables this automatically on first run, so no manual step is
  normally needed.
