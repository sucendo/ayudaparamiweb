const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

test('el buscador usa la fuente original de iconos Codrops para la lupa', () => {
  const root = path.join(__dirname, '..');
  const css = fs.readFileSync(path.join(root, 'public', 'css', 'main.css'), 'utf8');
  const fontPath = path.join(root, 'public', 'fonts', 'codrops-social.woff');

  assert.ok(fs.existsSync(fontPath), 'Falta public/fonts/codrops-social.woff');
  assert.match(css, /font-family:\s*['"]apmw-social['"]/);
  assert.match(css, /url\(['"]?\.\.\/fonts\/codrops-social\.woff['"]?\)\s*format\(['"]woff['"]\)/);
  assert.match(css, /\.ct-icon-search:before\s*\{[\s\S]*?content:\s*["']\\e006["']/);
});
