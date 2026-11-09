import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

// Helper to get all files in a directory recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

// 1. Get all your code files (.jsx, .js, .css)
const codeFiles = getAllFiles(SRC_DIR).filter(f => f.match(/\.(jsx?|css)$/));

// 2. Read all code and extract every word that looks like a filename 
// (e.g. "mitra-bg.png", "staff-icon.svg")
let allCodeText = '';
codeFiles.forEach(file => {
  allCodeText += fs.readFileSync(file, 'utf8') + '\n';
});

// 3. Get all asset files from public/assets/
const assetFiles = getAllFiles(ASSETS_DIR);

let deletedCount = 0;

console.log('🔍 Scanning for unused assets...\n');

// 4. Check each asset to see if its exact filename is mentioned in the code
assetFiles.forEach(assetPath => {
  const fileName = path.basename(assetPath);
  
  // If the filename (e.g. 'logo.png') is NOT found anywhere in your source code
  if (!allCodeText.includes(fileName)) {
    console.log(`🗑️ Deleting unused asset: ${fileName} (from ${path.basename(path.dirname(assetPath))})`);
    fs.unlinkSync(assetPath); // This deletes the file
    deletedCount++;
  }
});

console.log(`\n✅ Cleanup complete! Removed ${deletedCount} unused assets.`);