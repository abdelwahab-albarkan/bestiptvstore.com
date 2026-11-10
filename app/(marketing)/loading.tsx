import React from 'react';
import { Loader2 } from 'lucide-react';

export default function MarketingLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
      <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
      <p className="text-slate-400 text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}

