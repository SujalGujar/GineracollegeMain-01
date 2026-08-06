const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(srcDir);
let changedFiles = 0;

const DYNAMIC_URL = "${window.location.hostname === 'localhost' ? 'http://localhost:8080' : ''}";

files.forEach(file => {
    if (!file.endsWith('.js') && !file.endsWith('.jsx') && !file.endsWith('.ts') && !file.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Replace template string literals
    content = content.replace(/`http:\/\/localhost:8080\$\{/g, '`' + DYNAMIC_URL + '${');
    
    // Replace plain strings
    content = content.replace(/'http:\/\/localhost:8080/g, '`' + DYNAMIC_URL + '` + \'');
    content = content.replace(/"http:\/\/localhost:8080/g, '`' + DYNAMIC_URL + '` + "');
    
    // Fix axiosInstance.js specifically
    if (file.endsWith('axiosInstance.js')) {
      content = `import axios from 'axios';\n\nconst baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' \n  ? 'http://localhost:8080/api' \n  : '/api';\n\nconst axiosInstance = axios.create({\n  baseURL,\n  timeout: 15000,\n});\n\nexport default axiosInstance;\n`;
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
        changedFiles++;
    }
});

console.log(`Updated ${changedFiles} files successfully.`);
