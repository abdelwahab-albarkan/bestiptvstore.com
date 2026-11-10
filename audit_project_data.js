const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'project-data');
const files = fs.readdirSync(dir);

const forbidden = ['todo', 'example', 'lorem', 'placeholder', 'dummy', 'test@test.com'];

console.log('--- PROJECT DATA AUDIT ---');

files.forEach(file => {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`\nFile: ${file} (${content.length} bytes)`);

  let foundIssues = [];
  forbidden.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    if (regex.test(content)) {
      foundIssues.push(word);
    }
  });

  if (file.endsWith('.json')) {
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        console.log(`  Items count: ${parsed.length}`);
        if (parsed.length > 0) {
          console.log(`  Sample item keys:`, Object.keys(parsed[0]));
        }
      } else {
        console.log(`  Keys:`, Object.keys(parsed));
      }
    } catch(e) {
      console.log(`  JSON parse error: ${e.message}`);
    }
  } else {
    // Markdown
    console.log(`  Lines: ${content.split('\n').length}`);
  }

  if (foundIssues.length > 0) {
    console.log(`  WARNING: Found potential placeholder words: ${foundIssues.join(', ')}`);
  } else {
    console.log(`  Status: CLEAN, NO placeholder/lorem words found.`);
  }
});

