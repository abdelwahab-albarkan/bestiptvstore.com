import React from 'react';

export default function BlogPostLoading() {
  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-28 bg-slate-800 rounded" />
        <div className="h-10 sm:h-12 w-4/5 bg-slate-800 rounded-xl" />
        <div className="h-5 w-2/3 bg-slate-800/70 rounded-lg" />
        <div className="flex gap-4 pt-2">
          <div className="h-4 w-32 bg-slate-800 rounded" />
          <div className="h-4 w-24 bg-slate-800 rounded" />
        </div>
      </div>

      {/* Hero Image Skeleton */}
      <div className="aspect-[16/9] w-full max-w-3xl mx-auto bg-slate-800 rounded-2xl" />

      {/* Content Skeleton Lines */}
      <div className="space-y-4 max-w-3xl mx-auto pt-6">
        <div className="h-4 w-full bg-slate-800/60 rounded" />
        <div className="h-4 w-full bg-slate-800/60 rounded" />
        <div className="h-4 w-5/6 bg-slate-800/60 rounded" />
        <div className="h-8 w-1/2 bg-slate-800 rounded mt-8" />
        <div className="h-4 w-full bg-slate-800/60 rounded" />
        <div className="h-4 w-3/4 bg-slate-800/60 rounded" />
      </div>
    </div>
  );
}

