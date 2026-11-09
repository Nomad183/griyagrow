import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, 'src');
const ASSETS_DIR = path.join(__dirname, 'public', 'assets');

// 1. Get all assets and figure out their correct new paths
function getAssetMap(dirPath, assetMap = {}) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAssetMap(fullPath, assetMap);
    } else {
      // Create a mapping of "filename.png" -> "/assets/FolderName/filename.png"
      const relativeToPublic = fullPath.split(path.sep + 'public' + path.sep)[1].replace(/\\/g, '/');
      assetMap[file] = '/' + relativeToPublic;
    }
  });
  return assetMap;
}

const assetMap = getAssetMap(ASSETS_DIR);
console.log(`✅ Mapped ${Object.keys(assetMap).length} assets from public/assets/`);

// 2. Helper to get all JSX files
function getAllCodeFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllCodeFiles(fullPath, arrayOfFiles);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

const codeFiles = getAllCodeFiles(SRC_DIR);
let updatedFilesCount = 0;

// 3. Update the paths in every file
codeFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;

  // Find all string literals that look like old asset paths: "/assets/something.png" or "assets/something.png"
  Object.keys(assetMap).forEach(fileName => {
    const correctPath = assetMap[fileName];
    
    // Regex to match the old path, ensuring we don't double-replace already correct paths
    const oldPathRegex = new RegExp(`['"\`](/?assets/)${fileName}['"\`]`, 'g');
    
    if (oldPathRegex.test(content)) {
      content = content.replace(oldPathRegex, (match, prefix) => {
        // Return with the new correct path wrapped in the same quotes
        const quote = match[0]; 
        return `${quote}${correctPath}${quote}`;
      });
      hasChanges = true;
    }
  });

  if (hasChanges) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`🔄 Updated paths in: ${path.basename(file)}`);
    updatedFilesCount++;
  }
});

console.log(`\n🎉 Done! Modified ${updatedFilesCount} files to use the correct role-based asset folders.`);