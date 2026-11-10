const https = require('https');
const http = require('http');
const fs = require('fs');
const urlModule = require('url');

const targets = [
  { name: 'usaiptv_one', url: 'https://usaiptv.one/' },
  { name: 'myiptvsubs', url: 'https://myiptvsubs.com/' },
  { name: 'iptvlevelup_ab', url: 'https://iptvlevelup.com/ab/' },
  { name: 'iptv_empire', url: 'https://iptv-empire.com/' },
  { name: 'iptvsubs8k', url: 'https://iptvsubs8k.com/' }
];

function fetchUrl(targetUrl, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) {
      return reject(new Error('Too many redirects'));
    }
    const parsed = new urlModule.URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new urlModule.URL(res.headers.location, targetUrl).href;
        console.log(`Redirecting from ${targetUrl} to ${nextUrl} (${res.statusCode})`);
        return fetchUrl(nextUrl, maxRedirects - 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          finalUrl: targetUrl,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

function parseHtml(html, baseUrl) {
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
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' '));

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
  const internalLinks = new Set();
  const externalLinks = new Set();
  let baseDomain = '';
  try {
    baseDomain = new urlModule.URL(baseUrl).hostname.replace(/^www\./, '');
  } catch(e) {}

  while ((linkMatch = linkRegex.exec(html)) !== null) {
    const href = linkMatch[1].trim();
    const anchorText = linkMatch[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }
    try {
      const full = new urlModule.URL(href, baseUrl);
      const linkDomain = full.hostname.replace(/^www\./, '');
      if (linkDomain === baseDomain || linkDomain === '') {
        internalLinks.add(JSON.stringify({ url: full.href, path: full.pathname, text: anchorText }));
      } else {
        externalLinks.add(JSON.stringify({ url: full.href, text: anchorText }));
      }
    } catch(e) {
      if (href.startsWith('/')) {
        internalLinks.add(JSON.stringify({ url: href, path: href, text: anchorText }));
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

  return {
    title,
    metaDesc,
    metaKeywords,
    h1s,
    h2s: h2s.slice(0, 20),
    h3s: h3s.slice(0, 20),
    imageCount: images.length,
    images: images.slice(0, 30),
    internalLinksCount: internalLinks.size,
    internalLinksSample: Array.from(internalLinks).slice(0, 25).map(s => JSON.parse(s)),
    externalLinksCount: externalLinks.size,
    wordCount: words.length,
    snippet: text.slice(0, 500)
  };
}

async function run() {
  const results = {};
  for (const t of targets) {
    console.log(`Fetching ${t.name}: ${t.url}...`);
    try {
      const resp = await fetchUrl(t.url);
      console.log(`Successfully fetched ${t.name} (${resp.statusCode}, length: ${resp.body.length})`);
      fs.writeFileSync(`${t.name}.html`, resp.body);
      const parsed = parseHtml(resp.body, resp.finalUrl);
      results[t.name] = {
        name: t.name,
        targetUrl: t.url,
        finalUrl: resp.finalUrl,
        statusCode: resp.statusCode,
        ...parsed
      };
    } catch (err) {
      console.error(`Error fetching ${t.name}:`, err.message);
      results[t.name] = {
        name: t.name,
        targetUrl: t.url,
        error: err.message
      };
    }
  }
  fs.writeFileSync('parsed_results.json', JSON.stringify(results, null, 2));
  console.log('Finished all inspections. Saved to parsed_results.json');
}

run();

