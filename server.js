const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.join(__dirname);
const IGNORED_DIRS = new Set(['.git', 'node_modules', '.DS_Store', '__MACOSX']);
const SLIDE_FILE = 'slide.html';

function normalizeTitle(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b(\w)/g, (_, first) => first.toUpperCase())
    .trim();
}

function inferTitleFromHtml(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch && titleMatch[1].trim()) return titleMatch[1].trim();

  const headingMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || html.match(/<h2[^>]*>([^<]+)<\/h2>/i);
  if (headingMatch && headingMatch[1].trim()) return headingMatch[1].trim();

  return null;
}

function hasExternalIframe(html) {
  return /<iframe\b[^>]*\bsrc\s*=\s*["']https?:\/\//i.test(html);
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function generateId(relPath) {
  return relPath
    .replace(/[\/\\]+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
    .toLowerCase();
}

async function buildSlideNode(dirPath, relPath) {
  const slidePath = path.join(dirPath, SLIDE_FILE);
  if (!(await exists(slidePath))) return null;

  const html = await fs.readFile(slidePath, 'utf8');
  const title = inferTitleFromHtml(html) || normalizeTitle(path.basename(dirPath));
  const external = hasExternalIframe(html);
  const node = {
    title,
    id: generateId(relPath),
    src: external ? 'external' : path.posix.join(relPath, SLIDE_FILE),
    path: path.posix.join(relPath, SLIDE_FILE)
  };

  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const childDirs = entries
    .filter(entry => entry.isDirectory() && !IGNORED_DIRS.has(entry.name) && !entry.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  const children = [];
  for (const child of childDirs) {
    const childNode = await buildSlideNode(path.join(dirPath, child.name), path.posix.join(relPath, child.name));
    if (childNode) children.push(childNode);
  }

  if (children.length) node.slides = children;
  return node;
}

async function buildTreeStructure() {
  const startNode = await buildSlideNode(path.join(ROOT_DIR, 'start'), 'start');
  if (!startNode) {
    throw new Error('Missing required start/slide.html in the repository root.');
  }

  const entries = await fs.readdir(ROOT_DIR, { withFileTypes: true });
  const sectionDirs = entries
    .filter(entry => entry.isDirectory() && entry.name !== 'start' && !IGNORED_DIRS.has(entry.name) && !entry.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  const slides = [];
  for (const section of sectionDirs) {
    const sectionNode = await buildSlideNode(path.join(ROOT_DIR, section.name), section.name);
    if (sectionNode) slides.push(sectionNode);
  }

  return {
    title: startNode.title || 'Start',
    id: startNode.id,
    src: startNode.src,
    path: startNode.path,
    slides
  };
}

app.get('/api/tree', async (req, res) => {
  try {
    const tree = await buildTreeStructure();
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use(express.static(ROOT_DIR));

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`AiLiteracy server running at http://localhost:${PORT}`);
});
