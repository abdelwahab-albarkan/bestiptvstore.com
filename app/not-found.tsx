import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Zap, Tv, DollarSign, BookOpen, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found (404) | Best IPTV USA',
  description: 'The requested IPTV guide or page could not be found.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
          <Compass className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
            Error 404
          </span>
          {/* Exactly One H1 */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Page Not Found
          </h1>
        </div>

        <p className="text-slate-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          The streaming guide, channel list, or page you requested could not be located. Explore our popular sections
          below to get back on track.
        </p>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 pb-2 text-left">
          <Link
            href="/pricing"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
          >
            <DollarSign className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-bold text-white">Pricing Plans</div>
            <div className="text-[11px] text-slate-400">From $13/mo</div>
          </Link>

          <Link
            href="/free-trial"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
          >
            <Zap className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-bold text-white">Free Trial</div>
            <div className="text-[11px] text-slate-400">24-Hour Pass</div>
          </Link>

          <Link
            href="/channels"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
          >
            <Tv className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-bold text-white">Channels List</div>
            <div className="text-[11px] text-slate-400">+40,000 Feeds</div>
          </Link>

          <Link
            href="/blog"
            className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
          >
            <BookOpen className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-sm font-bold text-white">Blog & Guides</div>
            <div className="text-[11px] text-slate-400">Setup Tutorials</div>
          </Link>
        </div>

        <div className="pt-4">
          <Button asChild size="lg" variant="gradient">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

