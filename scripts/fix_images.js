const fs = require('fs');
const path = require('path');

const pageJsPath = path.join(__dirname, 'src', 'app', 'yayinlar', 'page.js');
let pageJsContent = fs.readFileSync(pageJsPath, 'utf8');

const regex = /image:\s*['"](\/images\/[^'"]+)['"]/g;
let match;
while ((match = regex.exec(pageJsContent)) !== null) {
    const origUrl = match[1];
    const decodedUrl = decodeURI(origUrl);
    const parts = decodedUrl.split('/');
    const filename = parts.pop();
    const dir = path.join(__dirname, 'public', ...parts);

    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        // Find closest match (e.g. ignoring dots and case)
        const strippedTarget = filename.replace(/\./g, '').toLowerCase();
        let bestMatch = files.find(f => f.replace(/\./g, '').toLowerCase() === strippedTarget);

        if (bestMatch && bestMatch !== filename) {
            const newUrl = origUrl.replace(filename, encodeURI(bestMatch));
            console.log(`Replacing ${origUrl} with ${newUrl}`);
            pageJsContent = pageJsContent.replace(`image: '${origUrl}'`, `image: '${newUrl}'`);
            pageJsContent = pageJsContent.replace(`image: "${origUrl}"`, `image: "${newUrl}"`);
        }
    }
}

fs.writeFileSync(pageJsPath, pageJsContent, 'utf8');
console.log('Fixed page.js');
