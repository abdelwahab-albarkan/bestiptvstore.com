'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Send, AlertCircle, Loader2 } from 'lucide-react';

export function FreeTrialForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [device, setDevice] = useState<'Firestick' | 'Android' | 'iOS' | 'Smart TV' | 'Windows' | 'Mac'>('Firestick');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/free-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, device }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.message || data.error || 'Failed to submit trial request. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection error. Please verify your internet and retry.');
    }
  };

  return (
    <Card className="border-slate-800 bg-slate-900/70 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      {status === 'success' ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-white">Trial Line Generated!</h3>
          <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
            Welcome, <span className="text-white font-semibold">{name}</span>! Your 24-hour test credentials
            and step-by-step setup guide for your{' '}
            <span className="text-emerald-400 font-semibold">{device}</span> have been sent to{' '}
            <span className="font-semibold text-emerald-400">{email}</span>.
          </p>
          <div className="pt-2 text-xs text-slate-400">
            Please check your inbox (and spam/promotions folder) within 3 minutes.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {status === 'error' && errorMessage && (
            <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Your Full Name
            </label>
            <input
              type="text"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Email Address (for instant credentials delivery)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Select Your Primary Streaming Device
            </label>
            <select
              value={device}
              onChange={(e) => setDevice(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
            >
              <option value="Firestick">Amazon Firestick & Fire TV</option>
              <option value="Android">Android TV & Google TV (Nvidia Shield)</option>
              <option value="Smart TV">Samsung or LG Smart TV (Tizen / webOS)</option>
              <option value="iOS">Apple TV & iOS (iPhone / iPad)</option>
              <option value="Windows">Windows PC</option>
              <option value="Mac">Mac OS</option>
            </select>
          </div>

          <Button
            type="submit"
            disabled={status === 'loading'}
            variant="gradient"
            className="w-full h-12 text-base font-bold"
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Trial Credentials...</span>
              </span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Claim My Free 24-Hour Access
              </>
            )}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> No Payment Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Full +40,000 Channels Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Instant 3-Min Activation
            </span>
          </div>
        </form>
      )}
    </Card>
  );
}
