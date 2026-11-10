import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Mail, MessageSquare, Award } from 'lucide-react';
import { SITE } from '@/lib/data/site';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-black text-2xl text-white">
                {SITE.name.replace('8K', '')}
                <span className="text-emerald-400">8K</span>
              </span>
            </Link>
            <p className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              {SITE.tagline}
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {SITE.shortDescription}
            </p>
            <div className="flex flex-col gap-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {SITE.whatsapp} (24/7 Desk)
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link href="/free-trial" className="hover:text-emerald-400 transition-colors">
                  {SITE.stats.trialDuration} Free Trial
                </Link>
              </li>
              <li>
                <Link href="/channels" className="hover:text-emerald-400 transition-colors">
                  Channels List
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-emerald-400 transition-colors">
                  All 1,000+ Guides Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Setup Guides */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Setup Guides</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/setup/firestick" className="hover:text-emerald-400 transition-colors">
                  Firestick & Fire TV
                </Link>
              </li>
              <li>
                <Link href="/setup/android" className="hover:text-emerald-400 transition-colors">
                  Android TV & Google TV
                </Link>
              </li>
              <li>
                <Link href="/setup/ios" className="hover:text-emerald-400 transition-colors">
                  Apple TV & iOS
                </Link>
              </li>
              <li>
                <Link href="/setup/smart-tv" className="hover:text-emerald-400 transition-colors">
                  Smart TV (Samsung/LG)
                </Link>
              </li>
              <li>
                <Link href="/setup/windows" className="hover:text-emerald-400 transition-colors">
                  Windows PC
                </Link>
              </li>
              <li>
                <Link href="/setup/mac" className="hover:text-emerald-400 transition-colors">
                  Mac OS
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Legal & Policies</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-emerald-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                {SITE.stats.guaranteePeriod} Money-Back Guarantee
              </div>
              <p className="text-slate-400">
                100% risk-free testing on all subscriptions with zero commitment.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <Award className="w-3.5 h-3.5" />
              <span className="font-semibold">US Market Leader in 8K Streaming</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-7 bg-slate-900 border border-slate-800 rounded flex items-center justify-center p-1">
                <Image
                  src="/images/visa-logo.webp"
                  alt="Visa"
                  width={40}
                  height={24}
                  className="object-contain max-h-5"
                />
              </div>
              <div className="relative w-12 h-7 bg-slate-900 border border-slate-800 rounded flex items-center justify-center p-1">
                <Image
                  src="/images/mastercard-logo.webp"
                  alt="Mastercard"
                  width={34}
                  height={24}
                  className="object-contain max-h-5"
                />
              </div>
              <div className="relative w-12 h-7 bg-slate-900 border border-slate-800 rounded flex items-center justify-center p-1">
                <Image
                  src="/images/paypal-logo.webp"
                  alt="PayPal"
                  width={36}
                  height={24}
                  className="object-contain max-h-5"
                />
              </div>
              <div className="relative w-12 h-7 bg-slate-900 border border-slate-800 rounded flex items-center justify-center p-1">
                <Image
                  src="/images/crypto-logo.webp"
                  alt="Cryptocurrency"
                  width={34}
                  height={24}
                  className="object-contain max-h-5"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {currentYear} {SITE.legalName}. All rights reserved.</p>
            <p className="max-w-xl text-center md:text-right">
              Disclaimer: All product names, logos, and brands are property of their respective owners.
              All company, product, and service names used on this website are for identification purposes only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
