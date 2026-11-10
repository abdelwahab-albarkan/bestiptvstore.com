import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/data/site';
import { MobileNav } from './MobileNav';

export function Header() {
  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-emerald-400">Anti-Freeze™ 9.2 Active:</span>
            <span className="hidden sm:inline text-slate-400">
              {SITE.stats.liveChannels} US & Global Live Channels in 4K/8K
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <Link
              href="/free-trial"
              className="hover:text-emerald-400 transition-colors hidden md:inline"
            >
              Instant {SITE.stats.trialDuration} Free Trial
            </Link>
            <span className="text-slate-700 hidden md:inline">•</span>
            <span className="text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {SITE.stats.serverUptime} Server Uptime
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-black text-lg text-emerald-400 tracking-tighter">8K</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                {SITE.name.replace('8K', '')}
                <span className="text-emerald-400">8K</span>
                <Badge
                  variant="cyan"
                  className="text-[10px] py-0 px-1.5 uppercase font-bold tracking-wider"
                >
                  USA
                </Badge>
              </span>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Premium 8K Streaming
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-semibold text-slate-200 hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Pricing & Plans
            </Link>
            <Link
              href="/channels"
              className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Channels List
            </Link>
            <Link
              href="/free-trial"
              className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>Free Trial</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </Link>
            <Link
              href="/setup/firestick"
              className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Device Setup
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Action Button & WhatsApp & Mobile Drawer */}
          <div className="flex items-center gap-3">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 transition-colors"
              title="Chat with WhatsApp Support"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>

            <Button asChild variant="gradient" className="hidden sm:inline-flex">
              <Link href="/free-trial">
                <Zap className="w-4 h-4 mr-1.5 fill-current" />
                Start Free Trial
              </Link>
            </Button>

            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
