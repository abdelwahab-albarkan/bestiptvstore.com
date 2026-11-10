import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE } from '@/lib/data/site';

export const dynamic = 'force-static';

export const metadata: Metadata = buildMetadata({
  title: 'IPTV Privacy Policy (2026) | Data Protection — IPTVSubs8K',
  description:
    'IPTV privacy policy explaining our strict no-logging commitment, data encryption, and subscriber confidentiality. Test risk-free with free trial.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-300 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          IPTV Privacy Policy — Subscriber Data & Security
        </h1>
        <p className="text-sm text-slate-400 mt-2">Last updated: November 2026</p>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">
        This official document details how {SITE.name} safeguards your personal information when subscribing
        to our streaming platform. We are committed to transparency, minimal data collection, and zero activity tracking.
        By ordering an account or activating an automated test pass, you consent to the data principles described herein.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. IPTV Privacy Policy Data Collection Standards</h2>
        <p className="text-sm leading-relaxed">
          We collect only the essential information necessary to deliver and activate your streaming service. This
          includes your email address for delivering M3U playlist credentials and device preferences. We do not
          store financial card numbers, physical billing addresses, or telephone records on our web servers.
        </p>
        <h3 className="text-base font-semibold text-emerald-400">IPTV Privacy Policy Subscriber Safeguards</h3>
        <p className="text-sm leading-relaxed">
          All customer account records are isolated within encrypted databases accessible only by authorized support
          specialists handling account fulfillment and technical line diagnosis.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Zero Activity Logging & Stream Anonymity</h2>
        <p className="text-sm leading-relaxed">
          {SITE.name} strictly respects subscriber confidentiality. We do not inspect, log, or store your viewing habits,
          channels watched, programs streamed, or VOD browsing history. Stream authentication tokens operate purely
          to balance server load across our Content Delivery Network nodes without recording personal media habits.
          Our streaming infrastructure operates on volatile RAM-disk memory architecture, ensuring temporary routing cache
          is automatically purged upon connection cycle completion.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Data Protection & Encryption Architecture</h2>
        <p className="text-sm leading-relaxed">
          All data transmitted between your browser and our provisioning infrastructure is secured using industry-standard
          256-bit SSL encryption. We never sell, lease, or distribute subscriber contact records to third-party marketing
          agencies or data aggregators under any circumstances. Payment transactions are processed through tokenized
          third-party payment gateways, meaning raw credit card numbers never transit or reside upon our web servers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Cookies & Local Browser Session Protocol</h2>
        <p className="text-sm leading-relaxed">
          Our website utilizes technical session cookies exclusively for user authentication, shopping cart retention,
          and regional language delivery. We do not deploy intrusive third-party cross-site advertising trackers or
          surveillance beacons. You may configure your internet browser preferences to reject functional cookies, though
          certain interactive cart elements may require session persistence to complete order processing.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. California Consumer Privacy Act (CCPA) Compliance</h2>
        <p className="text-sm leading-relaxed">
          For residents of California and states with comprehensive consumer privacy statutes, we guarantee full transparency.
          We do not sell personal identification data or share biometric identifiers with advertising exchanges. California
          subscribers maintain the statutory right to request full disclosure of categories of personal information collected,
          request expedited record erasure, and exercise these privacy options without discrimination or alteration in streaming service delivery standards.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. Account Deletion & Subscriber Rights</h2>
        <p className="text-sm leading-relaxed">
          Subscribers hold full rights under global data protection principles to inspect, rectify, or request immediate
          deletion of their email records and credential histories from our authentication databases. For inquiries or
          data clearance requests, contact our privacy officer directly at{' '}
          <span className="text-emerald-400 font-mono">{SITE.email}</span>. Test our streaming service risk-free via our{' '}
          <Link href="/free-trial" className="text-emerald-400 hover:underline">24-hour free trial</Link> or view our{' '}
          <Link href="/pricing" className="text-emerald-400 hover:underline">subscription plans</Link>.
        </p>
      </section>
    </main>
  );
}
