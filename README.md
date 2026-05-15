# LDS Admin — Final Clean Static Website Package

This package contains a full clean HTML/CSS/JavaScript redesign for the LDS Admin public website.

## Pages

- `index.html` — Czech homepage
- `features.html`, `gis.html`, `integrations.html`, `audience.html`, `contact.html`
- `privacy.html`, `terms.html`, `404.html`
- `en/` — English versions of all public and legal pages, including About

## Technical coverage

- Clean static HTML/CSS/JavaScript, no framework
- Dark-blue energy SaaS visual direction with hero background imagery and feature icon strip
- Responsive desktop/tablet/mobile layout
- Retina-ready image handling with AVIF/WebP/PNG picture sources and explicit width/height attributes
- `/` and `/en/` bilingual URL strategy
- Header language switcher with current hash preservation and localStorage preference
- Login CTAs point to `https://main.ldsadmin.cz`
- Contact form posts JSON to `/api/contact`
- Email and phone click tracking hooks included
- SEO metadata, canonical URLs, hreflang alternates, Open Graph and Twitter Card tags
- JSON-LD Organization, WebSite, WebPage, BreadcrumbList, SoftwareApplication, and FAQPage where relevant
- `sitemap.xml` with language alternates and `robots.txt` referencing the sitemap
- Custom 404 page
- GTM placeholder with Consent Mode v2 default denied
- dataLayer events for CTA clicks, form submit, language switch, email click, phone click, scroll milestones and consent update
- IIS `web.config` included

## Before production

1. Replace `GTM-XXXXXXX` with the real Google Tag Manager container ID.
2. Replace the placeholder phone number `+420 123 456 789` if the client supplies a final number.
3. Confirm `/api/contact` payload/authentication with the existing API.
4. Review GDPR/privacy and terms pages with the client/legal owner.
5. Deploy to staging and verify PageSpeed Insights, Rich Results Test, Search Console inspection and Tag Assistant.
6. Submit `sitemap.xml` after domain verification.

## Local preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080/`.

When opened from `file://`, the contact form simulates a success state so local preview does not fail without the API.


## Content note

The public homepage keeps product-facing sections only: hero, feature strip, audience, product features, integrations, FAQ and contact CTA. Technical SEO/GTM/Ads/Consent requirements remain implemented in code and documented, but they are not displayed as a marketing icon strip on the public page.
