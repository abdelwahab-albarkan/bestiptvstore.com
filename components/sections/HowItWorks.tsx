import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Mail, PlayCircle, ArrowRight, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SITE } from '@/lib/data/site';

export interface HowItWorksStep {
  title: string;
  description: string;
  icon?: string;
}

export interface HowItWorksProps {
  steps?: HowItWorksStep[];
}

const STEP_ICONS: LucideIcon[] = [ShoppingCart, Mail, PlayCircle];

export function HowItWorks({ steps }: HowItWorksProps) {
  const defaultSteps: HowItWorksStep[] = [
    {
      title: 'Choose Plan or Free Trial',
      description: `Select your preferred duration (1, 3, 6, or 12 months) or test our servers first with a completely free ${SITE.stats.trialDuration} trial—no credit card required.`,
    },
    {
      title: 'Get Instant Credentials',
      description: 'Within 3 minutes of submitting, receive your Xtream Codes API login, M3U playlist link, and interactive EPG guide directly in your inbox.',
    },
    {
      title: 'Watch Anywhere',
      description: 'Follow our simple 3-minute setup guide on your Amazon Firestick, Smart TV, or Android device. Plug in your credentials and enjoy native 8K streaming.',
    },
  ];

  const displaySteps = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="py-20 bg-slate-900/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="default" className="text-xs uppercase font-bold tracking-wider">
            Quick 3-Minute Setup
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How to Get Started with {SITE.name} in 3 Simple Steps
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            No technical knowledge needed. Our automated provisioning system activates your account
            in seconds so you can watch live TV right away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {displaySteps.map((step, idx) => {
            const Icon = STEP_ICONS[idx % STEP_ICONS.length];
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-4xl font-black text-slate-800 font-mono">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    Step {idx + 1} of {displaySteps.length}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center space-y-3">
          <Button asChild size="lg" variant="gradient">
            <Link href="/free-trial" className="flex items-center gap-2">
              <span>Start Your {SITE.stats.trialDuration} Free Trial Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <p className="text-xs text-slate-400">
            Need help? See our{' '}
            <Link
              href="/setup/firestick"
              className="text-emerald-400 font-semibold underline hover:text-emerald-300 transition-colors"
            >
              Firestick setup guide
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
