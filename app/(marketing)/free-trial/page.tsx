import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  Tv,
  Zap,
  Mail,
  PlayCircle,
  HelpCircle,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { FreeTrialForm } from '@/components/sections/FreeTrialForm';
import { FAQ } from '@/components/sections/FAQ';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { getFaqs } from '@/lib/data/loaders';
import { SITE } from '@/lib/data/site';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Best IPTV USA Free Trial (2026) | Instant 24-Hour Pass — IPTVSubs8K',
  description: 'Claim your Best IPTV USA free trial for 24 hours with full access to 40,000+ channels and 4K sports. Zero credit card required and instant automated delivery.',
  path: '/free-trial',
  keywords: ['Best IPTV USA', 'Best IPTV USA free trial', 'Best IPTV USA 24h trial', 'free iptv trial usa'],
});

export default function FreeTrialPage() {
  const allFaqs = getFaqs();
  // Filter trial-relevant FAQs (billing & general)
  const trialFaqs = allFaqs
    .filter((f) => f.category === 'billing' || f.id.includes('trial') || f.id.includes('what-is-iptv'))
    .slice(0, 4);

  // BreadcrumbList JSON-LD
  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Free Trial', url: '/free-trial' },
  ]);

  const claimSteps = [
    {
      num: '01',
      icon: Mail,
      title: 'Fill Out Simple Form',
      desc: 'Enter your name, email address, and select your streaming device. No credit card or billing details required.',
    },
    {
      num: '02',
      icon: Clock,
      title: 'Receive Instant Login',
      desc: 'Within 3 minutes, our automated provisioning system generates your Xtream Codes API details and M3U link.',
    },
    {
      num: '03',
      icon: PlayCircle,
      title: 'Install App on Device',
      desc: 'Use our verified setup guide to install your preferred player (TiviMate, IPTV Smarters, or IBO Player).',
    },
    {
      num: '04',
      icon: Zap,
      title: 'Stream Free for 24 Hours',
      desc: `Enjoy unrestricted access to all ${SITE.stats.liveChannels} live channels, sports passes, and 4K/8K feeds.`,
    },
  ];

  const expectations = [
    {
      title: `Full ${SITE.stats.liveChannels} Live Channels`,
      desc: 'Access the complete lineup: US local broadcast stations (ABC, CBS, NBC, FOX), regional sports, ESPN, NFL, NBA, and premium cinema.',
    },
    {
      title: 'Native 4K & 8K 60FPS Quality',
      desc: 'Test our uncompressed high-bitrate video feeds with crisp resolution and high-fidelity surround audio on your big screen.',
    },
    {
      title: 'Anti-Freeze™ 9.2 Technology',
      desc: 'Experience zero buffering and rock-solid playback even during high-traffic Sunday NFL games and pay-per-view cards.',
    },
    {
      title: '100% Free — Zero Commitment',
      desc: 'No credit card required. No hidden fees or automatic billing. Your test line simply expires when the 24 hours conclude.',
    },
  ];

  return (
    <>
      {/* Breadcrumb Schema (No Product Schema on Free Trial) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10 space-y-3">
            <Badge variant="default" className="text-xs uppercase font-bold tracking-wider">
              Instant {SITE.stats.trialDuration} Pass
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Best IPTV USA Free Trial — Instant {SITE.stats.trialDuration}, No Credit Card Required
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto">
              Test all {SITE.stats.liveChannels} channels and 4K/8K sports streams on your device with <strong>Best IPTV USA</strong> before deciding.
              100% free with instant automated activation in under 3 minutes.
            </p>
          </div>

          {/* Interactive Form Component */}
          <FreeTrialForm />

          {/* Step-by-Step Claim Process */}
          <section className="mt-20">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Best IPTV USA Free Trial: How Your 24-Hour Pass Works in 4 Steps
              </h2>
              <p className="text-sm text-slate-400">
                From submission to live <strong>Best IPTV USA</strong> streaming in under 3 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {claimSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/30 transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 font-mono font-bold text-lg">
                      {step.num}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Best IPTV USA Step {step.num}: {step.title}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* What to Expect Section */}
          <section className="mt-20">
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                What You Receive With Your Best IPTV USA Free Trial Pass
              </h2>
              <p className="text-sm text-slate-400">
                You get the exact same premium server speeds and full catalog as our paid VIP <strong>Best IPTV USA</strong> subscribers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {expectations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2"
                >
                  <h3 className="flex items-center gap-2 font-bold text-white text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Best IPTV USA: {item.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-7">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Dedicated In-Depth SEO Section: Free Trial Benchmark */}
          <section className="mt-20 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Why Best IPTV USA Offers Unrestricted 24-Hour Trial Access
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Many streaming services provide degraded trial lines that lag or buffer, hoping users won't notice until after paying. At <strong>Best IPTV USA</strong>, our philosophy is completely transparent: your 24-hour trial connects to the exact same high-speed Tier-1 server clusters as our dedicated annual VIP accounts. When you test <strong>Best IPTV USA</strong>, you experience real-world channel switching, instant XMLTV EPG loading, and native 4K 60FPS sports broadcasts without restrictions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="font-bold text-emerald-400">Zero Payment Information Collected</span>
                <p>We never ask for credit cards or billing addresses. Your <strong>Best IPTV USA</strong> trial is 100% risk-free.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
                <span className="font-bold text-cyan-400">Instant Automated Provisioning</span>
                <p>Our automated systems deliver your <strong>Best IPTV USA</strong> Xtream Codes and M3U links within 3 minutes.</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Whether you are preparing to stream Sunday NFL football, international soccer leagues, or a Saturday night pay-per-view fight, testing <strong>Best IPTV USA</strong> gives you total peace of mind before subscribing. Experience why <strong>Best IPTV USA</strong> is rated the #1 streaming provider by American cord-cutters.
            </p>
          </section>

          {/* What Happens After 24h & How Cancellation Works */}
          <section className="mt-16 p-8 rounded-2xl border border-slate-800 bg-slate-900/70 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              What Happens When Your Best IPTV USA 24-Hour Test Line Concludes?
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Because we never collect payment details, you will <strong>never be automatically billed</strong> for your <strong>Best IPTV USA</strong> trial.
              When your 24 hours expire, the test line shuts down cleanly. If you love <strong>Best IPTV USA</strong>, you can simply visit our{' '}
              <Link href="/pricing" className="text-emerald-400 underline font-semibold hover:text-emerald-300">
                pricing plans page
              </Link>{' '}
              to purchase a 3, 6, or 12-month <strong>Best IPTV USA</strong> package with instant re-activation.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> Zero Obligation
              </span>
              <span>•</span>
              <span>No Sales Phone Calls</span>
              <span>•</span>
              <span>No Automatic Renewal</span>
            </div>
          </section>

          {/* Device Setup Assistance Interlink */}
          <section className="mt-16 p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="text-white font-bold text-base flex items-center justify-center sm:justify-start gap-2">
                <Tv className="w-5 h-5 text-emerald-400" />
                <span>Ready to Install Best IPTV USA on Amazon Firestick?</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Follow our 3-minute installation tutorial to run <strong>Best IPTV USA</strong> with step-by-step screenshots.
              </p>
            </div>
            <div className="shrink-0 flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/setup/firestick" className="flex items-center gap-1.5">
                  <span>Firestick Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/channels">Browse Channels</Link>
              </Button>
            </div>
          </section>

          {/* Trial FAQs */}
          <div className="mt-16">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Best IPTV USA Frequently Asked Free Trial Questions
              </h2>
            </div>
            <FAQ faqs={trialFaqs} showCategories={false} />
          </div>
        </div>
      </main>
    </>
  );
}
