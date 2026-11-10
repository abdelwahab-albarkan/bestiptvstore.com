# Production SEO Launch & Post-Deploy Checklist: BestIPTVUSA4k.com

This verification checklist guarantees maximum organic search visibility, zero crawl bottlenecks, and robust schema validation for **BestIPTVUSA4k.com** (`https://bestiptvusa4k.com`).

---

## 1. Technical SEO & Indexation Verification

- [ ] **XML Sitemap Submission:** Submit `https://bestiptvusa4k.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- [ ] **Robots.txt Integrity:** Verify `https://bestiptvusa4k.com/robots.txt` allows all legitimate bots (`Allow: /`), disallows `/api/` and `/admin/`, and correctly specifies `Host: https://bestiptvusa4k.com` and `Sitemap: https://bestiptvusa4k.com/sitemap.xml`.
- [ ] **Canonical URL Audit:** Verify that all 20 pages output strict canonical tags matching their exact clean URL (e.g. `https://bestiptvusa4k.com/`, `https://bestiptvusa4k.com/pricing`, `https://bestiptvusa4k.com/setup/firestick`).
- [ ] **Trailing Slash & Case Normalization:** Confirm that URLs with trailing slashes or mixed casing are normalized to prevent duplicate content indexing.
- [ ] **404 Status Code & UX:** Confirm visiting a non-existent URL (e.g. `https://bestiptvusa4k.com/non-existent-page`) returns a true HTTP 404 status code, exactly one H1 ("Page Not Found"), and quick links back to core pages.
- [ ] **Internal Linking Verification:** Confirm 100% of pages are reachable within 2 clicks from the homepage with zero orphan URLs.

---

## 2. Structured Data (JSON-LD) Validation

Validate using Google's official [Rich Results Test](https://search.google.com/test/rich-results):

- [ ] **Homepage (`https://bestiptvusa4k.com/`):**
  - `@type: Organization` (Brand name: IPTVSubs8K, URL: `https://bestiptvusa4k.com`, ContactPoint: `support@streamb4.com`, WhatsApp: `+212625218443`)
  - `@type: WebSite` (SearchAction query-input for channels catalog)
  - `@type: Product` (`@graph` containing all 4 plans: 1-Month $13, 3-Months $19, 6-Months $29, 12-Months $49)
  - `@type: FAQPage` (6 verified questions and answers)
- [ ] **Device Setup Guide (`https://bestiptvusa4k.com/setup/firestick`):**
  - `@type: HowTo` (Step-by-step setup walkthrough with numbered instructions)
  - `@type: BreadcrumbList` (Home > Device Setup Guides > Amazon Firestick)
- [ ] **Blog Article (`https://bestiptvusa4k.com/blog/how-to-choose-best-iptv-service-usa`):**
  - `@type: Article` (Headline, datePublished, author, featured image, publisher)
  - `@type: BreadcrumbList` (Home > Blog > How to Choose)
- [ ] **Pricing Page (`https://bestiptvusa4k.com/pricing`):**
  - `@type: Product` (`@graph` for all 4 subscription tiers with live pricing offers)
  - `@type: BreadcrumbList` (Home > Pricing & Plans)
- [ ] **Zero Unwanted Schemas:** Confirm `/free-trial` and `/channels` do NOT emit Product schema (strictly reserved for transactional pricing).

---

## 3. On-Page Keyword Discipline & Content Optimization

- [ ] **Focus Keyword Density:** Confirm all 20 pages maintain keyword density strictly between **1.0% and 2.0%** (verified via `node scratch/check_all_pages_seo.js`).
- [ ] **Title Tag Format:** All 20 page titles follow the pattern `{Focus Keyword} ({Year}) | {Value Prop} — {Brand}` within 50–60 characters.
- [ ] **Meta Descriptions:** All 20 descriptions start with the focus keyword in the first 10 words, include an active CTA, and remain within 140–160 characters.
- [ ] **Single H1 Rule:** Confirm every page has exactly ONE H1 tag featuring the exact focus keyword.
- [ ] **Subheadings:** At least one `<h2>` and at least one `<h3>` on every page feature the focus keyword naturally.
- [ ] **First 100 Words:** Primary keyword placed naturally within the opening paragraph.
- [ ] **Image Alt Text:** All primary images feature `{Focus Keyword} — {descriptive context}`.

---

## 4. Performance, Core Web Vitals & Mobile-Friendliness

- [ ] **Google PageSpeed Insights:** Test `https://bestiptvusa4k.com/` on mobile and desktop. Target mobile score > 90.
- [ ] **Largest Contentful Paint (LCP):** LCP < 2.5 seconds (ensured by priority hero image with next/image modern formats AVIF/WebP).
- [ ] **Cumulative Layout Shift (CLS):** CLS < 0.1 (all images have explicit dimensions or fill+sizes).
- [ ] **First Input Delay / Interaction to Next Paint (INP):** INP < 200ms (minimal client JavaScript, only 5 client components).
- [ ] **Mobile-Friendly Test:** Pass Google Mobile-Friendly test with responsive viewport settings (`width=device-width, initial-scale=1`).
- [ ] **Search Console CWV Monitoring:** Review real-user metrics (CrUX) in Search Console after 28 days of production traffic.

---

## 5. Keyword Tracking, Link Building & Ongoing Content Strategy

- [ ] **Rank Tracking:** Set up rank tracking in Ahrefs, Semrush, or SE Ranking for core US search queries:
  - `Best IPTV USA` (Target: Top 3)
  - `Buy IPTV USA Subscription` (Target: Top 5)
  - `IPTV USA Free Trial` (Target: Top 3)
  - `USA IPTV Channels List` (Target: Top 5)
  - `Best IPTV for Firestick USA` (Target: Top 3)
- [ ] **Initial Directory Submissions:** Submit the verified production domain `https://bestiptvusa4k.com` to 5 reputable streaming/tech directories.
- [ ] **Monthly Content Expansion Plan:** Publish a minimum of 2 high-quality long-tail streaming guides (minimum 800 words each) per month targeting high-volume, low-competition keywords in `/content/blog/`.

