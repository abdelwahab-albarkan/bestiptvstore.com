import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Zap, ShieldCheck, CheckCircle2, Users, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/data/site';

export interface HeroProps {
  headline?: string;
  subheadline?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  trustBadges?: string[];
}

export function Hero({
  headline = 'The Best IPTV USA Service & 8K Subscription',
  subheadline,
  primaryCta = { label: `Claim ${SITE.stats.trialDuration} Free Trial`, href: '/free-trial' },
  secondaryCta = { label: 'View Plans & Pricing', href: '/pricing' },
  trustBadges = ['No Credit Card Required', 'Instant 3-Min Activation', `${SITE.stats.guaranteePeriod} Money-Back Guarantee`],
}: HeroProps) {
  const defaultSubheadline = `Cut the overpriced cable cord. Stream over ${SITE.stats.liveChannels} live US channels, local broadcast networks, and every major live sports league in native 4K & 8K 60FPS with zero buffering powered by Anti-Freeze™ 9.2 technology.`;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs sm:text-sm font-semibold text-emerald-400">
              <span className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </span>
              <span className="text-slate-300">#1 Rated Best IPTV USA Service in 2026</span>
            </div>

            {/* Exactly One Single H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              The{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Best IPTV USA
              </span>{' '}
              Service & 8K Subscription
            </h1>

            {/* Value Proposition Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subheadline || defaultSubheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button asChild size="lg" variant="gradient" className="w-full sm:w-auto">
                <Link href={primaryCta.href}>
                  <Zap className="w-5 h-5 mr-2 fill-current" />
                  {primaryCta.label}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>

            {/* Micro Trust Triggers */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-3 text-xs text-slate-400">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Device Showcase & Floating Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-slate-800 bg-slate-900/60 p-3 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-950">
                <Image
                  src="/images/hero-tv-mockup.webp"
                  alt="Best IPTV USA — American living room streaming live sports in 4K on IPTVSubs8K"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <Badge variant="default" className="bg-emerald-500/90 text-slate-950 font-bold">
                    LIVE 4K • 60 FPS
                  </Badge>
                  <span className="text-slate-200 font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    Buffer: 0.0s (Anti-Freeze 9.2)
                  </span>
                </div>
              </div>

              {/* Floating Live Viewers Badge */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Active Streamers</div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{SITE.stats.activeSubscribers} Live</span>
                  </div>
                </div>
              </div>

              {/* Floating Server Status Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-slate-900/95 border border-slate-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Server Status</div>
                  <div className="text-sm font-bold text-white">
                    {SITE.stats.serverUptime} Anti-Freeze Uptime
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
