const http = require('http');

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3011' + path, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function analyzeHtml(html, kw = 'best iptv usa') {
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : '';
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  const h3Matches = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());

  const cleanText = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleanText.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;

  const kwRegex = new RegExp(kw.replace(/\s+/g, '\\s+'), 'gi');
  const kwMatches = cleanText.match(kwRegex) || [];
  const count = kwMatches.length;

  const phraseDensity = totalWords > 0 ? ((count / totalWords) * 100).toFixed(2) : '0';
  const wordDensity = totalWords > 0 ? (((count * 3) / totalWords) * 100).toFixed(2) : '0';

  return {
    title,
    h1: h1Matches,
    h2Count: h2Matches.length,
    h2WithKw: h2Matches.filter(h => h.toLowerCase().includes(kw)).length,
    h3Count: h3Matches.length,
    h3WithKw: h3Matches.filter(h => h.toLowerCase().includes(kw)).length,
    totalWords,
    count,
    phraseDensity: phraseDensity + '%',
    wordDensity: wordDensity + '%'
  };
}

async function run() {
  const routes = ['/', '/pricing', '/channels', '/free-trial', '/directory', '/setup', '/setup/firestick', '/iptv-service'];
  for (const r of routes) {
    try {
      const html = await fetchPage(r);
      const res = analyzeHtml(html, 'best iptv usa');
      console.log('=== ROUTE:', r, '===');
      console.log('Title:', res.title.toLowerCase().includes('best iptv usa'), '->', res.title);
      console.log('H1:', res.h1.some(h => h.toLowerCase().includes('best iptv usa')), '->', res.h1[0]);
      console.log('H2 with KW:', res.h2WithKw, '/', res.h2Count);
      console.log('H3 with KW:', res.h3WithKw, '/', res.h3Count);
      console.log('Count:', res.count, '| Total words:', res.totalWords);
      console.log('Phrase Density (count / totalWords):', res.phraseDensity);
      console.log('Word Density (count*3 / totalWords):', res.wordDensity);
      console.log('-------------------------------------------');
    } catch (e) {
      console.error('Error fetching', r, e.message);
    }
  }
}

run();

