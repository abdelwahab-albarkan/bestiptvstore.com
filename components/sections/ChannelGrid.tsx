'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Tv, CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChannelCategory, Channel } from '@/lib/data/types';
import { SITE } from '@/lib/data/site';

export interface ChannelGridProps {
  categories?: ChannelCategory[];
  initialCategory?: string;
  initialQuery?: string;
}

const ITEMS_PER_PAGE = 24;

export function ChannelGrid({
  categories = [],
  initialCategory,
  initialQuery,
}: ChannelGridProps) {
  // If no categories passed, establish empty fallback safe state
  const categoryList = categories.length > 0 ? categories : [];

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    initialCategory || categoryList[0]?.id || 'all'
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter channels based on category and search query
  const filteredChannels = useMemo(() => {
    let list: (Channel & { categoryName?: string })[] = [];

    if (activeCategoryId === 'all') {
      list = categoryList.flatMap((cat) =>
        cat.channels.map((ch) => ({ ...ch, categoryName: cat.name }))
      );
    } else {
      const selected = categoryList.find((cat) => cat.id === activeCategoryId);
      if (selected) {
        list = selected.channels.map((ch) => ({ ...ch, categoryName: selected.name }));
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (ch) =>
          ch.name.toLowerCase().includes(q) ||
          ch.category.toLowerCase().includes(q) ||
          (ch.categoryName && ch.categoryName.toLowerCase().includes(q))
      );
    }

    return list;
  }, [categoryList, activeCategoryId, searchQuery]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredChannels.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedChannels = filteredChannels.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handler for category switch resets page
  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    setCurrentPage(1);
  };

  // Handler for search resets page
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900" id="channels">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="cyan" className="text-xs uppercase font-bold tracking-wider">
            {SITE.stats.liveChannels} Channels Available
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stream USA Sports, Local Affiliates & Premium Cinema
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Preview our top-rated US channel lineups. Never miss live football, local weather,
            breaking news, or championship boxing cards.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search sports, local channels, HBO, ESPN..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          {categoryList.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  activeCategoryId === 'all'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                All Categories ({categoryList.reduce((acc, c) => acc + c.channels.length, 0)})
              </button>
              {categoryList.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeCategoryId === cat.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {cat.name} ({cat.channels.length})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Channels Grid */}
        {paginatedChannels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedChannels.map((channel, idx) => (
              <div
                key={`${channel.name}-${idx}`}
                className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-emerald-500/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Tv className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="font-semibold text-sm text-slate-100 truncate group-hover:text-emerald-300 transition-colors">
                      {channel.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {channel.categoryName || channel.category}
                    </div>
                  </div>
                </div>

                <Badge
                  variant={channel.resolution.includes('8K') ? 'gold' : channel.resolution.includes('4K') ? 'default' : 'secondary'}
                  className="text-[10px] uppercase font-bold shrink-0 ml-2"
                >
                  {channel.resolution}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 rounded-2xl border border-slate-800 bg-slate-900/30">
            <Tv className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No channels found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">
              We couldn't find any channels matching "{searchQuery}". Try searching for another network or browse categories.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryId('all');
                setCurrentPage(1);
              }}
            >
              Reset Search Filter
            </Button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-between border-t border-slate-800/80 pt-6">
            <div className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-200">{startIndex + 1}</span> to{' '}
              <span className="font-semibold text-slate-200">
                {Math.min(startIndex + ITEMS_PER_PAGE, filteredChannels.length)}
              </span>{' '}
              of <span className="font-semibold text-slate-200">{filteredChannels.length}</span> channels
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={validCurrentPage <= 1}
                className="h-8 px-2.5 text-xs"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="text-xs font-medium text-slate-300 px-2">
                Page {validCurrentPage} of {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={validCurrentPage >= totalPages}
                className="h-8 px-2.5 text-xs"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Call to action & Internal Links */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Button asChild size="lg" variant="gradient">
            <Link href="/free-trial" className="flex items-center gap-2">
              <span>Test All {SITE.stats.liveChannels} Channels with {SITE.stats.trialDuration} Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/channels" className="flex items-center gap-2">
              <span>View Full {SITE.stats.liveChannels} Directory</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
