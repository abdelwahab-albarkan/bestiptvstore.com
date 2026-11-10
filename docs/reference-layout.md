# Layout Analysis & Structural Blueprint: iptvresellerpanel.store

## Overview
This document maps the structural layout, section hierarchy, visual architecture, and UX components of the reference site (`https://iptvresellerpanel.store`). 

This blueprint serves as our architectural skeleton. While **no text, code, or branding is copied**, we match the structural layout and section progression, implementing it with Next.js 15 App Router, TypeScript (strict), Tailwind CSS, and shadcn/ui components.

---

## 1. Visual Hierarchy & Above-The-Fold Architecture

* **Top Bar / Announcement Bar:**
  * Displays high-urgency trust triggers: Free trial notice, instant activation speed, and direct customer contact channel (WhatsApp / Live Chat).
* **Header / Navigation:**
  * **Left:** Brand logo with visual badge indicator ("8K/4K UHD").
  * **Center:** Clean primary navigation links:
    1. Home
    2. Pricing & Plans
    3. Channels Lineup
    4. Free Trial
    5. Setup Guides
    6. Reseller Panel
    7. Blog / Guides
  * **Right:** High-visibility Primary CTA button ("Start Free Trial" / "Get Instant Access") + secondary currency/locale indicator.
  * **Mobile:** Responsive sticky header with slide-over hamburger drawer (`MobileNav`).
* **Hero Section (Above-the-Fold):**
  * **Two-Column Grid Layout (Desktop) / Stacked (Mobile):**
    * **Left Column (Text & Triggers):**
      * Trust pill / badge: `#1 Rated IPTV USA Service in 2026` + 5-star customer rating stars.
      * Single Primary H1 with target keyword.
      * Sub-headline addressing pain points: 25,000+ live TV channels, sports in 60FPS 4K/8K, and zero buffering guarantee (Anti-Freeze 9.2).
      * Dual CTA Group: Primary action (`Claim 24-Hour Free Trial`) + Secondary action (`View Pricing & Plans`).
      * Micro-trust proof row directly below CTAs: "No Credit Card Required • Instant Activation • 7-Day Money-Back Guarantee".
    * **Right Column (Visual Proof):**
      * Hardware mockup showcasing live sports/movie interface on Smart TV, Firestick, and mobile.
      * Floating metric badges: "99.9% Server Uptime", "Anti-Freeze™ Active", "25,000+ Channels".

---

## 2. Main Sections Sequence (Page Flow)

1. **Hero Section (`Hero.tsx`):**
   * High-impact value proposition, single H1, dual CTAs, live device preview.
2. **Trust & Proof Bar (`TrustBar.tsx`):**
   * Grid of four key security and performance metrics:
     * 99.9% Anti-Freeze Uptime
     * Instant 3-Minute Activation
     * No ISP Throttling / VPN Friendly
     * 24/7 Priority Concierge Support
3. **Network / Sports Logo Bar (`LogoBar.tsx`):**
   * Infinite carousel/grid of familiar US network and sports league badges (ESPN, NFL, NBA, MLB, HBO, Fox, CBS, NBC, ABC).
4. **Feature Grid (`FeatureGrid.tsx`):**
   * 6-card bento grid highlighting core technical strengths:
     * Native 8K & 4K 60FPS Ultra HD Streams
     * Complete USA Local News & Network Affiliates (All 50 states)
     * PPV & Major Sports Season Passes Included
     * 120,000+ VOD Movies & Daily Updated TV Series
     * 7-Day Interactive EPG & Catch-Up TV
     * Universal Multi-Device Compatibility
5. **Pricing & Subscription Plans (`PricingTable.tsx`):**
   * Billing interval switch / account connections selector (1, 2, 3, 4 connections).
   * 3-tier card layout:
     * 3 Months Standard (Entry)
     * 6 Months Pro (Popular badge)
     * 12 Months Ultimate (Best Value badge, 50% savings highlight)
   * Detailed checkmark feature list per card.
   * Direct checkout action button with transparent pricing (no hidden fees).
6. **Channel Preview & Search Grid (`ChannelGrid.tsx`):**
   * Interactive tabbed filter: USA Sports, Major Locals, Entertainment & Cinema, Kids, Latino, News.
   * Search input for quick channel lookups.
   * Resolution pill badges (8K, 4K UHD, FHD).
   * CTA to view the full 25,000+ channel catalog.
7. **How It Works / 3-Step Setup (`HowItWorks.tsx`):**
   * Step 1: Choose Your Plan or Claim 24h Free Trial.
   * Step 2: Receive Instant Activation Credentials via Email/WhatsApp.
   * Step 3: Install App on Your Firestick, Smart TV, or Phone & Start Streaming.
8. **Customer Testimonials & Social Proof (`TestimonialsSection.tsx`):**
   * Aggregated review summary (4.9/5 from 3,840+ verified US customers).
   * 3-column card grid with verified subscriber badges, device used, location, and authentic review feedback.
9. **Frequently Asked Questions (`FaqSection.tsx`):**
   * Accordion-style expandable questions organized by category (General, Hardware, Streaming Quality, Guarantee).
   * Fully marked up with Schema.org `FAQPage` JSON-LD.
10. **Final Call to Action Banner (`FinalCTA.tsx`):**
    * Full-width contrast section with high-urgency conversion copy.
    * Direct buttons to start the 24-hour instant trial or pick an annual plan.
11. **Site Footer (`Footer.tsx`):**
    * 4-column structured footer:
      * Column 1: Brand description, 8K streaming guarantee, contact email/WhatsApp.
      * Column 2: Quick Links (Pricing, Free Trial, Channels, Reseller Panel).
      * Column 3: Device Setup Guides (Firestick, Android TV, Smart TV, Apple TV, PC/Mac).
      * Column 4: Legal & Policies (Terms of Service, Privacy Policy, Refund Policy, DMCA).
    * Bottom bar: Copyright, payment method badges, and legal disclaimer.

---

## 3. Structural Design Principles for Rebuilding
* **Design System:** Tailwind CSS with dark-mode aesthetic (slate-950 background, emerald-500 / cyan-500 neon accents, high-contrast typography).
* **Typography:** Clean, legible sans-serif font system (Geist Sans or Inter) optimized for mobile reading.
* **Component Standards:** Built using shadcn/ui primitives (`Button`, `Card`, `Badge`, `Accordion`, `Tabs`, `Input`).
* **Performance:** Server Components by default; Client Components used only for interactive filters, tabs, mobile drawer, and accordions.

