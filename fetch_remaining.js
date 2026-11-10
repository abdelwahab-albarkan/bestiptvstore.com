const https = require('https');
const http = require('http');
const fs = require('fs');
const urlModule = require('url');

const remaining = [
  { name: 'iptv_empire', url: 'https://iptv-empire.com/' },
  { name: 'iptvsubs8k', url: 'https://iptvsubs8k.com/' }
];

function fetchWithDetails(targetUrl) {
  return new Promise((resolve) => {
    console.log(`Trying ${targetUrl}...`);
    try {
      const parsed = new urlModule.URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.get(targetUrl, {
        rejectUnauthorized: false,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        timeout: 10000
      }, (res) => {
        let data = '';
        console.log(`Status for ${targetUrl}: ${res.statusCode}, headers: ${JSON.stringify(res.headers.location)}`);
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        });
      });
      req.on('error', (err) => {
        console.log(`Error on ${targetUrl}: ${err.message}`);
        resolve({ error: err.message });
      });
      req.on('timeout', () => {
        console.log(`Timeout on ${targetUrl}`);
        req.destroy();
        resolve({ error: 'Timeout' });
      });
    } catch(e) {
      console.log(`Exception on ${targetUrl}: ${e.message}`);
      resolve({ error: e.message });
    }
  });
}

async function run() {
  for (const t of remaining) {
    const res = await fetchWithDetails(t.url);
    if (res.body) {
      fs.writeFileSync(`${t.name}.html`, res.body);
      console.log(`Saved ${t.name}.html (${res.body.length} bytes)`);
    } else {
      console.log(`Failed to get body for ${t.name}`);
      fs.writeFileSync(`${t.name}_error.txt`, res.error || 'Unknown error');
    }
  }
}

run();

