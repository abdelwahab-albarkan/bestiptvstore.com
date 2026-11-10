import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/data/site';

export interface FinalCTAProps {
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
}

export function FinalCTA({
  headline,
  subheadline,
  primaryCta = { label: `Claim Your ${SITE.stats.trialDuration} Free Trial`, href: '/free-trial' },
  secondaryCta = { label: 'View Subscription Plans', href: '/pricing' },
}: FinalCTAProps) {
  const defaultHeadline = `Join Over ${SITE.stats.activeSubscribers} Americans Streaming with ${SITE.name}`;
  const defaultSubheadline = `Test our high-speed servers completely risk-free. Get full access to ${SITE.stats.liveChannels} live channels, local networks, and PPV sports for ${SITE.stats.trialDuration} with zero commitment.`;

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-emerald-500/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <Badge variant="default" className="text-xs uppercase font-bold tracking-wider">
          Ready to Stream in 8K?
        </Badge>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {headline || (
            <>
              Join Over {SITE.stats.activeSubscribers} Americans Streaming with{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {SITE.name}
              </span>
            </>
          )}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {subheadline || defaultSubheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            variant="gradient"
            className="w-full sm:w-auto h-14 px-8 text-base shadow-xl shadow-emerald-500/25"
          >
            <Link href={primaryCta.href}>
              <Zap className="w-5 h-5 mr-2 fill-current" />
              {primaryCta.label}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto h-14 px-8 text-base"
          >
            <Link href={secondaryCta.href} className="flex items-center gap-2">
              <span>{secondaryCta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant Automated Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required for Trial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{SITE.stats.guaranteePeriod} Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
