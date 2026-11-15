# Portfolio retirement / migration to IceComb

Original domain: **berkayarabaci.com**  
Destination: **https://icecomb.dev/**

## What changed

- Replaced the portfolio with a polished, accessible "moved to IceComb" notice.
- Every existing published route (`/`, `/about/`, `/portfolio/`, `/schulte/`, and the legacy `.html` aliases) displays the notice and automatically navigates to the IceComb **homepage** after eight seconds.
- All pages include an immediate IceComb link and LinkedIn link.
- Added `noindex` and removed the old sitemap so the retired portfolio isn't presented as an active site.
- Retained `CNAME`, `.nojekyll`, and the image assets so GitHub Pages and the existing domain can still serve this temporary transition website.

## Recommended final deployment: real HTTP 301 redirect

**Important:** An HTML `<meta http-equiv="refresh">` is not a server-side 301 redirect. GitHub Pages does not natively let this repository assign arbitrary HTTP 301 response statuses. The included site is a **fallback transition page**; for the actual permanent move, configure a redirect on the domain's edge/hosting provider.

### Cloudflare DNS + Redirect Rules (if using Cloudflare)

1. Back up the old site and deploy these transition pages if you want a temporary announcement phase.
2. Keep ownership of `berkayarabaci.com`; do not remove its DNS/SSL before redirects work.
3. In Cloudflare, ensure the apex domain and `www` are covered by proxied DNS records and valid SSL/TLS.
4. Open **Rules → Redirect Rules**, create a **Single Redirect** for requests to `berkayarabaci.com` and `www.berkayarabaci.com`.
5. Destination: `https://icecomb.dev/`; status: **301**; do **not** preserve the path until matching IceComb pages exist. Prefer the provider's **static redirect** option. Match both HTTP and HTTPS traffic, and include `www` if used.
6. Test `/`, `/about/`, `/portfolio/`, `/schulte/`, `/about.html`, `/portfolio.html`, `/schulte.html`, and the `www` version before discontinuing the old hosting. A successful server-side redirect should have a `Location: https://icecomb.dev/` header and 301 status.
7. Update LinkedIn and other public profiles to link to IceComb. Keep domain registration and redirect active for the long term.

### Alternative for Cloudflare Pages

A `_redirects` file can support server-side redirects if the site is actually hosted on Cloudflare Pages. Do not expect `_redirects` to work on GitHub Pages.

```
/             https://icecomb.dev/  301
/about/       https://icecomb.dev/  301
/portfolio/   https://icecomb.dev/  301
/schulte/     https://icecomb.dev/  301
/about.html   https://icecomb.dev/  301
/portfolio.html https://icecomb.dev/ 301
/schulte.html https://icecomb.dev/ 301
```

## Future page mappings

IceComb `/about` and `/projects` were **not confirmed live** as of this update. Only redirect old `/about/` and `/portfolio/` to those destinations after the target pages are actually published and useful for the old visitors. The independent Schulte mini-game has been preserved only in the *original backup*, not in this retirement build.

## Reverting

Restore the original `web-main.zip` if you want the previous portfolio back. This package is a new deployable copy; it did not modify your live domain.
