import fs from 'fs';
import path from 'path';

export interface SeoPageHighlight {
  label: string;
  desc: string;
}

export interface SeoPageFeatureRow {
  feature: string;
  us: string;
  others: string;
}

export interface SeoPageStep {
  step: number;
  title: string;
  text: string;
}

export interface SeoPageFaq {
  q: string;
  a: string;
}

export interface SeoPageRelated {
  slug: string;
  title: string;
  cluster: string;
}

export interface SeoPageBreadcrumb {
  name: string;
  url: string;
}

export interface SeoPage {
  id: number;
  priority: string;
  quickWin: boolean;
  primaryKeyword: string;
  slug: string;
  cluster: string;
  pageType: string;
  volume: number;
  totalGroupVolume: number;
  variantsCount: number;
  kd: number;
  score: number;
  secondaryKeywords: string[];
  entity: string;
  silo: string;
  badge: string;
  schemaType: 'Article' | 'HowTo' | 'Product' | 'FAQPage';
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  quickHighlights: SeoPageHighlight[];
  sections: {
    overview: { title: string; content: string };
    features: { title: string; rows: SeoPageFeatureRow[] };
    steps: { title: string; steps: SeoPageStep[] };
    deepDive: { title: string; content: string };
    prosAndCons: { pros: string[]; cons: string[] };
  };
  faqs: SeoPageFaq[];
  relatedSlugs: SeoPageRelated[];
  breadcrumbs: SeoPageBreadcrumb[];
}

let cachedPages: SeoPage[] | null = null;

function loadPages(): SeoPage[] {
  if (cachedPages) return cachedPages;
  const filePath = path.join(process.cwd(), 'data', 'seo_pages_master.json');
  if (!fs.existsSync(filePath)) {
    throw new Error(`[SeoPages Loader] Missing data file at ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  cachedPages = JSON.parse(content) as SeoPage[];
  return cachedPages;
}

export function getAllSeoPages(): SeoPage[] {
  return loadPages();
}

export function getSeoPageBySlug(slug: string): SeoPage | null {
  const pages = loadPages();
  return pages.find((p) => p.slug === slug) || null;
}

export function getAllSeoPageSlugs(): string[] {
  const pages = loadPages();
  return pages.map((p) => p.slug);
}

export function getSeoPagesByCluster(cluster: string): SeoPage[] {
  const pages = loadPages();
  return pages.filter((p) => p.cluster === cluster);
}

export function getSeoPagesBySilo(silo: string): SeoPage[] {
  const pages = loadPages();
  return pages.filter((p) => p.silo === silo);
}

