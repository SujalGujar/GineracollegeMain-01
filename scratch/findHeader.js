const fs = require('fs');
const lines = fs.readFileSync('src/components/AdminPanel.jsx', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.includes('const Header =') || l.includes('function Header(') || l.includes('Header = (')) {
    console.log(i + 1, l);
  }
});
