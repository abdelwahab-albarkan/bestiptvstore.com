'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Tv, ShieldCheck, Zap, HelpCircle, Layers, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/data/site';

interface MobileNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function MobileNav({ isOpen: controlledIsOpen, onClose: controlledOnClose }: MobileNavProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = typeof controlledIsOpen === 'boolean';
  const open = isControlled ? controlledIsOpen : internalOpen;
  const handleOpen = () => setInternalOpen(true);
  const handleClose = () => {
    if (isControlled && controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalOpen(false);
    }
  };

  return (
    <>
      {!isControlled && (
        <button
          type="button"
          onClick={handleOpen}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-slate-900 border-l border-slate-800 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <Link href="/" onClick={handleClose} className="flex items-center gap-2">
                  <span className="font-black text-xl text-white">
                    {SITE.name.replace('8K', '')}<span className="text-emerald-400">8K</span>
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2 mt-6">
                <Link
                  href="/"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 font-medium transition-colors"
                >
                  <Tv className="w-4 h-4 text-emerald-400" />
                  Home
                </Link>
                <Link
                  href="/pricing"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 font-medium transition-colors"
                >
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Pricing & Plans
                </Link>
                <Link
                  href="/channels"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 font-medium transition-colors"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Channels List ({SITE.stats.liveChannels})
                </Link>
                <Link
                  href="/free-trial"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-emerald-400 bg-emerald-500/10 font-semibold transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Instant Free Trial ({SITE.stats.trialDuration})
                </Link>
                <Link
                  href="/setup/firestick"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 font-medium transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  Device Setup Guides
                </Link>
                <Link
                  href="/blog"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 font-medium transition-colors"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Blog & Tutorials
                </Link>
                <Link
                  href="/directory"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:text-emerald-400 hover:bg-slate-800/60 font-medium transition-colors"
                >
                  <Layers className="w-4 h-4 text-emerald-400" />
                  All 1,000+ Guides Directory
                </Link>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 font-medium transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  WhatsApp 24/7 Desk
                </a>
              </nav>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
              <Button asChild variant="gradient" className="w-full">
                <Link href="/free-trial" onClick={handleClose}>
                  Claim {SITE.stats.trialDuration} Free Trial
                </Link>
              </Button>
              <div className="text-center text-[11px] text-slate-500">
                {SITE.stats.serverUptime} Server Uptime • Zero Buffering
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
