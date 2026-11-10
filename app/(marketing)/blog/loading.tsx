import React from 'react';

export default function BlogListLoading() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <div className="h-6 w-32 bg-slate-805 rounded-full mx-auto animate-pulse" />
        <div className="h-10 w-3/4 bg-slate-800 rounded-xl mx-auto animate-pulse" />
        <div className="h-4 w-full bg-slate-800 rounded-lg mx-auto animate-pulse" />
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 space-y-4 animate-pulse"
          >
            <div className="aspect-[16/9] w-full bg-slate-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 w-1/3 bg-slate-800 rounded" />
              <div className="h-6 w-5/6 bg-slate-800 rounded" />
              <div className="h-4 w-full bg-slate-800/60 rounded" />
              <div className="h-4 w-2/3 bg-slate-800/60 rounded" />
            </div>
            <div className="h-4 w-1/4 bg-slate-800 rounded pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

