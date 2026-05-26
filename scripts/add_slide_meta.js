#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const d of list) {
    const full = path.join(dir, d.name);
    if (d.isDirectory()) {
      if (d.name === 'node_modules' || d.name === '.git') continue;
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

const root = process.cwd();
const all = walk(root);
const slides = all.filter(f => f.split(path.sep).pop() === 'slide.html');

console.log(`Found ${slides.length} slide.html files`);

for (const file of slides) {
  try {
    let s = fs.readFileSync(file, 'utf8');
    if (s.includes('name="slide-title"') || s.includes("name='slide-title'")) {
      // already has meta, skip
      continue;
    }

    const titleMatch = s.match(/<title>([\s\S]*?)<\/title>/i);
    let title = titleMatch ? titleMatch[1].trim() : path.basename(path.dirname(file));
    if (!title) title = path.basename(path.dirname(file));
    const esc = title.replace(/"/g, '&quot;');
    const meta = `    <meta name="slide-title" content="${esc}" />\n    <meta name="short-title" content="${esc}" />\n`;

    if (/\<meta[^>]*charset[^>]*\>/i.test(s)) {
      s = s.replace(/(\<meta[^>]*charset[^>]*\>)/i, `$1\n${meta}`);
    } else if (/\<head[^>]*\>/i.test(s)) {
      s = s.replace(/(\<head[^>]*\>)/i, `$1\n${meta}`);
    } else {
      console.warn('No <head> found for', file);
      continue;
    }

    fs.writeFileSync(file, s, 'utf8');
    console.log('Updated', file);
  } catch (err) {
    console.error('Error processing', file, err.message);
  }
}

console.log('Done');
