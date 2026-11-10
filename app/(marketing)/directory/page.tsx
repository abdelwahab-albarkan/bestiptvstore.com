import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Tv,
  HardDrive,
  CreditCard,
  DollarSign,
  Activity,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
} from 'lucide-react';

import { getAllSeoPages, SeoPage } from '@/lib/seo/pages';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { SITE } from '@/lib/data/site';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'Best IPTV USA Directory & Complete Guides (2026) | All 1,000+ Topics — IPTVSubs8K',
  description: 'Explore the complete directory of 1,000+ Best IPTV USA guides. Detailed tutorials for Firestick, Android, Smart TV, TiviMate, IPTV Smarters, sports, and pricing.',
  path: '/directory',
  keywords: ['Best IPTV USA', 'Best IPTV USA directory', 'Best IPTV USA guides', 'IPTV USA tutorials'],
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function DirectoryPage() {
  const allPages = getAllSeoPages();

  // Group pages by Silo
  const silos: Record<string, SeoPage[]> = {};
  allPages.forEach((p) => {
    if (!silos[p.silo]) silos[p.silo] = [];
    silos[p.silo].push(p);
  });

  const siloIcons: Record<string, React.ReactNode> = {
    'Apps & Players': <Tv className="w-5 h-5 text-emerald-400" />,
    'Hardware & Devices': <HardDrive className="w-5 h-5 text-teal-400" />,
    'Plans & Subscription': <CreditCard className="w-5 h-5 text-cyan-400" />,
    'Pricing & Value': <DollarSign className="w-5 h-5 text-amber-400" />,
    'Sports & 4K Streaming': <Activity className="w-5 h-5 text-rose-400" />,
    'Safety & Compliance': <ShieldCheck className="w-5 h-5 text-indigo-400" />,
    'Reseller Program': <Users className="w-5 h-5 text-purple-400" />,
    'Best IPTV Services': <Sparkles className="w-5 h-5 text-emerald-400" />,
  };

  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'IPTV Directory', url: '/directory' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="min-h-screen bg-slate-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="cyan" className="uppercase font-bold tracking-wider text-xs">
              Complete Knowledge Base
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Best IPTV USA Directory &amp; Complete Resource Hub (1,000+ Guides)
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Browse our comprehensive <strong>Best IPTV USA</strong> library of {allPages.length}+ streaming guides, device setup tutorials, player reviews, and cord-cutting comparisons.
            </p>
          </div>

          {/* Dedicated Directory Editorial Benchmark */}
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4 max-w-5xl mx-auto text-slate-300 text-sm leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
              Why the Best IPTV USA Knowledge Base Leads North American Streaming
            </h2>
            <p>
              Welcome to the official <strong>Best IPTV USA</strong> educational and technical directory. As North America's premier IPTV service provider, <strong>Best IPTV USA</strong> delivers over 40,000 live broadcast channels, 200,000 video-on-demand releases, and dedicated 4K sports coverage powered by our proprietary Anti-Freeze 9.2 technology.
            </p>
            <p>
              Whether you are looking for verified setup tutorials on Amazon Firestick, Apple TV, Smart TVs, or specialized player configurations for TiviMate and IPTV Smarters, each guide in our <strong>Best IPTV USA</strong> index provides step-by-step instructions with verified DNS server endpoints, M3U configurations, and troubleshooting solutions.
            </p>
          </section>

          {/* Quick Jump Silos */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {Object.keys(silos).map((siloName) => (
              <a
                key={siloName}
                href={`#${slugify(siloName)}`}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors flex items-center gap-1.5"
              >
                <span>{siloName}</span>
                <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded-full">
                  {silos[siloName].length}
                </span>
              </a>
            ))}
          </div>

          {/* Silo Sections */}
          <div className="space-y-16">
            {Object.entries(silos).map(([siloName, pages]) => (
              <div key={siloName} id={slugify(siloName)} className="space-y-6 scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {siloIcons[siloName] || <BookOpen className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      Best IPTV USA: {siloName} Guides &amp; Resources
                    </h2>
                    <p className="text-xs text-slate-400">
                      {pages.length} in-depth tutorials and guides
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {pages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${p.slug}`}
                      className="group p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-400 transition-colors">
                          {p.badge}
                        </span>
                        <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-2">
                          {p.primaryKeyword}
                        </h3>
                      </div>
                      <div className="flex items-center text-xs text-slate-500 group-hover:text-emerald-400 mt-4 pt-2 border-t border-slate-800/40">
                        <span>Read Tutorial</span>
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}

