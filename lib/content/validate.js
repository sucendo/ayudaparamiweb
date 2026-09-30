const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');

function fail(message) {
  throw new Error(message);
}

function readDir(folder, extension) {
  const dir = path.join(ROOT, folder);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(extension));
}

function validateCanonical(item, type, filename) {
  if (!item.canonical || !String(item.canonical).startsWith('/')) {
    fail(`[${type}] canonical inválido en ${filename}`);
  }
}

function validateImage(item, type, filename) {
  if (!item.featuredImage || !String(item.featuredImage).startsWith('/')) {
    fail(`[${type}] featuredImage inválida en ${filename}`);
  }
}

function validateDatePair(item, type, filename) {
  if (!item.publishedDate) {
    fail(`[${type}] publishedDate obligatorio en ${filename}`);
  }

  if (item.modifiedDate && item.modifiedDate < item.publishedDate) {
    fail(`[${type}] modifiedDate anterior a publishedDate en ${filename}`);
  }
}

function validateNoForbiddenReferences() {
  const forbidden = /(codrops|tympanus|statsbasket|modernizr\.custom\.70736|profile_icons\.gif)/i;
  const files = [];

  ['views', 'public', 'content'].forEach((folder) => {
    const stack = [path.join(ROOT, folder)];
    while (stack.length) {
      const current = stack.pop();
      if (!fs.existsSync(current)) continue;

      fs.readdirSync(current, { withFileTypes: true }).forEach((entry) => {
        const full = path.join(current, entry.name);
        if (entry.isDirectory()) {
          stack.push(full);
        } else if (/\.(ejs|js|css|json|md|html)$/i.test(entry.name)) {
          files.push(full);
        }
      });
    }
  });

  files.forEach((file) => {
    const text = fs.readFileSync(file, 'utf8');
    if (forbidden.test(text)) {
      fail(`Referencia heredada detectada en ${path.relative(ROOT, file)}`);
    }
  });
}

function stripFencedCodeBlocks(text) {
  return String(text || '').replace(/```[\s\S]*?```/g, '');
}

function countMatches(text, pattern) {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

function validateArticleHtmlBalance(filename, markdownBody) {
  const body = stripFencedCodeBlocks(markdownBody);
  const preOpen = countMatches(body, /<pre\b[^>]*>/gi);
  const preClose = countMatches(body, /<\/pre>/gi);
  const codeOpen = countMatches(body, /<code\b[^>]*>/gi);
  const codeClose = countMatches(body, /<\/code>/gi);

  if (preOpen !== preClose) {
    fail(`[article] <pre> desbalanceado en ${filename} (open=${preOpen}, close=${preClose})`);
  }

  if (codeOpen !== codeClose) {
    fail(`[article] <code> desbalanceado en ${filename} (open=${codeOpen}, close=${codeClose})`);
  }
}

function runValidation() {
  const seenSlugs = new Set();

  readDir('content/articles', '.md').forEach((file) => {
    const slug = file.replace(/\.md$/, '');
    if (seenSlugs.has(slug)) fail(`Slug duplicado: ${slug}`);
    seenSlugs.add(slug);

    const text = fs.readFileSync(path.join(ROOT, 'content/articles', file), 'utf8');
    const front = text.match(/^---\n([\s\S]*?)\n---/);
    if (!front) fail(`[article] frontmatter ausente en ${file}`);
    const body = text.slice(front[0].length);

    const meta = Object.fromEntries(front[1].split(/\r?\n/).filter(Boolean).map((line) => {
      const [k, ...v] = line.split(':');
      return [k.trim(), v.join(':').trim().replace(/^"|"$/g, '')];
    }));

    ['title', 'description', 'author', 'canonical', 'category', 'publishedDate', 'featuredImage', 'themeColor'].forEach((key) => {
      if (!meta[key]) fail(`[article] ${key} obligatorio en ${file}`);
    });

    validateCanonical(meta, 'article', file);
    validateImage(meta, 'article', file);
    validateDatePair(meta, 'article', file);
    validateArticleHtmlBalance(file, body);
  });

  ['tools', 'lab'].forEach((type) => {
    readDir(`content/${type}`, '.json').forEach((file) => {
      const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', type, file), 'utf8'));
      const slug = file.replace(/\.json$/, '');

      if (seenSlugs.has(slug)) fail(`Slug duplicado: ${slug}`);
      seenSlugs.add(slug);

      ['title', 'description', 'author', 'canonical', 'publishedDate', 'featuredImage', 'themeColor'].forEach((key) => {
        if (!data[key]) fail(`[${type}] ${key} obligatorio en ${file}`);
      });

      validateCanonical(data, type, file);
      validateImage(data, type, file);
      validateDatePair(data, type, file);
    });
  });

  validateNoForbiddenReferences();
}

module.exports = { runValidation };
