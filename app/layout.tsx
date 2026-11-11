import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE } from '@/lib/data/site';
import { buildMetadata } from '@/lib/seo/metadata';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = buildMetadata({
  title: `${SITE.primaryKeyword} (2026) | Premium 4K & 8K IPTV Subscription — ${SITE.name}`,
  description: SITE.description,
  path: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = organizationSchema();
  const siteJsonLd = websiteSchema();

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/images/iptv/iptv-icon.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-hidden antialiased selection:bg-emerald-500 selection:text-slate-950">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-slate-950 focus:rounded-md focus:font-bold"
        >
          Skip to content
        </a>
        <Header />
        <div className="flex-1 flex flex-col" id="main-content">
          {children}
        </div>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
