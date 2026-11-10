import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Tv,
  Clock,
  Zap,
  ShieldCheck,
  ChevronLeft,
  Smartphone,
} from 'lucide-react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, howToSchema } from '@/lib/seo/schema';
import { getAllDevices, getDeviceContent } from '@/lib/setup';
import { SITE } from '@/lib/data/site';

export const revalidate = 3600;

interface SetupDevicePageProps {
  params: Promise<{ device: string }>;
}

export async function generateStaticParams() {
  const devices = await getAllDevices();
  return devices.map((d) => ({
    device: d.deviceSlug,
  }));
}

export async function generateMetadata({
  params,
}: SetupDevicePageProps): Promise<Metadata> {
  const { device } = await params;
  const data = await getDeviceContent(device);
  if (!data) {
    return {
      title: 'Setup Guide Not Found | Best IPTV USA',
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  const kw = data.frontmatter.focusKeyword || data.frontmatter.title;
  return buildMetadata({
    title: `${kw} | Best IPTV USA 4K Setup Guide (2026) — ${SITE.name}`,
    description: data.frontmatter.description,
    path: `/setup/${device}`,
    image: data.frontmatter.image,
    keywords: ['Best IPTV USA', kw, `Best IPTV USA for ${data.frontmatter.device}`],
  });
}

export default async function SetupDevicePage({ params }: SetupDevicePageProps) {
  const { device } = await params;
  const data = await getDeviceContent(device);

  if (!data) {
    notFound();
  }

  const { frontmatter, content } = data;

  // 1. Breadcrumbs JSON-LD
  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Device Setup Guides', url: '/setup' },
    { name: frontmatter.device, url: `/setup/${frontmatter.deviceSlug}` },
  ]);

  // 2. HowTo JSON-LD
  const howToJsonLd = howToSchema({
    name: frontmatter.focusKeyword
      ? `${frontmatter.focusKeyword} — ${frontmatter.device} Setup Guide`
      : frontmatter.title,
    description: frontmatter.description,
    steps: frontmatter.steps.map((s) => ({
      name: s.name,
      text: s.text,
    })),
  });

  return (
    <>
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <main className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to all guides navigation link */}
          <div className="mb-6">
            <Link
              href="/setup"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>View All Supported Devices & Setup Guides</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider">
                Verified 2026 Tutorial
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {frontmatter.estimatedTime} • {frontmatter.difficulty}
              </Badge>
            </div>

            {/* Exactly One Single H1 */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {frontmatter.title.includes('Best IPTV USA') ? frontmatter.title : `${frontmatter.title} — Best IPTV USA`}
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Configure <strong>Best IPTV USA</strong> on your <strong>{frontmatter.device}</strong> in under 3 minutes with full Anti-Freeze 9.2 support, 40,000+ live channels, and instant 4K buffer-free playback.
            </p>
          </div>

          {/* Quick Info Specification Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1">
              <div className="text-xs text-slate-400 uppercase font-semibold">Estimated Time</div>
              <div className="text-base font-bold text-white flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{frontmatter.estimatedTime}</span>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1">
              <div className="text-xs text-slate-400 uppercase font-semibold">Difficulty Level</div>
              <div className="text-base font-bold text-emerald-400">
                {frontmatter.difficulty}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 text-center space-y-1">
              <div className="text-xs text-slate-400 uppercase font-semibold">Recommended App</div>
              <div className="text-sm font-bold text-white truncate px-2">
                {frontmatter.recommendedApp}
              </div>
            </div>
          </div>

          {/* Device Showcase Image */}
          <div className="relative aspect-[16/9] max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-12 shadow-2xl">
            <Image
              src={frontmatter.image}
              alt={frontmatter.focusKeyword ? `${frontmatter.focusKeyword} — Best IPTV USA ${frontmatter.device} setup walkthrough` : `Best IPTV USA — How to set up on ${frontmatter.device}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
              <Badge className="bg-emerald-500/90 text-slate-950 font-bold">
                {frontmatter.device}
              </Badge>
              <span className="text-slate-300 font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                Best IPTV USA Anti-Freeze 9.2
              </span>
            </div>
          </div>

          {/* Introduction Paragraph */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 mb-12 text-slate-300 text-sm leading-relaxed space-y-3">
            <p>{content}</p>
          </div>

          {/* Numbered Steps */}
          <section className="space-y-6 mb-16">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <Tv className="w-5 h-5 text-emerald-400" />
                <span>Best IPTV USA Step-by-Step Installation for {frontmatter.device}</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Follow each step in order to ensure hardware decoding and full 4K EPG guide synchronization on <strong>Best IPTV USA</strong>.
              </p>
            </div>

            <div className="space-y-4">
              {frontmatter.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 space-y-2 hover:border-emerald-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white">Step {idx + 1}: Best IPTV USA — {step.name}</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pl-10">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Dedicated In-Depth SEO Section: Device Benchmark */}
          <section className="mb-16 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/30 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Why Best IPTV USA Performs Best on {frontmatter.device}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Optimizing <strong>Best IPTV USA</strong> on your <strong>{frontmatter.device}</strong> unlocks the full potential of high-bitrate 4K streaming. Because <strong>Best IPTV USA</strong> delivers true uncompressed 60FPS video feeds, configuring your media player to utilize hardware video decoding shifts stream decompression directly to your device graphics chipset. This eliminates frame dropping, audio sync drift, and interface lag across all <strong>Best IPTV USA</strong> channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <h3 className="font-bold text-emerald-400">Best IPTV USA Xtream Codes API on {frontmatter.device}</h3>
                <p>We recommend connecting to <strong>Best IPTV USA</strong> via Xtream Codes API rather than plain M3U files, allowing automated category synchronization and real-time EPG updates on your <strong>{frontmatter.device}</strong>.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                <h3 className="font-bold text-cyan-400">Best IPTV USA Anti-Freeze Buffer Tuning</h3>
                <p>Expanding your buffer size cache to 2-3 seconds inside your <strong>{frontmatter.device}</strong> player absorbs micro-fluctuations in home Wi-Fi networks, ensuring zero stutter during live <strong>Best IPTV USA</strong> broadcasts.</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Join thousands of cord-cutters who stream smoothly every day with <strong>Best IPTV USA</strong>. Activate your instant 24-hour free trial on your <strong>{frontmatter.device}</strong> or upgrade to our full <strong>Best IPTV USA</strong> subscription backed by a 7-day money-back guarantee.
            </p>
          </section>

          {/* Troubleshooting Section */}
          {frontmatter.troubleshooting.length > 0 && (
            <section className="space-y-6 mb-16">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span>Best IPTV USA Common Troubleshooting &amp; Fixes for {frontmatter.device}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Solutions to the most frequent player configuration and network connection questions for <strong>Best IPTV USA</strong>.
                </p>
              </div>

              <div className="space-y-4">
                {frontmatter.troubleshooting.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2"
                  >
                    <div className="font-semibold text-white text-sm flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">Issue:</span>
                      <span>{item.issue}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 pl-6 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">Fix:</span>
                      <span>{item.fix}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Box & Interlinks */}
          <section className="p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 text-center space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Start Best IPTV USA on Your {frontmatter.device} Today
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              Claim your <strong>Best IPTV USA</strong> {SITE.stats.trialDuration} instant free trial. No payment details required. We deliver your login credentials immediately to your email.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" variant="gradient">
                <Link href="/free-trial">
                  <Zap className="w-4 h-4 mr-1.5 fill-current" />
                  Start Best IPTV USA Free Trial
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Best IPTV USA Plans</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-slate-300 hover:text-emerald-400">
                <Link href="/channels" className="flex items-center gap-1.5">
                  <span>Explore {SITE.stats.liveChannels} Channels</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
