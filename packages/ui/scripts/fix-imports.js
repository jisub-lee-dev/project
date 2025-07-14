const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/components/ui');

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // @/lib/utils -> ../../lib/utils
  content = content.replace(/@\/lib\/utils/g, '../../lib/utils');
  
  // @/components/ui/ -> ./
  content = content.replace(/@\/components\/ui\//g, './');
  
  fs.writeFileSync(filePath, content);
  console.log(`Fixed imports in: ${path.basename(filePath)}`);
}

// 모든 .tsx 파일 처리
fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx'))
  .forEach(file => {
    fixImports(path.join(componentsDir, file));
  });
