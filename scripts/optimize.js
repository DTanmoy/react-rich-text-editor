const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const DIST_DIR = path.join(__dirname, '../dist');

async function optimizeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const result = await minify(content, {
    compress: true,
    mangle: true,
    format: {
      comments: false
    }
  });
  fs.writeFileSync(filePath, result.code);
}

async function optimizeDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      await optimizeDirectory(filePath);
    } else if (file.endsWith('.js')) {
      await optimizeFile(filePath);
    }
  }
}

async function main() {
  try {
    await optimizeDirectory(DIST_DIR);
    console.log('Optimization complete!');
  } catch (error) {
    console.error('Optimization failed:', error);
    process.exit(1);
  }
}

main(); 