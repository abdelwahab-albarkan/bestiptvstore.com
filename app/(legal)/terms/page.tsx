import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo/metadata';
import { SITE } from '@/lib/data/site';

export const dynamic = 'force-static';

export const metadata: Metadata = buildMetadata({
  title: 'IPTV Terms of Service (2026) | User Agreement — IPTVSubs8K',
  description:
    'IPTV terms of service covering device connections, acceptable use policies, and subscription guidelines. Review our terms or claim a free trial.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-300 space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          IPTV Terms of Service — Subscriber Agreement
        </h1>
        <p className="text-sm text-slate-400 mt-2">Last updated: November 2026</p>
      </div>

      <p className="text-sm leading-relaxed text-slate-300">
        Please review these official terms of use before accessing our high-speed streaming infrastructure. By ordering
        a subscription or activating an instant free trial, you agree to comply with the usage guidelines outlined below.
        These provisions ensure optimal streaming quality, line stability, and fair server access for every subscriber.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. IPTV Terms of Service & Service Description</h2>
        <p className="text-sm leading-relaxed">
          {SITE.name} delivers high-definition, 4K, and 8K Internet Protocol Television feeds over broadband network
          connections. Our platform provides access to live broadcast networks, international sports packages, and on-demand media.
          Service delivery is provided on an 'as-is' and 'as-available' operational framework with 99.9% uptime targets.
          Subscribers understand that television broadcasts originate from global upstream satellite relays subject to routine maintenance.
        </p>
        <h3 className="text-base font-semibold text-emerald-400">IPTV Terms of Service Connection & Device Rules</h3>
        <p className="text-sm leading-relaxed">
          Subscribers are licensed to access video feeds strictly for personal, non-commercial entertainment across
          compatible household streaming devices including Firestick, Smart TVs, Android boxes, and personal computers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Permitted Devices & Simultaneous Streams</h2>
        <p className="text-sm leading-relaxed">
          Each subscription tier permits a designated number of concurrent connections (1 to 4 devices). Exceeding your
          allocated connection threshold triggers automated session management to prevent line congestion and unauthorized
          account sharing outside your designated household perimeter. Automated connection filters continuously monitor
          concurrent socket connections to preserve server bandwidth distribution for all paying households.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Network Bandwidth Requirements & Latency</h2>
        <p className="text-sm leading-relaxed">
          Buffer-free viewing requires stable internet bandwidth of at least 15 Mbps for Full HD channels and 30 Mbps+
          for 4K and 8K sports broadcasts. We recommend connecting through 5GHz Wi-Fi or wired Ethernet connections.
          Subscribers are responsible for securing adequate broadband speed with their local internet service provider.
          Our support staff cannot troubleshoot broadband delivery issues originating from domestic ISP router throttling.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Fair Usage & Credential Security Protocol</h2>
        <p className="text-sm leading-relaxed">
          Subscribers may not redistribute, retransmit, or publicly broadcast stream URLs or Xtream Codes API keys.
          Accounts suspected of wholesale restreaming without an authorized reseller agreement are subject to immediate
          termination without reimbursement. Subscribers are obligated to maintain the confidentiality of their generated
          M3U playlist links and customer portal login credentials at all times.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Intellectual Property & Upstream Relay Disclaimers</h2>
        <p className="text-sm leading-relaxed">
          All television program trademarks, logos, brand names, and broadcast graphics displayed or delivered through the streaming
          network remain the intellectual property of their respective broadcast networks, sporting organizations, and copyright proprietors.
          {SITE.name} operates purely as a technical digital distribution and network transit gateway. We do not host, store, or claim ownership
          over transmitted broadcast media streams. Availability of individual broadcast stations may vary based on upstream satellite relay
          schedules, transponder maintenance, and geographic broadcast licensing boundaries.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. Limitation of Liability & Network Indemnification</h2>
        <p className="text-sm leading-relaxed">
          In no event shall {SITE.name}, its infrastructure operators, or affiliated technical personnel be held liable for indirect,
          consequential, or punitive damages resulting from intermittent broadband disconnections, residential internet provider outages,
          third-party application software bugs, or device hardware incompatibilities. Our total aggregate liability under this agreement
          is strictly limited to the monetary sum paid for your active subscription term.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">7. Dispute Resolution & Governing Jurisdiction Agreement</h2>
        <p className="text-sm leading-relaxed">
          In the unlikely event of a billing disagreement or service delivery dispute, subscribers agree to first attempt
          amicable informal resolution by contacting our administrative compliance desk. If mutual consensus cannot be reached
          within thirty days, any formal claims shall be addressed through binding arbitration in accordance with commercial
          arbitration standards. Subscribers expressly agree to resolve conflicts on an individual basis and waive participation in collective class actions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">8. Billing, Cancellations & Support Inquiries</h2>
        <p className="text-sm leading-relaxed">
          Subscriptions are pre-paid according to the chosen billing term (1, 3, 6, or 12 months). Accounts do not
          auto-renew with hidden recurring charges. To renew or adjust your connection limits, visit our{' '}
          <Link href="/pricing" className="text-emerald-400 hover:underline">subscription plans</Link> or test via our{' '}
          <Link href="/free-trial" className="text-emerald-400 hover:underline">24-hour free trial</Link>. For technical support,
          our automated helpdesk is accessible 24 hours a day, 7 days a week.
        </p>
      </section>
    </main>
  );
}
