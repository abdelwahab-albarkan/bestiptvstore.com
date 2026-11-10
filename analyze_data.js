const fs = require('fs');
const urlModule = require('url');

const files = [
  { id: 'usaiptv_one', name: 'USA IPTV (usaiptv.one)', url: 'https://usaiptv.one/', file: 'usaiptv_one.html' },
  { id: 'myiptvsubs', name: 'My IPTV Subs (myiptvsubs.com)', url: 'https://myiptvsubs.com/', file: 'myiptvsubs.html' },
  { id: 'iptvlevelup', name: 'IPTV Level Up (iptvlevelup.com/ab/)', url: 'https://iptvlevelup.com/ab/', file: 'iptvlevelup_ab.html' },
  { id: 'iptv_empire', name: 'IPTV Empire (iptv-empire.com)', url: 'https://iptv-empire.com/', file: 'iptv_empire.html' },
  { id: 'iptvsubs8k', name: 'Our Website (iptvsubs8k.com)', url: 'https://iptvsubs8k.com/', file: 'iptvsubs8k.html' }
];

function analyze(fileObj) {
  const html = fs.readFileSync(fileObj.file, 'utf8');
  const baseUrl = fileObj.url;

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, ' ') : '';

  // Meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : '';

  // Meta keywords
  const metaKeywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i) ||
                           html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']keywords["']/i);
  const metaKeywords = metaKeywordsMatch ? metaKeywordsMatch[1].trim() : '';

  // Headings
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')).filter(Boolean);
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')).filter(Boolean);
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')).filter(Boolean);

  // Images
  const imgRegex = /<img\b([^>]*?)>/gi;
  let imgMatch;
  const images = [];
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const tag = imgMatch[1];
    const srcMatch = tag.match(/src=["']([^"']+)["']/i);
    const altMatch = tag.match(/alt=["']([^"']*)["']/i);
    images.push({
      src: srcMatch ? srcMatch[1] : '',
      alt: altMatch ? altMatch[1] : ''
    });
  }

  // Links
  const linkRegex = /<a\b[^>]*?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let linkMatch;
  const internalLinks = new Map();
  const externalLinks = new Map();
  let baseHostname = '';
  try {
    baseHostname = new urlModule.URL(baseUrl).hostname.replace(/^www\./, '');
  } catch(e) {}

  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const href = linkMatch[1].trim();
    const anchorText = linkMatch[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    try {
      const full = new urlModule.URL(href, baseUrl);
      const linkHost = full.hostname.replace(/^www\./, '');
      if (linkHost === baseHostname || linkHost === '') {
        internalLinks.set(full.href, anchorText);
      } else {
        externalLinks.set(full.href, anchorText);
      }
    } catch(e) {
      if (href.startsWith('/')) {
        internalLinks.set(href, anchorText);
      }
    }
  }

  // Text content & Word count
  let text = html;
  text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');
  text = text.replace(/<!--[\s\S]*?-->/g, ' ');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/\s+/g, ' ').trim();
  const words = text ? text.split(/\s+/).filter(w => w.length > 0) : [];

  // Keywords count
  const lowerText = text.toLowerCase();
  function countPhrase(phrase) {
    const regex = new RegExp('\\b' + phrase.toLowerCase().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'g');
    const matches = lowerText.match(regex);
    return matches ? matches.length : 0;
  }

  const keywordCounts = {
    'usa iptv': countPhrase('usa iptv'),
    'iptv usa': countPhrase('iptv usa'),
    'iptv subscription': countPhrase('iptv subscription'),
    'best iptv': countPhrase('best iptv'),
    'iptv': countPhrase('iptv'),
    'iptv provider': countPhrase('iptv provider'),
    'iptv stream': countPhrase('iptv stream'),
    'buy iptv': countPhrase('buy iptv')
  };

  return {
    id: fileObj.id,
    name: fileObj.name,
    url: fileObj.url,
    title,
    metaDesc,
    metaKeywords,
    h1s,
    h2s: h2s.slice(0, 15),
    h3s: h3s.slice(0, 15),
    totalImages: images.length,
    imagesWithAlt: images.filter(img => img.alt.trim().length > 0).length,
    imagesWithoutAlt: images.filter(img => img.alt.trim().length === 0).length,
    imagesSample: images.slice(0, 15),
    wordCount: words.length,
    internalLinksCount: internalLinks.size,
    internalLinksList: Array.from(internalLinks.entries()).slice(0, 25),
    externalLinksCount: externalLinks.size,
    keywordCounts,
    textSnippet: text.slice(0, 400)
  };
}

const allData = files.map(analyze);
fs.writeFileSync('analyzed_summary.json', JSON.stringify(allData, null, 2));
console.log('Analysis written to analyzed_summary.json');

