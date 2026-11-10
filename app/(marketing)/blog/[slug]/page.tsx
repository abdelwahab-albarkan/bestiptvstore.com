import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Clock,
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  List,
  Zap,
  CheckCircle2,
  Tv,
  Share2,
} from 'lucide-react';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { buildMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { getAllPosts, getPostBySlug, getRelatedPosts, BlogPost } from '@/lib/blog';
import { SITE } from '@/lib/data/site';

export const revalidate = 86400;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Best IPTV USA',
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

  return buildMetadata({
    title: `${post.frontmatter.title} — ${SITE.name}`,
    description: post.frontmatter.description,
    path: `/blog/${slug}`,
    image: post.frontmatter.image,
  });
}

/**
 * Parses markdown inline tokens: [link](url), **bold**, *italic*
 */
function renderFormattedText(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      // Link
      const linkText = match[2];
      const linkHref = match[3];
      if (linkHref.startsWith('/')) {
        parts.push(
          <Link
            key={match.index}
            href={linkHref}
            className="text-emerald-400 hover:underline font-semibold"
          >
            {linkText}
          </Link>
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline font-semibold"
          >
            {linkText}
          </a>
        );
      }
    } else if (match[4]) {
      // Bold
      parts.push(
        <strong key={match.index} className="text-white font-semibold">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      // Italic
      parts.push(
        <em key={match.index} className="text-slate-200 italic">
          {match[5]}
        </em>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Renders Markdown content blocks into semantic JSX elements
 */
function renderMarkdownContent(content: string) {
  const blocks = content.split(/\r?\n\r?\n/);

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // H2 Heading
    if (trimmed.startsWith('## ')) {
      const headingText = trimmed.slice(3).trim();
      const cleanText = headingText.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      return (
        <h2
          key={idx}
          id={id}
          className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 pt-6 border-t border-slate-800 scroll-mt-24 tracking-tight"
        >
          {renderFormattedText(headingText)}
        </h2>
      );
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.slice(4).trim();
      const cleanText = headingText.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      const id = cleanText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      return (
        <h3
          key={idx}
          id={id}
          className="text-xl sm:text-2xl font-bold text-emerald-400 mt-8 mb-3 scroll-mt-24 tracking-tight"
        >
          {renderFormattedText(headingText)}
        </h3>
      );
    }

    // Bullet List
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split(/\r?\n/).map((line) => line.replace(/^[-*]\s+/, '').trim());
      return (
        <ul key={idx} className="space-y-2 mb-6 my-4 pl-4 list-disc list-inside text-slate-300 text-sm sm:text-base leading-relaxed">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="leading-relaxed">
              {renderFormattedText(item)}
            </li>
          ))}
        </ul>
      );
    }

    // Numbered List
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split(/\r?\n/).map((line) => line.replace(/^\d+\.\s+/, '').trim());
      return (
        <ol key={idx} className="space-y-2 mb-6 my-4 pl-4 list-decimal list-inside text-slate-300 text-sm sm:text-base leading-relaxed">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="leading-relaxed">
              {renderFormattedText(item)}
            </li>
          ))}
        </ol>
      );
    }

    // Standard Paragraph
    return (
      <p key={idx} className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
        {renderFormattedText(trimmed)}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, 3);

  // 1. Article JSON-LD Schema
  const articleJsonLd = articleSchema({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    author: post.frontmatter.author,
    image: post.frontmatter.image,
    slug: post.slug,
  });

  // 2. Breadcrumbs JSON-LD Schema
  const breadcrumbsJsonLd = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.frontmatter.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <main className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Blog link */}
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 font-semibold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to All Streaming Guides</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider">
                {post.frontmatter.targetKeyword}
              </Badge>
              <Badge variant="secondary" className="text-xs font-semibold">
                {post.frontmatter.tags[0]}
              </Badge>
            </div>

            {/* Exactly One H1 */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {post.frontmatter.title}
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              {post.frontmatter.description}
            </p>

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2 pb-4 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-slate-300">{post.frontmatter.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>
                  {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 mb-12 shadow-2xl">
            <Image
              src={post.frontmatter.image}
              alt={`${post.frontmatter.targetKeyword} — ${post.frontmatter.title}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 850px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
              <Badge className="bg-emerald-500/90 text-slate-950 font-bold">
                Technical Streaming Guide
              </Badge>
              <span className="text-slate-300 font-mono text-[11px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                Anti-Freeze 9.2 Architecture
              </span>
            </div>
          </div>

          {/* Table of Contents Box */}
          {post.headings.length > 0 && (
            <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 mb-10">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-white">
                <List className="w-4 h-4 text-emerald-400" />
                <span>Table of Contents</span>
              </div>
              <nav className="space-y-1.5 text-xs sm:text-sm">
                {post.headings.map((heading) => (
                  <div
                    key={heading.id}
                    className={heading.level === 3 ? 'pl-4' : 'pl-0'}
                  >
                    <a
                      href={`#${heading.id}`}
                      className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5 py-0.5"
                    >
                      <span className="text-emerald-500 font-bold text-[11px]">›</span>
                      <span>{heading.text}</span>
                    </a>
                  </div>
                ))}
              </nav>
            </div>
          )}

          {/* MDX Article Body */}
          <article className="prose prose-invert max-w-none mb-16 text-slate-300">
            {renderMarkdownContent(post.content)}
          </article>

          {/* Article Footer & Free Trial Highlight */}
          <div className="p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 text-center space-y-4 mb-16">
            <h3 className="text-2xl font-bold text-white">
              Test Our 8K Anti-Freeze Streams on Your Device
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Experience all {SITE.stats.liveChannels} live channels, complete local US network coverage, and 60FPS
              sports broadcasts risk-free for {SITE.stats.trialDuration}. No credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" variant="gradient">
                <Link href="/free-trial">
                  <Zap className="w-4 h-4 mr-1.5 fill-current" />
                  Start {SITE.stats.trialDuration} Free Trial
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View Plans & Pricing</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-slate-300 hover:text-emerald-400">
                <Link href="/channels" className="flex items-center gap-1.5">
                  <span>Browse Channels Directory</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Related Posts Section (3 Cards) */}
          {relatedPosts.length > 0 && (
            <section className="mb-16">
              <div className="border-b border-slate-800 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Tv className="w-5 h-5 text-emerald-400" />
                  <span>Related Streaming Guides & Tutorials</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Expand your cord-cutting knowledge with these related articles and optimization tips.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Card
                    key={related.slug}
                    className="group border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between overflow-hidden shadow-lg"
                  >
                    <div>
                      <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                        <Image
                          src={related.frontmatter.image}
                          alt={related.frontmatter.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          <span>{related.readingTime} min read</span>
                        </div>
                      </div>

                      <CardHeader className="p-4 pb-2 space-y-1.5">
                        <CardTitle className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                          <Link href={`/blog/${related.slug}`}>{related.frontmatter.title}</Link>
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-400 line-clamp-2">
                          {related.frontmatter.description}
                        </CardDescription>
                      </CardHeader>
                    </div>

                    <CardFooter className="p-4 pt-0 border-t border-slate-800/80 mt-3 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[10px] uppercase font-mono">
                        {related.frontmatter.tags[0]}
                      </span>
                      <Link
                        href={`/blog/${related.slug}`}
                        className="font-bold text-emerald-400 flex items-center gap-1 text-xs"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Final CTA Component */}
        <FinalCTA
          headline="Ready to Cut the Cord for Good?"
          subheadline={`Stream ${SITE.stats.liveChannels} live channels with 99.9% anti-freeze stability. Instant activation delivered in under 3 minutes.`}
          primaryCta={{ label: `Start ${SITE.stats.trialDuration} Free Trial`, href: '/free-trial' }}
          secondaryCta={{ label: 'View Pricing & Plans', href: '/pricing' }}
        />
      </main>
    </>
  );
}

