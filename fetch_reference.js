const https = require('https');
const http = require('http');
const fs = require('fs');
const urlModule = require('url');

function fetchUrl(targetUrl, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) return reject(new Error('Too many redirects'));
    const parsed = new urlModule.URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const req = client.get(targetUrl, {
      rejectUnauthorized: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 15000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = new urlModule.URL(res.headers.location, targetUrl).href;
        console.log(`Redirecting to ${nextUrl}`);
        return fetchUrl(nextUrl, maxRedirects - 1).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url: targetUrl, status: res.statusCode, data }));
    });
    req.on('error', err => reject(err));
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

fetchUrl('https://iptvresellerpanel.store')
  .then(res => {
    fs.writeFileSync('reference_site.html', res.data);
    console.log(`Saved reference_site.html (${res.data.length} bytes)`);
  })
  .catch(err => console.error('Fetch error:', err.message));

