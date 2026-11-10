'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Marketing Error Boundary]', error);
  }, [error]);

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
        Something Went Wrong
      </h1>

      <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
        {error.message || 'An unexpected error occurred while loading this page. Please try again.'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => reset()} variant="gradient">
          <RotateCcw className="w-4 h-4 mr-1.5" />
          Try Again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="w-4 h-4 mr-1.5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

