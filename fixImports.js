const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (filePath.match(/\.(js|jsx|ts|tsx)$/)) {
            let content = fs.readFileSync(filePath, 'utf8');
            // Regex to match imports with versions like "package@1.2.3" or 'package@^1.2.3'
            const regex = /(['"])((?:@[a-zA-Z0-9_-]+\/)?[a-zA-Z0-9_-]+)@\^?[0-9][0-9a-zA-Z.-]*\1/g;
            let newContent = content.replace(regex, "$1$2$1");
            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated imports in ${filePath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
