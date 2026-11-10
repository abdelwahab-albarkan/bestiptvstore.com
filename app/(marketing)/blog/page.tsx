import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, User, Calendar, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { getAllPosts } from '@/lib/blog';
import { SITE } from '@/lib/data/site';

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: 'IPTV Guides USA (2026) | Streaming Tips — IPTVSubs8K',
  description:
    'IPTV guides USA covering cord-cutting tutorials, Firestick optimizations, and 4K streaming setup. Claim your 24-hour free trial pass today.',
  path: '/blog',
});

interface BlogIndexPageProps {
  searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 12;

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Math.max(1, parseInt(resolvedParams.page || '1', 10));

  const allPosts = await getAllPosts();
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Breadcrumbs JSON-LD (Zero Article JSON-LD on index page)
  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'IPTV Guides USA', url: '/blog' },
  ]);

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider">
              Knowledge Hub & Technical Tutorials
            </Badge>

            {/* Exactly One H1 */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              IPTV Guides USA: IPTV Guides & Streaming Tips — IPTVSubs8K Blog
            </h1>

            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Explore our verified streaming tutorials covering cord-cutting education, cord-cutting cost comparisons, and step-by-step device optimization
              tutorials. Our senior engineering team breaks down everything you need to know about high-bitrate 4K and 8K
              television.
            </p>

            {/* Quick Filter & Quick Link Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <Link
                href="/free-trial"
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-medium"
              >
                Instant Free Trial
              </Link>
              <Link
                href="/pricing"
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-medium"
              >
                Subscription Plans
              </Link>
              <Link
                href="/setup"
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-medium"
              >
                Device Setup Guides
              </Link>
              <Link
                href="/channels"
                className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-all font-medium"
              >
                Channels Directory
              </Link>
            </div>
          </div>

          {/* Section Heading with Focus Keyword */}
          <div className="border-b border-slate-800 pb-4 mb-8">
            <h2 className="text-2xl font-bold text-white">IPTV Guides USA: Streaming Tutorials & Articles</h2>
            <h3 className="text-sm font-semibold text-emerald-400 mt-1">Streaming Knowledge Base Topics</h3>
          
            <p className="text-xs text-slate-400 mt-1">Written by streaming network engineers and cord-cutting analysts.</p>
          <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-xs text-slate-300 max-w-xl mx-auto space-y-2">
            <span className="font-bold text-emerald-400">Independent Testing & Fact-Checking Commitment</span>
            <p>Our editorial team independently benchmarks streaming buffer performance across certified US home broadband networks. We test all media players against real-time 4K live sports feeds to ensure verified, reliable advice.</p>
          </div>
          <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left text-xs text-slate-300 max-w-xl mx-auto space-y-1">
            <span className="font-bold text-emerald-400">Editorial Standards & Testing Methodology:</span>
            <p>Every tutorial and device comparison published on our platform undergoes rigorous hands-on hardware benchmarking across certified Amazon Firestick, Google TV, Apple TV 4K, and Smart TV operating systems.</p>
          </div>
          </div>

          {/* Grid of Post Cards: 3 columns desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginatedPosts.map((post) => (
              <Card
                key={post.slug}
                className="group border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-xl"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                    <Image
                      src={post.frontmatter.image}
                      alt={`IPTV Guides USA — ${post.frontmatter.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="text-[11px] font-semibold">
                        {post.frontmatter.targetKeyword}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>

                  <CardHeader className="p-6 pb-3 space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{new Date(post.frontmatter.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 truncate">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span className="truncate">{post.frontmatter.author.split(',')[0]}</span>
                      </span>
                    </div>

                    <CardTitle className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
                    </CardTitle>

                    <CardDescription className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {post.frontmatter.description}
                    </CardDescription>
                  </CardHeader>
                </div>

                <CardFooter className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px] uppercase">
                    {post.frontmatter.tags[0]}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mb-16">
              <Button
                asChild
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
              >
                <Link href={`/blog?page=${currentPage - 1}`}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Link>
              </Button>

              <span className="text-xs text-slate-400 px-3">
                Page <span className="font-bold text-white">{currentPage}</span> of{' '}
                <span className="font-bold text-white">{totalPages}</span>
              </span>

              <Button
                asChild
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
              >
                <Link href={`/blog?page=${currentPage + 1}`}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          )}

          {/* Educational Interlinks Banner */}
          <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center max-w-4xl mx-auto space-y-4 mb-16">
            <h2 className="text-2xl font-bold text-white">Device Optimization & Hardware Walkthroughs</h2>
            <h3 className="text-base font-semibold text-emerald-400">Buffer-Free 60FPS Sports Streaming</h3>
            <h2 className="text-xl font-bold text-white pt-2">
              Ready to Experience Anti-Freeze Streaming Firsthand?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Test all {SITE.stats.liveChannels} channels completely free for {SITE.stats.trialDuration}. No credit card
              required, no hidden fees, and zero commitment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild variant="gradient" size="lg">
                <Link href="/free-trial">
                  <Zap className="w-4 h-4 mr-1.5 fill-current" />
                  Claim {SITE.stats.trialDuration} Free Pass
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">Browse Subscription Plans</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-slate-300 hover:text-emerald-400">
                <Link href="/setup">View Setup Guides</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Final CTA Component */}
        <FinalCTA
          headline="Stop Overpaying for Cable Today"
          subheadline={`Stream ${SITE.stats.liveChannels} live channels and ${SITE.stats.vodMovies} VOD movies with 99.9% anti-freeze stability.`}
          primaryCta={{ label: `Start ${SITE.stats.trialDuration} Free Trial`, href: '/free-trial' }}
          secondaryCta={{ label: 'View Pricing & Plans', href: '/pricing' }}
        />
      </main>
    </>
  );
}
