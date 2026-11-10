const https = require('https');
const http = require('http');
const fs = require('fs');

const req = https.get('https://iptvsubs8k.com/', {
  rejectUnauthorized: false,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  },
  timeout: 30000
}, (res) => {
  console.log(`Status: ${res.statusCode}, Content-Length: ${res.headers['content-length']}`);
  let data = '';
  res.on('data', chunk => {
    data += chunk;
    console.log(`Received chunk: ${chunk.length} bytes (Total: ${data.length})`);
  });
  res.on('end', () => {
    console.log(`Finished receiving ${data.length} bytes.`);
    fs.writeFileSync('iptvsubs8k.html', data);
  });
});

req.on('error', err => console.log('Req error:', err.message));
req.on('timeout', () => {
  console.log('Timeout fired');
  req.destroy();
});

