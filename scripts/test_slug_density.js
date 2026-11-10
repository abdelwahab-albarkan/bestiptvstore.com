const http = require('http');

http.get('http://localhost:3011/iptv-service', res => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
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
    const kwRegex = /best iptv usa/gi;
    const matches = cleanText.match(kwRegex) || [];

    console.log('Title:', title);
    console.log('Title has Best IPTV USA:', title.toLowerCase().includes('best iptv usa'));
    console.log('H1:', h1Matches[0]);
    console.log('H1 has Best IPTV USA:', h1Matches.some(h => h.toLowerCase().includes('best iptv usa')));
    console.log('Total H2s:', h2Matches.length, '| H2s with Best IPTV USA:', h2Matches.filter(h => h.toLowerCase().includes('best iptv usa')).length);
    h2Matches.forEach((h, i) => console.log('  H2[' + i + ']:', h));
    console.log('Total H3s:', h3Matches.length, '| H3s with Best IPTV USA:', h3Matches.filter(h => h.toLowerCase().includes('best iptv usa')).length);
    h3Matches.forEach((h, i) => console.log('  H3[' + i + ']:', h));
    console.log('Total Words:', words.length);
    console.log('Occurrences of Best IPTV USA:', matches.length);
    const phraseDensity = ((matches.length / words.length) * 100).toFixed(2);
    const wordDensity = (((matches.length * 3) / words.length) * 100).toFixed(2);
    console.log('Phrase Density (count / totalWords):', phraseDensity + '%');
    console.log('Word Density (count*3 / totalWords):', wordDensity + '%');
  });
}).on('error', err => console.error(err));

