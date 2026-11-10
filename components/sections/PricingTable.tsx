'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Zap,
  ShieldCheck,
  Flame,
  Tv,
  Users,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ServicePlan } from '@/lib/data/types';
import { SITE } from '@/lib/data/site';

export interface PricingTableProps {
  plans?: ServicePlan[];
  compact?: boolean;
}

type AccountCount = '1' | '2' | '3' | '4';

// Direct checkout URLs mapping
const CHECKOUT_LINKS: Record<string, Record<AccountCount, string>> = {
  '3-months': {
    '1': 'https://todedev.com/buy/3-months-1-account',
    '2': 'https://todedev.com/buy/3-months-2-accounts',
    '3': 'https://todedev.com/buy/3-months-3-accounts',
    '4': 'https://todedev.com/buy/3-months-4-accounts',
  },
  '6-months': {
    '1': 'https://todedev.com/buy/6-months-1-account',
    '2': 'https://todedev.com/buy/6-months-2-accounts',
    '3': 'https://todedev.com/buy/6-months-3-accounts',
    '4': 'https://todedev.com/buy/6-months-4-accounts',
  },
  '12-months': {
    '1': 'https://todedev.com/buy/12-months-1-account',
    '2': 'https://todedev.com/buy/12-months-2-accounts',
    '3': 'https://todedev.com/buy/12-months-3-accounts',
    '4': 'https://todedev.com/buy/12-months-4-accounts',
  },
};

// Fallback plans if not provided by server component
const FALLBACK_PLANS: ServicePlan[] = [
  {
    id: '3-months',
    name: '3 Months',
    duration: '90 Days',
    months: 3,
    price: 39.99,
    monthlyEquivalent: 13.33,
    savingsPercent: 0,
    isPopular: false,
    isBestValue: false,
    connections: 1,
    pricesByAccounts: {
      '1': 39.99,
      '2': 59.99,
      '3': 79.99,
      '4': 99.99,
    },
    checkoutUrlsByAccounts: CHECKOUT_LINKS['3-months'],
    features: [
      '+40,000 Live TV Channels',
      '+200,000 VODs',
      'TV Guide (EPG)',
      'M3U & Xtream Code',
      'Ultra 8K / 4K / HD / SD',
      '+100,000 Series',
      '99.9% Uptime Server',
      'AntiFreeze Technology™',
      'Works on Any Device',
    ],
    deliveryNote: 'Instant 3-Min Delivery',
  },
  {
    id: '6-months',
    name: '6 Months',
    duration: '180 Days',
    months: 6,
    price: 56.99,
    monthlyEquivalent: 9.5,
    savingsPercent: 29,
    isPopular: true,
    isBestValue: false,
    connections: 1,
    pricesByAccounts: {
      '1': 56.99,
      '2': 84.99,
      '3': 109.99,
      '4': 134.99,
    },
    checkoutUrlsByAccounts: CHECKOUT_LINKS['6-months'],
    features: [
      '+40,000 Live TV Channels',
      '+200,000 VODs',
      'TV Guide (EPG)',
      'M3U & Xtream Code',
      'Ultra 8K / 4K / HD / SD',
      '+100,000 Series',
      '99.9% Uptime Server',
      'AntiFreeze Technology™',
      'Works on Any Device',
    ],
    deliveryNote: 'Instant 3-Min Delivery',
  },
  {
    id: '12-months',
    name: '12 Months',
    duration: '360 Days',
    months: 12,
    price: 79.99,
    monthlyEquivalent: 6.67,
    savingsPercent: 50,
    isPopular: true,
    isBestValue: true,
    connections: 1,
    pricesByAccounts: {
      '1': 79.99,
      '2': 119.99,
      '3': 149.99,
      '4': 179.99,
    },
    checkoutUrlsByAccounts: CHECKOUT_LINKS['12-months'],
    features: [
      '+40,000 Live TV Channels',
      '+200,000 VODs',
      'TV Guide (EPG)',
      'M3U & Xtream Code',
      'Ultra 8K / 4K / HD / SD',
      '+100,000 Series',
      '99.9% Uptime Server',
      'AntiFreeze Technology™',
      'Works on Any Device',
    ],
    deliveryNote: 'Instant 3-Min Delivery',
  },
];

export function PricingTable({ plans, compact = false }: PricingTableProps) {
  const [selectedAccounts, setSelectedAccounts] = useState<AccountCount>('1');

  // Fallback to FALLBACK_PLANS if plans not passed from server
  const displayPlans = plans && plans.length > 0 ? plans : FALLBACK_PLANS;

  const accountOptions: { value: AccountCount; label: string; sub: string; icon: React.ReactNode }[] = [
    { value: '1', label: '1 Account', sub: '1 Screen', icon: <Tv className="w-4 h-4" /> },
    { value: '2', label: '2 Accounts', sub: '2 Screens', icon: <Users className="w-4 h-4" /> },
    { value: '3', label: '3 Accounts', sub: 'Family Pass', icon: <Sparkles className="w-4 h-4" /> },
    { value: '4', label: '4 Accounts', sub: 'Whole Home', icon: <Flame className="w-4 h-4" /> },
  ];

  return (
    <section className="py-20 bg-slate-900/40 relative overflow-hidden" id="pricing">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {!compact && (
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider">
              Transparent Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Best IPTV USA Subscription Plans & Pricing
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              All plans include full access to {SITE.stats.liveChannels} live channels, uncompressed 4K sports, and 200,000+ VODs.
              Zero contracts, no hardware rental fees, and instant 3-minute automated activation.
            </p>
          </div>
        )}

        {/* =========================================================================
            INTERACTIVE ACCOUNT SELECTOR (1, 2, 3, 4 Accounts)
           ========================================================================= */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
              Select Number of Simultaneous Devices / Accounts:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 backdrop-blur-md shadow-2xl">
            {accountOptions.map((opt) => {
              const isSelected = selectedAccounts === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedAccounts(opt.value)}
                  className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <span className={isSelected ? 'text-slate-950' : 'text-emerald-400'}>
                    {opt.icon}
                  </span>
                  <div className="text-left">
                    <div className="leading-tight">{opt.label}</div>
                    <div className={`text-[10px] font-medium leading-none ${isSelected ? 'text-slate-900 font-semibold' : 'text-slate-500'}`}>
                      {opt.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PREMIUM 3-CARD PRICING GRID
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {displayPlans.map((plan) => {
            const isBestValue = plan.isBestValue;
            const isPopular = plan.isPopular && !isBestValue;

            // Compute dynamic price for the selected account count
            const price = plan.pricesByAccounts?.[selectedAccounts] || plan.price;
            const monthlyEquivalent = (price / plan.months).toFixed(2);

            // Compute savings versus 3-month baseline
            let dynamicSavings = 0;
            if (plan.months === 6) dynamicSavings = 29;
            if (plan.months === 12) dynamicSavings = 50;

            const accountsLabel = parseInt(selectedAccounts, 10) === 1 ? '1 Account' : `${selectedAccounts} Accounts`;

            // Exact direct checkout URL provided by user
            const checkoutUrl =
              plan.checkoutUrlsByAccounts?.[selectedAccounts] ||
              CHECKOUT_LINKS[plan.id]?.[selectedAccounts] ||
              `https://todedev.com/buy/${plan.id}-${selectedAccounts}-account${selectedAccounts === '1' ? '' : 's'}`;

            const orderMessage = encodeURIComponent(
              `Hello ${SITE.name}, I want to order the ${plan.name} plan (${accountsLabel}) for $${price.toFixed(2)}. Please send me payment details.`
            );
            const whatsappOrderUrl = `https://wa.me/212625218443?text=${orderMessage}`;

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col justify-between transition-all duration-300 rounded-3xl ${
                  isBestValue
                    ? 'border-2 border-emerald-500 bg-slate-900/95 shadow-2xl shadow-emerald-500/25 lg:-translate-y-4'
                    : 'border border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                {/* Floating Best Value Banner */}
                {isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-[240px]">
                    <div className="bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 font-black text-xs py-1.5 px-4 rounded-full shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-1.5 uppercase tracking-wider text-center">
                      <Flame className="w-4 h-4 fill-slate-950" />
                      <span>Best Value — Save 50%</span>
                    </div>
                  </div>
                )}

                {/* Popular Badge for 6 Months */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="cyan" className="uppercase font-bold text-[11px] px-3 py-1 shadow-md tracking-wider">
                      Most Popular Pass
                    </Badge>
                  </div>
                )}

                <CardHeader className="p-8 pb-4 space-y-4 text-center">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Full access pass for {plan.duration}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="py-3 border-y border-slate-800/80">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                        ${monthlyEquivalent}
                      </span>
                      <span className="text-slate-400 text-sm font-semibold">/month</span>
                    </div>

                    <div className="mt-2 text-xs text-slate-300">
                      Total single payment of{' '}
                      <span className="text-emerald-400 font-extrabold text-sm">
                        ${price.toFixed(2)}
                      </span>
                    </div>

                    {dynamicSavings > 0 && (
                      <div className="mt-2.5">
                        <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          <Sparkles className="w-3 h-3" />
                          Save {dynamicSavings}% vs Standard Rate
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="p-8 pt-2 flex-1 space-y-6">
                  {/* Account Badge Indicator */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                    <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                      <Tv className="w-4 h-4 text-emerald-400" />
                      <span>Simultaneous Streaming: </span>
                      <span className="text-emerald-400 font-black">{accountsLabel}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Watch on {selectedAccounts} {parseInt(selectedAccounts, 10) === 1 ? 'device' : 'devices'} at the exact same time
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Everything Included:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>+40,000 Live TV Channels</strong> (US & Global)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>+200,000 Movies & TV Series</strong> (Auto-Updated)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>All Sports Passes & Free PPV</strong> (UFC, NFL, NBA)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Anti-Freeze™ 9.2 Technology</strong> (99.9% Uptime)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>7-Day Electronic Program Guide</strong> (XMLTV EPG)</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Xtream Codes API & M3U Playlist URL</strong></span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span><strong>Universal Device Compatibility</strong> (Firestick, Smart TV, Android, iOS, PC)</span>
                      </li>
                    </ul>
                  </div>

                  {plan.deliveryNote && (
                    <div className="pt-2 text-center text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{plan.deliveryNote}</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="p-8 pt-0 flex flex-col gap-3">
                  {/* Primary Checkout Button with User's Exact Direct Link */}
                  <Button
                    asChild
                    size="lg"
                    variant={isBestValue ? 'gradient' : 'outline'}
                    className={`w-full text-sm font-bold shadow-xl h-12 ${
                      isBestValue ? 'shadow-emerald-500/25' : ''
                    }`}
                  >
                    <a
                      href={checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Subscribe {plan.name} (${price.toFixed(2)})</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>

                  {/* Fallback WhatsApp Order & Guarantee Note */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      7-Day Guarantee
                    </span>
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-slate-400"
                    >
                      <MessageSquare className="w-3 h-3 text-emerald-400" />
                      <span>Or Order via WhatsApp</span>
                    </a>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* =========================================================================
            PAYMENT METHODS & TRUST BANNER
           ========================================================================= */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 max-w-4xl mx-auto text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Accepted Payment Methods:</span>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-slate-200">Visa</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-slate-200">Mastercard</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-slate-200">PayPal</span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-bold text-slate-200">Crypto (BTC/USDT)</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              Every plan includes our 100% Risk-Free {SITE.stats.guaranteePeriod} Money-Back Guarantee. No questions asked.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
