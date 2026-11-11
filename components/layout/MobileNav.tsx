'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Tv,
  ShieldCheck,
  Zap,
  HelpCircle,
  Layers,
  FileText,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Headphones,
  CheckCircle2,
  DollarSign,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const navLinks = [
    {
      href: '/',
      label: 'Home',
      sub: 'Best IPTV USA Streaming (2026)',
      icon: <Tv className="w-5 h-5 text-emerald-400 shrink-0" />,
      badge: null,
    },
    {
      href: '/pricing',
      label: 'Pricing & Plans',
      sub: 'Save 50% on 12-Month Passes',
      icon: <DollarSign className="w-5 h-5 text-teal-400 shrink-0" />,
      badge: 'From $13.33/mo',
    },
    {
      href: '/free-trial',
      label: '24-Hour Free Trial',
      sub: 'Instant 3-Min Activation line',
      icon: <Zap className="w-5 h-5 text-amber-400 shrink-0" />,
      badge: 'FREE PASS',
      highlight: true,
    },
    {
      href: '/channels',
      label: 'Channels List',
      sub: `${SITE.stats.liveChannels} US, CA, UK & Global Feeds`,
      icon: <Layers className="w-5 h-5 text-cyan-400 shrink-0" />,
      badge: '4K Sports',
    },
    {
      href: '/setup',
      label: 'Device Setup Guides',
      sub: 'Firestick, Smart TV, Android & iOS',
      icon: <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
      badge: null,
    },
    {
      href: '/directory',
      label: 'All 1,000+ Guides Hub',
      sub: 'Complete Silo & Topic Directory',
      icon: <Sparkles className="w-5 h-5 text-teal-300 shrink-0" />,
      badge: '1,000 Guides',
    },
    {
      href: '/blog',
      label: 'Blog & Tutorials',
      sub: 'Anti-Freeze & Player Optimization',
      icon: <FileText className="w-5 h-5 text-slate-300 shrink-0" />,
      badge: null,
    },
  ];

  const defaultWhatsappMsg = encodeURIComponent(
    `Hello ${SITE.name}! I need assistance or a 24-hour free trial for Best IPTV USA.`
  );
  const whatsappUrl = `https://wa.me/212625218443?text=${defaultWhatsappMsg}`;

  return (
    <>
      {!isControlled && (
        <button
          type="button"
          onClick={handleOpen}
          className="lg:hidden relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-200 active:scale-95"
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <Menu className="w-6 h-6 text-emerald-400" />
          <span className="sr-only">Toggle Navigation</span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-end animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Glassmorphism Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Premium Slide-Over Panel */}
          <div className="relative z-50 w-full max-w-sm sm:max-w-md h-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-l border-slate-800/80 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Top Bar with Brand and Close */}
            <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 px-5 py-4 flex items-center justify-between">
              <Link href="/" onClick={handleClose} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                  8K
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                    {SITE.name.replace('8K', '')}
                    <span className="text-emerald-400">8K</span>
                    <Badge variant="cyan" className="text-[9px] py-0 px-1 font-bold">
                      USA
                    </Badge>
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Anti-Freeze™ 9.2 Active
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-all duration-200 active:scale-95"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="px-5 py-5 space-y-6 flex-1">
              {/* Primary Navigation Links */}
              <nav className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 block mb-2">
                  Navigation
                </span>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleClose}
                    className={`group flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 ${
                      link.highlight
                        ? 'border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 to-slate-900 text-white shadow-lg shadow-emerald-500/10'
                        : 'border-slate-800/60 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 group-hover:border-emerald-500/40 transition-colors">
                        {link.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                          <span>{link.label}</span>
                          {link.badge && (
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{link.sub}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </nav>

              {/* Dedicated WhatsApp 24/7 Live Support Card */}
              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>VIP WhatsApp Desk</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold">Live Support • Instant Reply</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">+212625218443</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Have questions about your streaming player, channels, or setup? Chat directly with an engineer now.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Chat with Engineer on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Bottom Actions Drawer Footer */}
            <div className="p-5 border-t border-slate-800 bg-slate-900/80 backdrop-blur space-y-3">
              <Button asChild variant="gradient" className="w-full h-11 text-sm font-bold shadow-xl shadow-emerald-500/20">
                <Link href="/free-trial" onClick={handleClose}>
                  <Zap className="w-4 h-4 mr-2 fill-current" />
                  Claim 24-Hour Free Trial
                </Link>
              </Button>

              <div className="grid grid-cols-2 gap-2 text-center text-[10px] text-slate-400 pt-1">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>99.9% Anti-Freeze</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>7-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
