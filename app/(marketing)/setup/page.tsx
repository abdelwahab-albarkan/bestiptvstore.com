import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Tv, Clock, ArrowRight, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { getAllDevices } from '@/lib/setup';
import { SITE } from '@/lib/data/site';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Best IPTV USA Setup Guide (2026) | Install on Any Device — IPTVSubs8K',
  description: 'Best IPTV USA setup guide for Firestick, Android TV, Apple TV, Smart TVs, and Windows. Step-by-step 3-minute tutorials. Claim your free trial to begin.',
  path: '/setup',
  keywords: ['Best IPTV USA', 'Best IPTV USA setup guide', 'install Best IPTV USA', 'IPTV setup firestick'],
});

export default async function SetupIndexPage() {
  const devices = await getAllDevices();

  // Breadcrumbs JSON-LD (No HowTo schema on index page)
  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Setup Guides', url: '/setup' },
  ]);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider mb-2">
              Multi-Device Walkthroughs
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Best IPTV USA Setup Guides — Install on Any Device in 3 Minutes
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Follow our verified <strong>Best IPTV USA</strong> installation tutorials to configure your streaming device in under 3 minutes.
              Every walkthrough includes recommended media players, M3U integration, hardware decoding optimizations, and practical network troubleshooting tips.
              Whether you stream <strong>Best IPTV USA</strong> through an Amazon Firestick, Google TV box, Apple TV 4K, or directly through your Samsung or LG Smart TV remote, our step-by-step guides guarantee smooth 60FPS video playback.
            </p>
          </div>

          {/* 6 Device Cards Grid */}
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 mb-8 space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
            <h3 className="text-base font-bold text-white">Best IPTV USA Hardware Acceleration &amp; Display Calibration</h3>
            <p>To experience flawless native 4K and 8K 60FPS sports broadcasts on <strong>Best IPTV USA</strong> without stutter or screen tearing, ensure hardware acceleration is toggled on inside your preferred media application. Selecting OpenGL or Direct3D11 rendering shifts video frame decompression directly to your device graphics processor, preserving system memory for <strong>Best IPTV USA</strong> network packet buffering.</p>
            <p>Additionally, adjust your TV picture mode to Movie or Filmmaker mode, disable motion smoothing, and enable HDMI 2.1 enhanced format on your television input port for optimal <strong>Best IPTV USA</strong> HDR contrast and color reproduction.</p>
          </div>
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h2 className="text-2xl font-bold text-white">Best IPTV USA Setup Guide: Tutorials by Streaming Device</h2>
            <p className="text-xs text-slate-400 mt-1">Select your hardware below for dedicated <strong>Best IPTV USA</strong> hardware acceleration and player tips.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {devices.map((device) => (
              <Card
                key={device.deviceSlug}
                className="group border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-xl"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                    <Image
                      src={device.image}
                      alt={`IPTV Setup Guide — ${device.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        {device.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{device.estimatedTime}</span>
                    </div>
                  </div>

                  <CardHeader className="p-6 pb-3 space-y-2">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      <Link href={`/setup/${device.deviceSlug}`}>{device.device}</Link>
                    </CardTitle>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {device.description}
                    </p>
                  </CardHeader>

                  <CardContent className="px-6 pb-4">
                    <div className="text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300">Recommended Player:</span>{' '}
                      <span className="text-emerald-400 font-mono">{device.recommendedApp}</span>
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Step-by-Step Guide</span>
                  <Link
                    href={`/setup/${device.deviceSlug}`}
                    className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Tutorial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Dedicated In-Depth SEO Analysis: Hardware & Setup Benchmark */}
          <section className="mb-16 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Why Best IPTV USA Delivers Flawless Multi-Device Streaming
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Configuring <strong>Best IPTV USA</strong> on your home media equipment is designed to be effortless. Unlike outdated services requiring complex DNS rewrites, <strong>Best IPTV USA</strong> integrates natively with standard modern applications via standard Xtream Codes API and M3U playlist URLs. Within 3 minutes of receiving your <strong>Best IPTV USA</strong> activation email, your Firestick, Apple TV, or Smart TV will populate all 40,000+ live stations with full 7-day electronic TV guide data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400">Best IPTV USA for Amazon Firestick</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Install TiviMate or IPTV Smarters on Fire TV Cube and 4K Max sticks with hardware acceleration for pristine <strong>Best IPTV USA</strong> playback.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-cyan-400">Best IPTV USA for Smart TVs (Samsung &amp; LG)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Load IBO Player or Nanomid directly from the official LG webOS or Samsung Tizen store to stream <strong>Best IPTV USA</strong> feeds.</p>
              </div>
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-teal-400">Best IPTV USA for Apple TV &amp; iOS</h3>
                <p className="text-xs text-slate-300 leading-relaxed">Enjoy smooth Apple TV 4K video rendering using GSE Smart IPTV or IPTVX paired with high-speed <strong>Best IPTV USA</strong> CDN servers.</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Experience the difference with our dedicated North American CDN clusters. Test <strong>Best IPTV USA</strong> free for 24 hours or browse our discount subscription tiers backed by a 7-day money-back guarantee.
            </p>
          </section>

          {/* Quick Actions & Internal Links */}
          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center max-w-4xl mx-auto space-y-4 mb-16">
            <h2 className="text-2xl font-bold text-white">
              Best IPTV USA Pre-Installation Checklist &amp; Bandwidth Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto pt-4 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-sm">Best IPTV USA Bandwidth Benchmarking</h3>
                <p>We recommend a minimum broadband connection speed of 25 Mbps for crystal-clear 4K sports streaming on <strong>Best IPTV USA</strong> and 50 Mbps+ when operating multiple simultaneous screens throughout your household.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h3 className="font-bold text-white text-sm">Best IPTV USA Router &amp; Wi-Fi Positioning</h3>
                <p>Whenever practical, connect your streaming media box via direct Ethernet cabling or switch your wireless connection to 5GHz to eliminate signal degradation on <strong>Best IPTV USA</strong>.</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Test all {SITE.stats.liveChannels} channels completely free for {SITE.stats.trialDuration} on <strong>Best IPTV USA</strong> with zero obligations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild variant="gradient" size="lg">
                <Link href="/free-trial">
                  <Zap className="w-4 h-4 mr-1.5 fill-current" />
                  Claim Best IPTV USA Free Trial
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Best IPTV USA Plans</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Final Conversion Block */}
        <FinalCTA
          headline="Start Streaming Best IPTV USA on Your Favorite Device"
          subheadline={`Enjoy ${SITE.stats.liveChannels} channels with 99.9% anti-freeze stability on Best IPTV USA. Instant activation delivered in under 3 minutes.`}
          primaryCta={{ label: `Start Best IPTV USA Free Trial`, href: '/free-trial' }}
          secondaryCta={{ label: 'View Best IPTV USA Plans', href: '/pricing' }}
        />
      </main>
    </>
  );
}

