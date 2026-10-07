const { spawn } = require('child_process');
const http = require('http');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  // Get WebSocket debugger URL
  const versionRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await versionRes.json();
  console.log('Tabs:', tabs.map(t => ({ url: t.url, title: t.title })));

  const tab = tabs.find(t => t.url.includes('localhost:3000'));
  if (!tab) {
    console.log('No tab found');
    chrome.kill();
    return;
  }

  const WebSocket = require('ws'); // let's see if ws exists or use native Node fetch
}

main().catch(console.error);
