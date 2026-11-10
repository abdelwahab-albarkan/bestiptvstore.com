# Production Deployment Guide: BestIPTVUSA4k.com

This comprehensive runbook details the end-to-end production deployment process for **BestIPTVUSA4k.com** (`https://bestiptvusa4k.com`).

---

## 1. Prerequisites

Before initiating deployment, verify you have the following access and toolchains configured:
- **Node.js**: Version 20.x or higher LTS installed locally (`node -v`).
- **Package Manager**: npm (v10+) or pnpm (v9+).
- **Version Control**: Git installed and authenticated with your repository provider (GitHub, GitLab, or Bitbucket).
- **Vercel Account**: Team or personal account on [Vercel.com](https://vercel.com) with project deployment privileges.
- **Domain Registrar Access**: Administrative control of the DNS management panel for **bestiptvusa4k.com** (Namecheap, GoDaddy, Cloudflare, Google Domains, Porkbun).
- **Support Inbox**: Active monitoring access to `support@streamb4.com`.

---

## 2. Local Setup & Environment Configuration

1. **Clone the project repository:**
   ```bash
   git clone <repository-url>
   cd "site usa focus keword"
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Initialize local environment variables:**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` and confirm all pages render without errors.

---

## 3. Build & Quality Verification

Before committing and pushing code to the deployment branch, run local test and build verifications:

1. **Run full automated validation test suite:**
   ```bash
   node run_tests.js
   ```
   *Expected result: 100% test pass across SEO schemas, pricing loaders, MDX engine, security headers, and routes.*

2. **Execute production Next.js build:**
   ```bash
   npm run build
   ```
   Confirm zero compilation errors, zero TypeScript type violations, and that all static routes prerender successfully.

---

## 4. Vercel Deployment & Custom Domain Configuration

1. **Import Repository into Vercel:**
   - Log in to the [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New... > Project** and select your Git repository.
   - Framework Preset: **Next.js** (automatically detected).
   - Root Directory: `./`

2. **Configure Environment Variables:**
   Under **Project Settings > Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://bestiptvusa4k.com`
   - `SUPPORT_EMAIL` = `support@streamb4.com`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `+212625218443`
   - `NEXT_PUBLIC_WHATSAPP_URL` = `https://wa.me/212625218443`
   - `RESEND_API_KEY` = `re_your_api_key_here` (when configured)
   - `NODE_ENV` = `production`

3. **Deploy Project:**
   - Click **Deploy**. Vercel will build and assign an initial `*.vercel.app` preview URL.

4. **Connect Custom Domain (`bestiptvusa4k.com`):**
   - Navigate to **Project Settings > Domains**.
   - Enter `bestiptvusa4k.com` and select **Add**.
   - Also add `www.bestiptvusa4k.com` and configure it to automatically redirect to the apex domain `bestiptvusa4k.com` (301 Permanent).

5. **Configure DNS Records at Registrar:**
   > [!IMPORTANT]
   > Follow the exact DNS records displayed in your Vercel Dashboard for `bestiptvusa4k.com`. Do not hardcode arbitrary IP addresses.
   - **Apex Domain (`@`):** Create an **A Record** pointing to the exact IP shown in your Vercel Domains tab (typically Vercel's global anycast IP).
   - **Subdomain (`www`):** Create a **CNAME Record** pointing to `cname.vercel-dns.com` (or the specific CNAME target provided by Vercel).
   - Allow DNS propagation (typically 5 to 60 minutes). Vercel will automatically provision and renew a free Let's Encrypt SSL certificate.

---

## 5. Google Search Console & Sitemap Submission

1. **Domain Property Verification:**
   - Open [Google Search Console](https://search.google.com/search-console).
   - Add a new **Domain property** for `bestiptvusa4k.com`.
   - Copy the verification `TXT` record and add it to your registrar DNS settings. Click **Verify**.

2. **Submit XML Sitemap:**
   - Go to **Sitemaps** in the left menu.
   - Enter `https://bestiptvusa4k.com/sitemap.xml` and click **Submit**.
   - Verify that all marketing, setup, and blog URLs are successfully discovered.

3. **Request Priority Indexing (URL Inspection Tool):**
   Submit the following high-intent URLs for immediate indexing:
   - `https://bestiptvusa4k.com/` (Homepage — "Best IPTV USA")
   - `https://bestiptvusa4k.com/pricing` (Transactional — "Buy IPTV USA Subscription")
   - `https://bestiptvusa4k.com/free-trial` (High-intent trial — "IPTV USA Free Trial")
   - `https://bestiptvusa4k.com/channels` (Catalog — "USA IPTV Channels List")
   - `https://bestiptvusa4k.com/setup` (Setup Hub — "IPTV Setup Guide")
   - `https://bestiptvusa4k.com/setup/firestick` (Top device guide — "Best IPTV for Firestick USA")
   - `https://bestiptvusa4k.com/blog` (Blog Hub — "IPTV Guides USA")
   - `https://bestiptvusa4k.com/blog/how-to-choose-best-iptv-service-usa` (Target guide)
   - `https://bestiptvusa4k.com/blog/iptv-usa-free-trial-guide` (Target guide)
   - `https://bestiptvusa4k.com/blog/best-iptv-for-smart-tv-usa` (Target guide)

---

## 6. Web Analytics & Privacy Compliance

1. **Analytics Setup:**
   - Recommended: Privacy-focused analytics such as [Plausible](https://plausible.io) or lightweight Google Analytics 4 (GA4).
   - Content Security Policy (CSP) in `next.config.js` is already pre-configured to securely permit scripts and telemetry connections to `https://plausible.io` and `https://www.googletagmanager.com`.

2. **Consent & Privacy Compliance:**
   - Review `/privacy` and `/terms` for compliance with GDPR, California CCPA, and CPRA standards.
   - Strict zero-logging architecture ensures minimal data collection (only email for M3U credential delivery).

---

## 7. Health & Uptime Monitoring

1. **UptimeRobot Setup:**
   - Register at [UptimeRobot.com](https://uptimerobot.com).
   - Create a **New Monitor**:
     - **Monitor Type:** HTTP(s)
     - **Friendly Name:** BestIPTVUSA4k Production Health
     - **URL (or IP):** `https://bestiptvusa4k.com/api/health`
     - **Monitoring Interval:** Every 5 minutes
     - **Alert Contacts:** `support@streamb4.com`
   - Health endpoint returns HTTP 200 with `{ status: 'ok', timestamp: '...', version: '1.0.0' }`.

---

## 8. Transactional Email Dispatch (Resend Integration)

1. **Resend Domain Verification:**
   - Log in to [Resend.com](https://resend.com).
   - Add Domain: `bestiptvusa4k.com`.
   - Add the generated DKIM, SPF, and DMARC TXT records at your domain registrar.
   - Verify domain status in Resend dashboard.

2. **Generate API Key & Configure in Vercel:**
   - In Resend, create a Full Access API key named `bestiptvusa4k-prod`.
   - Add `RESEND_API_KEY=re_...` to Vercel Environment Variables and redeploy.

3. **Code Integration Snippet (`app/api/free-trial/route.ts`):**
   ```typescript
   // In app/api/free-trial/route.ts:
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   await resend.emails.send({
     from: 'BestIPTVUSA4k Support <support@streamb4.com>',
     to: [email],
     subject: 'Your 24-Hour IPTV Free Trial Activation Credentials',
     html: `
       <h2>Welcome to BestIPTVUSA4k, ${name}!</h2>
       <p>Here are your login credentials for your <strong>${device}</strong> setup:</p>
       <ul>
         <li><strong>M3U Playlist URL:</strong> https://bestiptvusa4k.com/playlist/demo...</li>
         <li><strong>Xtream Codes Server:</strong> http://line.bestiptvusa4k.com:80</li>
         <li><strong>Username:</strong> trial_${Date.now()}</li>
         <li><strong>Password:</strong> active2026</li>
       </ul>
       <p>Need setup assistance? Check our <a href="https://bestiptvusa4k.com/setup">Device Setup Guides</a> or contact our WhatsApp desk at +212625218443.</p>
     `,
   });
   ```

---

## 9. Post-Deployment Verification Checklist

Immediately after DNS propagation:
- [ ] **HTTPS Enforced:** Confirm `http://bestiptvusa4k.com` redirects to `https://bestiptvusa4k.com` with a valid SSL lock.
- [ ] **Apex / WWW Redirect:** Confirm `https://www.bestiptvusa4k.com` cleanly redirects (301) to `https://bestiptvusa4k.com`.
- [ ] **Sitemap Accessible:** Verify `https://bestiptvusa4k.com/sitemap.xml` responds with valid XML and 20 URLs.
- [ ] **Robots.txt Accessible:** Verify `https://bestiptvusa4k.com/robots.txt` points to `https://bestiptvusa4k.com/sitemap.xml` and host `https://bestiptvusa4k.com`.
- [ ] **Health API Responding:** Confirm `curl -i https://bestiptvusa4k.com/api/health` returns status `200 OK`.
- [ ] **Free Trial API Functional:** Submit a test trial request through `/free-trial` and check response and rate limiter.
- [ ] **Lighthouse Audit:** Run Google Lighthouse on homepage. Verify Performance > 90, Accessibility = 100, Best Practices = 100, SEO = 100.
- [ ] **Bing Webmaster Tools:** Import Google Search Console profile into Bing Webmaster Tools for secondary indexation.

---

## 10. Rollback Procedures

If an unexpected critical regression occurs post-deployment:
1. **Instant Vercel Rollback:**
   - In the Vercel Dashboard, go to **Deployments**.
   - Locate the previous stable build, click the three dots (`...`), and select **Promote to Production**.
   - Vercel instantly routes 100% of incoming production edge traffic back to the prior build in under 5 seconds.
2. **DNS Emergency Failover:**
   - If hosting provider infrastructure issues arise, revert your domain DNS A/CNAME records to the fallback staging cluster.

