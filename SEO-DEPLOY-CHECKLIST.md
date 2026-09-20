# ARP COFFEE — SEO deployment checklist

## Implemented in this package
- Separate indexable pages: `/about/`, `/franchise/`, `/menu/`, `/signature/khao-taen-latte/`, `/branches/`
- Unique `<title>`, meta description, canonical, Open Graph and Twitter Card for each page
- Internal links from the homepage to key SEO pages
- `robots.txt` and `sitemap.xml`
- Organization + WebSite structured data on the homepage
- WebPage + Breadcrumb structured data on content pages
- Service structured data on the franchise page
- Local SEO landing page and branch/service-area content without inventing unverified NAP details
- Image width/height and lazy loading on key homepage images
- Existing CSP/security headers preserved

## After deploy to Vercel
1. Open these URLs and confirm HTTP 200:
   - https://arpcoffee.com/
   - https://arpcoffee.com/about/
   - https://arpcoffee.com/franchise/
   - https://arpcoffee.com/menu/
   - https://arpcoffee.com/signature/khao-taen-latte/
   - https://arpcoffee.com/branches/
   - https://arpcoffee.com/robots.txt
   - https://arpcoffee.com/sitemap.xml
2. Re-test Security Headers. The `vercel.json` CSP was intentionally left unchanged.
3. Google Search Console: add/verify `arpcoffee.com` as a Domain property (DNS verification is preferred).
4. Submit sitemap: `https://arpcoffee.com/sitemap.xml`
5. Use URL Inspection and request indexing for `/`, `/franchise/`, `/menu/`, `/about/`, `/branches/`.
6. Validate structured data with Google Rich Results Test / Schema Markup Validator.

## Local SEO — data still needed for full LocalBusiness markup
Do not publish guessed branch details. For each physical branch, confirm:
- Official branch name
- Full street address and postal code
- Current phone number
- Current opening hours
- Google Business Profile / Maps URL
- Whether walk-in, takeaway and/or delivery are currently available

Once those values are confirmed, create one URL per physical branch and add `LocalBusiness` (prefer the most specific applicable subtype) structured data on that branch page.

## Content rule
SEO copy should remain natural. Do not repeat keywords unnaturally. Keep the current ARP COFFEE brand language and update package/branch facts whenever operational data changes.
