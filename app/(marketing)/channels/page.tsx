import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, Tv, Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ChannelGrid } from '@/components/sections/ChannelGrid';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { getChannelCategories } from '@/lib/data/loaders';
import { SITE } from '@/lib/data/site';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Best IPTV USA Channels List (2026) | 40,000+ Live Channels — IPTVSubs8K',
  description: 'Explore the complete Best IPTV USA channels list with 40,000+ live stations, regional sports, local US networks, and premium movies in 4K/8K. Start your trial today.',
  path: '/channels',
  keywords: ['Best IPTV USA', 'Best IPTV USA channels list', 'Best IPTV USA channel packages', 'USA IPTV channels'],
});

interface ChannelsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ChannelsPage({ searchParams }: ChannelsPageProps) {
  const resolvedParams = await searchParams;
  const initialCategory = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const initialQuery = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;

  const categories = getChannelCategories();

  // Breadcrumbs JSON-LD (No Product JSON-LD on informational channels directory)
  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Channels List', url: '/channels' },
  ]);

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="py-12">
        {/* Header Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider mb-3">
            Official 2026 Channel Directory
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            Best IPTV USA Channels List — 40,000+ Sports, Movies &amp; Local Networks
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Browse our complete <strong>Best IPTV USA</strong> lineup of over {SITE.stats.liveChannels} live television feeds and regional stations.
            From live NFL and NBA league passes to local ABC, CBS, NBC, and FOX broadcast stations in all 50 states,
            every feed on <strong>Best IPTV USA</strong> is transmitted in crystal-clear 4K, 8K, and 1080p 60FPS.
          </p>
        </div>

        {/* Category Breakdown Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-white">
              Best IPTV USA Channels List: Channel Packages &amp; Category Breakdown
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Explore <strong>Best IPTV USA</strong> curated packages with zero freezing and ultra-fast zapping.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">{cat.name}</div>
                  <div className="text-xs text-slate-400">{cat.count}</div>
                </div>
                <Badge variant="secondary" className="text-[10px] uppercase font-bold">
                  {cat.badge}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Channel Filter Grid (URL Synced via Server Params) */}
        <ChannelGrid
          categories={categories}
          initialCategory={initialCategory}
          initialQuery={initialQuery}
        />

        {/* Dedicated Editorial SEO Section: Channel Guide */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 border-t border-slate-800/80 mt-16">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Best IPTV USA Stream Quality Leads Cable &amp; Satellite TV
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Traditional broadcast television limits resolution to compressed 720p or 1080i while charging costly monthly equipment rentals. <strong>Best IPTV USA</strong> elevates home entertainment with uncompressed 1080p 60FPS, 4K Ultra HD, and select 8K feeds. When you connect to <strong>Best IPTV USA</strong>, our distributed content delivery network automatically selects the lowest-latency edge server nearest your home, ensuring instant buffer-free playback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">
                Best IPTV USA Live US Sports Lineup
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Experience every touchdown, buzzer-beater, and goal with <strong>Best IPTV USA</strong>. Our platform includes NFL Sunday Ticket, NBA League Pass, MLB Extra Innings, NHL Center Ice, and all major UFC pay-per-view cards without blackout restrictions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400">
                Best IPTV USA Local Broadcast Networks
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Stay updated with hometown news and weather. <strong>Best IPTV USA</strong> features local ABC, CBS, NBC, FOX, PBS, and CW affiliates across every major US metro area and television market in all 50 states.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-teal-400">
                Best IPTV USA 4K Cinema &amp; VOD Library
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Beyond live television, <strong>Best IPTV USA</strong> includes over 200,000 on-demand movies and complete television series updated daily with English subtitles, high-bitrate surround sound, and multi-resolution selectors.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4 text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Best IPTV USA Electronic Program Guide (EPG) &amp; Device Compatibility
            </h2>
            <p>
              Navigating 40,000+ channels is effortless with our integrated 7-day Electronic Program Guide (EPG). <strong>Best IPTV USA</strong> provides accurate XMLTV TV guides synced automatically inside TiviMate, IPTV Smarters Pro, IBO Player, and XCIPTV. Whether you stream on an Amazon Firestick 4K Max, Nvidia Shield, Apple TV 4K, or directly through your Samsung or LG Smart TV, <strong>Best IPTV USA</strong> synchronizes your channel groups instantly.
            </p>
            <p>
              Ready to verify our channel quality? Activate your <strong>Best IPTV USA</strong> 24-hour test line today or select an annual <strong>Best IPTV USA</strong> subscription to lock in our guaranteed lowest rates backed by our 7-day money-back guarantee.
            </p>
          </div>
        </section>

        {/* Quick Navigation / Internal Links Banner */}
        <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Stream the Best IPTV USA Channels List on Any Device
            </h3>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Test our uncompressed <strong>Best IPTV USA</strong> stream quality on your Amazon Firestick, Smart TV, or Android box with an instant trial,
              or browse our flexible <strong>Best IPTV USA</strong> pricing tiers.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild variant="gradient" size="lg">
                <Link href="/free-trial">
                  <Zap className="w-4 h-4 mr-1.5 fill-current" />
                  Claim Best IPTV USA {SITE.stats.trialDuration} Free Trial
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Best IPTV USA Plans</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-slate-300 hover:text-emerald-400">
                <Link href="/setup/firestick" className="flex items-center gap-1.5">
                  <span>Firestick Setup Tutorial</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Final Conversion Block */}
        <FinalCTA
          headline={`Stream Over ${SITE.stats.liveChannels} US Channels with Best IPTV USA`}
          subheadline="Cut the cord without missing Sunday football, regional evening news, or championship boxing. Instant activation delivered in under 3 minutes with Best IPTV USA."
          primaryCta={{ label: `Test Best IPTV USA Free First`, href: '/free-trial' }}
          secondaryCta={{ label: 'View Best IPTV USA Plans', href: '/pricing' }}
        />
      </main>
    </>
  );
}
