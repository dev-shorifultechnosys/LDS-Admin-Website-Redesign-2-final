# LDS Admin dataLayer specification

All analytics and advertising tags should be configured inside Google Tag Manager. The website pushes structured events to `window.dataLayer`.

## Common parameters

Every event includes:

- `language` — current page language (`cs-CZ` or `en`)

## Events

### `cta_click`
Fired when a CTA marked with `data-track` is clicked.
Parameters: `cta_id`, `cta_text`, `cta_url`.
Recommended conversions: `sign_in_header`, `sign_in_hero`, `try_demo_hero`, `contact_cta`, `login_contact`, `email_contact`, `phone_contact`.

### `form_submit`
Fired after contact form processing.
Parameters: `form_id = contact`, `form_location = contact_section`, `status = success|error`, `error_message` only on error.
Google Ads conversion should fire only when `status` equals `success`.

### `language_switch`
Fired when the user switches language. Parameter: `selected_language`.

### `email_click`
Fired when a `mailto:` link is clicked. Parameter: `email`.

### `phone_click`
Fired when a `tel:` link is clicked. Parameter: `phone`.

### `scroll_milestone`
Fired at 25, 50, 75 and 100 percent. Parameter: `scroll_depth`.

### `consent_update`
Fired when the cookie banner choice is saved. Parameters: `analytics_storage`, `ad_storage`.

## Consent Mode v2
Default state is denied for analytics and marketing storage. Necessary/functionality/security storage remains granted. Analytics and marketing permissions are updated only after the user saves a choice or accepts all.

## Production setup
1. Replace `GTM-XXXXXXX` with the real Google Tag Manager container ID.
2. Configure GA4 and Google Ads tags inside GTM only.
3. Configure GTM triggers from the events above.
4. Verify consent behavior in Tag Assistant and the browser Network panel.
