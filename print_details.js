const fs = require('fs');

const summary = JSON.parse(fs.readFileSync('analyzed_summary.json', 'utf8'));

for (const s of summary) {
  console.log('==============================');
  console.log(`SITE: ${s.name} (${s.url})`);
  console.log(`TITLE: "${s.title}"`);
  console.log(`META: "${s.metaDesc}"`);
  console.log(`H1s:`, s.h1s);
  console.log(`WORD COUNT: ${s.wordCount}`);
  console.log(`TOTAL IMAGES: ${s.totalImages} (With Alt: ${s.imagesWithAlt}, Without Alt: ${s.imagesWithoutAlt})`);
  console.log(`INTERNAL LINKS: ${s.internalLinksCount}`);
  console.log(`KEYWORD COUNTS:`, s.keywordCounts);
}

