export const SITE = {
  name: 'IPTVSubs8K',
  legalName: 'IPTVSubs8K Streaming Media LLC',
  domain: 'iptvprostar.com',
  url: 'https://iptvprostar.com',
  email: 'support@streamb4.com',
  whatsapp: '+212625218443',
  whatsappUrl: 'https://wa.me/212625218443',
  currency: 'USD',
  currencySymbol: '$',
  locale: 'en-US',
  targetMarket: 'United States',
  tagline: 'Premium 8K & 4K IPTV Service Provider in USA',
  shortDescription:
    'The premier IPTV service provider engineered specifically for US viewers. Stream 40,000+ live HD, 4K & 8K channels with 99.9% anti-freeze stability.',
  description:
    'The premier IPTV service provider engineered specifically for US viewers. Stream 40,000+ live HD, 4K & 8K channels with 99.9% anti-freeze stability.',
  primaryKeyword: 'Best IPTV USA',
  secondaryKeywords: [
    'IPTV Subscription USA',
    'IPTV USA Free Trial',
    '8K IPTV USA'
  ] as const,
  stats: {
    liveChannels: '40,000+',
    vodMovies: '200,000+',
    seriesCount: '100,000+',
    serverUptime: '99.9%',
    bandwidthSpeed: '10 Gbps',
    activeSubscribers: '65,000+',
    customerRating: 4.9,
    reviewCount: 3840,
    trialDuration: '24 Hours',
    guaranteePeriod: '7 Days',
  },
} as const;

export type SiteConfig = typeof SITE;
