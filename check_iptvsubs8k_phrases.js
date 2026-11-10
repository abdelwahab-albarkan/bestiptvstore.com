const fs = require('fs');
const html = fs.readFileSync('iptvsubs8k.html', 'utf8');

// Strip tags
let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
               .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
               .replace(/<[^>]+>/g, ' ')
               .replace(/\s+/g, ' ');

const terms = ['iptv', 'usa', 'united states', 'us', 'service', 'provider', 'subscription', 'streaming', 'anti-freeze', '8k', '4k'];
terms.forEach(t => {
  const reg = new RegExp('\\b' + t + '\\b', 'gi');
  const count = (text.match(reg) || []).length;
  console.log(`${t}: ${count}`);
});

// Check two-word phrases
const phrases = ['iptv service', 'iptv provider', 'iptv in usa', 'iptv in the usa', 'iptv usa', 'usa iptv', 'us iptv', 'iptv subscription'];
phrases.forEach(p => {
  const reg = new RegExp(p, 'gi');
  const count = (text.match(reg) || []).length;
  console.log(`"${p}": ${count}`);
});

