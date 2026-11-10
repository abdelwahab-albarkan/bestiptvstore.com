import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE } from '@/lib/data/site';

export const dynamic = 'force-static';

export const metadata: Metadata = buildMetadata({
  title: 'IPTV Refund Policy (2026) | 7-Day Guarantee — IPTVSubs8K',
  description:
    'IPTV refund policy with 100% risk-free 7-day money-back guarantee on all subscription plans. Zero questions asked. Start your free trial today.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-300 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          IPTV Refund Policy — 7-Day Money-Back Guarantee
        </h1>
        <p className="text-sm text-slate-400 mt-2">Last updated: November 2026</p>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">
        At {SITE.name}, customer satisfaction is our paramount standard. We stand firmly behind the performance,
        speed, and anti-freeze reliability of our 8K streaming network. If our service does not fulfill your expectations,
        we provide a transparent, risk-free 100% money-back guarantee within 7 days of initial subscription purchase.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. IPTV Refund Policy Eligibility & 7-Day Window</h2>
        <p className="text-sm leading-relaxed">
          Refund requests submitted within 7 calendar days from your initial order timestamp qualify for a full 100%
          reimbursement. This policy applies to all 1-month, 3-month, 6-month, and 12-month subscription tiers purchased
          directly through our authorized checkout portal.
        </p>
        <h3 className="text-base font-semibold text-emerald-400">IPTV Refund Policy Fast Resolution Steps</h3>
        <p className="text-sm leading-relaxed">
          Before requesting a refund, our senior technical team is available 24/7 on WhatsApp to troubleshoot any app
          configuration or network routing obstacles you may encounter on your device.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Non-Refundable Circumstances & Fraud Prevention</h2>
        <p className="text-sm leading-relaxed">
          Refunds cannot be granted after the 7-day warranty period has elapsed. Additionally, accounts found in breach of
          acceptable use policies (such as unauthorized multi-room credential restreaming or automated scraping) forfeit
          refund eligibility. Chargebacks opened through payment processors without contacting customer support first will
          result in immediate account suspension and blacklisting from future service renewals.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Technical Support Triage Protocol</h2>
        <p className="text-sm leading-relaxed">
          Over 90% of reported streaming anomalies, including temporary video buffering or missing audio tracks, stem from
          outdated player app caches or sub-optimal DNS server routing assigned by domestic internet service providers. When you contact
          our technical helpdesk, our certified streaming engineers will first provide customized routing configurations, recommend
          optimized media player decoders (such as TiviMate, IBO Player, or VLC), or reset your stream routing node to restore pristine 4K video playback.
        </p>
        <p className="text-sm leading-relaxed">
          If these diagnostic calibrations fail to resolve your playback obstacles to your complete satisfaction within the 7-day warranty window,
          your full refund will be immediately authorized without delay or administrative deduction.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Chargeback Prevention & Banking Inquiries</h2>
        <p className="text-sm leading-relaxed">
          We respectfully request all subscribers to contact our billing team prior to initiating disputed transactions or chargeback filings
          with credit card issuers. Unannounced chargebacks incur unnecessary processing penalties and result in automated permanent closure
          of all related streaming accounts and device MAC address registries.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Banking Currency Conversion & Processing Windows</h2>
        <p className="text-sm leading-relaxed">
          Refund transactions are credited in the original purchase denomination. Depending on your financial institution
          or domestic card provider, returned funds typically post to your online statement within three to five business days.
          International transaction processing fees assessed by intermediary clearinghouses are non-refundable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. How to Request Your Refund</h2>
        <p className="text-sm leading-relaxed">
          To initiate a return, contact our billing department at{' '}
          <span className="text-emerald-400 font-mono">{SITE.email}</span> with your order reference number and activation
          email address. Reversals are processed back to your original payment method within 3 to 5 business days. Once issued,
          your account credentials will be automatically deactivated by our server management cluster.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Risk-Free Trial Alternative</h2>
        <p className="text-sm leading-relaxed">
          We strongly encourage viewers to evaluate our live channels and 4K sports quality through our{' '}
          <Link href="/free-trial" className="text-emerald-400 hover:underline">24-hour free trial</Link> before purchasing.
          Alternatively, explore our flexible <Link href="/pricing" className="text-emerald-400 hover:underline">subscription plans</Link>.
        </p>
      </section>
    </main>
  );
}
