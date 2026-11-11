# IPTVSubs8K — Best IPTV USA Platform

> The highest-rated 8K & 4K IPTV service provider engineered specifically for United States viewers, delivering 40,000+ live channels, 200,000+ VODs, and zero-buffering Anti-Freeze™ 9.2 technology.

**Production Domain:** [iptvprostar.com](https://iptvprostar.com)  
**Primary Focus Keyword:** `Best IPTV USA`

---

## Technology Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Static Route Generation, Incremental Static Regeneration)
- **Language:** TypeScript 5.x (Strict typing across data schemas, loaders, and components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom dark slate / emerald theme tokens
- **UI Components:** Custom accessible components built upon [Radix UI / shadcn/ui](https://ui.shadcn.com/) patterns
- **Data Validation & Parsing:** [Zod](https://zod.dev/) (Frontmatter schemas, API validation, configuration schemas)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Content Engine:** Custom zero-dependency MDX/Markdown loader with Table of Contents extraction and reading time calculation
- **Testing:** Automated verification suite (`run_tests.js`) and Vitest runner

---

## Quick Start

### 1. Prerequisites
- Node.js 20.x or higher
- npm or pnpm

### 2. Installation
```bash
# Clone the repository
git clone <repository-url>
cd "site usa focus keword"

# Install project dependencies
npm install

# Copy environment template
cp .env.example .env.local
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available NPM Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `next dev` | Starts local development server with Hot Module Replacement |
| `build` | `next build` | Compiles optimized production bundle and prerenders static routes |
| `start` | `next start` | Runs production server locally after build |
| `lint` | `next lint` | Executes ESLint static code quality rules |
| `test` | `node run_tests.js` | Runs full automated verification suite across schemas, loaders & SEO |

---

## Project Structure Overview

```
├── app/                           # Next.js 15 App Router
│   ├── (marketing)/               # Core public marketing pages
│   │   ├── page.tsx               # Homepage (Best IPTV USA)
│   │   ├── pricing/               # Plans & Pricing (Buy IPTV USA Subscription)
│   │   ├── free-trial/            # 24-Hour Free Trial pass
│   │   ├── channels/              # 40,000+ Live Channels directory
│   │   ├── setup/                 # Device setup guides hub & [device] walkthroughs
│   │   └── blog/                  # Streaming knowledge base & [slug] articles
│   ├── (legal)/                   # Compliance & legal terms
│   │   ├── privacy/               # IPTV Privacy Policy (No-logging commitment)
│   │   ├── terms/                 # IPTV Terms of Service (Subscriber agreement)
│   │   └── refund-policy/         # IPTV Refund Policy (7-day money-back guarantee)
│   ├── api/                       # API endpoints
│   │   ├── free-trial/            # Trial request handler with Zod & rate limiting
│   │   └── health/                # System uptime & monitoring endpoint
│   ├── sitemap.ts                 # Dynamic XML sitemap generator
│   └── robots.ts                  # Robots.txt generator
├── components/                    # Modular UI components
│   ├── layout/                    # Header, Footer, MobileNav, Announcement bar
│   ├── sections/                  # Hero, PricingTable, ChannelGrid, FeatureGrid, FAQ, etc.
│   └── ui/                        # Button, Badge, Card, Input primitive design components
├── content/                       # Content assets & documentation
│   ├── blog/*.mdx                 # 5 comprehensive streaming tutorials (>=800 words)
│   └── setup/*.mdx                # 6 verified device installation guides
├── lib/                           # Core utilities & loaders
│   ├── data/                      # Data loaders (plans, channels, faqs, testimonials, site)
│   └── seo/                       # Metadata builder, JSON-LD schema generators & route registry
├── project-data/                  # Single source of truth JSON datasets
├── DEPLOY.md                      # Production deployment runbook
├── SEO-CHECKLIST.md               # Post-launch SEO & Google Search Console checklist
└── next.config.js                 # Security headers, CSP, remote image patterns & MDX config
```

---

## Important Documentation Links

- [DEPLOY.md](./DEPLOY.md) — Step-by-step production deployment guide for Vercel, DNS, Search Console, and Resend.
- [SEO-CHECKLIST.md](./SEO-CHECKLIST.md) — Complete launch checklist covering JSON-LD, Core Web Vitals, and keyword tracking.

---

## Customer Support & Contact Information

For customer inquiries, line assistance, or billing support:
- **Support Email:** [support@streamb4.com](mailto:support@streamb4.com)
- **WhatsApp 24/7 Desk:** [+212625218443](https://wa.me/212625218443)
- **Official Website:** [https://iptvprostar.com](https://iptvprostar.com)

---

## License & Compliance

Copyright © 2026 IPTVSubs8K Streaming Media LLC. All rights reserved.  
All product names, logos, trademarks, and registered trademarks mentioned are property of their respective owners.

