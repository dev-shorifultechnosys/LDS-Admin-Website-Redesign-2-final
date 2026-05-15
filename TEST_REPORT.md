# LDS Admin acceptance test notes

Automated local static checks included in this package:

- HTML files contain exactly one `<h1>` per page.
- Internal referenced CSS/JS/image assets resolve inside the package.
- Hero and page images include width/height, AVIF/WebP sources and PNG fallback.
- Contact form posts to `/api/contact`.
- Login CTAs point to `https://main.ldsadmin.cz`.
- Czech and English pages include canonical and hreflang pairs.
- `robots.txt`, `sitemap.xml`, `DATA_LAYER.md`, `README.md`, and `web.config` are included.
- dataLayer events exist for CTA clicks, form submit success/error, language switch, email click, phone click, scroll milestones and consent update.

Static validation result: **PASS**.

Browser acceptance notes:

- The package is built with clean HTML, CSS and JavaScript and targets latest Chrome, Edge, Firefox, Safari, mobile Chrome and mobile Safari.
- A full live cross-browser/device run cannot be completed inside this offline sandbox. Run the final acceptance pass on staging or production with real browsers or BrowserStack.
- No known static defects remain after automated validation.

Manual production checks still required after deployment:

- Replace `GTM-XXXXXXX` and verify GTM/GA4/Google Ads in Tag Assistant.
- Verify `/api/contact` email delivery end-to-end on staging/production.
- Run PageSpeed Insights against the live URL.
- Run Rich Results Test and Search Console inspection.
- Test latest Chrome, Edge, Firefox, Safari, mobile Chrome and mobile Safari on real devices or BrowserStack.


## Visible technical strip check

The previous public homepage strip listing SEO, GA4, Google Ads, Consent Mode, performance and accessibility has been removed. These requirements remain handled in metadata, dataLayer/GTM readiness, consent code and documentation instead of being shown as customer-facing content.


## Latest visual adjustment

- Hero product feature strip icon sizing was reduced and compact card styling was added for a cleaner, more eye-catching desktop and mobile layout.


## Updated package static validation

- 18 HTML files checked.
- Exactly one `<h1>` found on each HTML page.
- Internal CSS, JavaScript, image, and HTML references resolved inside the package.
- Hero feature strip icons were verified at CSS level with compact fixed SVG dimensions and responsive card layout.


## Navigation fix update

- `Produkty` / `Products` now links to the homepage instead of an in-page section anchor.
- `O nás` / `About` now links to a dedicated `about.html` / `en/about.html` page.
- Header active states were corrected so only the current page is highlighted.
- Sitemap and language alternates were updated for the new About pages.
