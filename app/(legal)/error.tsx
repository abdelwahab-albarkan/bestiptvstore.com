'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LegalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Legal Error Boundary]', error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
        <AlertCircle className="w-7 h-7" />
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
        Unable to Load Document
      </h1>

      <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-6">
        {error.message || 'An error occurred while loading the policy. Please try again.'}
      </p>

      <div className="flex items-center justify-center gap-3">
        <Button onClick={() => reset()} size="sm" variant="gradient">
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Try Again
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/">
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

