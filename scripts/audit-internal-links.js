#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');
const OUTPUT = path.join(ROOT, 'content', 'generated', 'internal-link-audit.json');

function normalizeTag(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function normalizePath(value) {
  if (!value) return null;
  let raw = String(value).trim();

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      if (!/(^|\.)ayudaparamiweb\.com$/i.test(url.hostname)) return null;
      raw = url.pathname;
    } catch (_) {
      return null;
    }
  }

  if (!raw.startsWith('/')) return null;
  raw = raw.split('#')[0].split('?')[0];
  if (!raw) return '/';
  return raw === '/' ? '/' : '/' + raw.replace(/^\/+|\/+$/g, '');
}

function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const raw = match ? match[1] : '';
  const field = (name) => {
    const m = raw.match(new RegExp('^' + name + ':\\s*["\\\']?([^\\n"\\\']+)["\\\']?\\s*$', 'm'));
    return m ? m[1].trim() : '';
  };
  const tagsMatch = raw.match(/^tags:\s*\[([^\]]*)\]/m);
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map((tag) => tag.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    : [];

  return {
    title: field('title'),
    canonical: field('canonical'),
    category: field('category'),
    tags,
    body: content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  };
}

function extractLinks(body) {
  const found = [];
  for (const match of body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) found.push(match[1]);
  for (const match of body.matchAll(/href=["']([^"']+)["']/g)) found.push(match[1]);
  return found;
}

const files = fs.readdirSync(ARTICLES_DIR)
  .filter((name) => name.endsWith('.md'))
  .sort();

const articles = files.map((filename) => {
  const source = fs.readFileSync(path.join(ARTICLES_DIR, filename), 'utf8');
  const meta = parseFrontMatter(source);
  const slug = filename.replace(/\.md$/, '');
  return {
    filename,
    slug,
    title: meta.title || slug,
    canonical: normalizePath(meta.canonical) || '/' + slug,
    category: meta.category || '',
    tags: meta.tags,
    links: extractLinks(meta.body)
  };
});

const routes = require('../routes');
const articlePaths = new Set(articles.map((article) => article.canonical));
const validPaths = new Set([
  ...articlePaths,
  ...routes.map((route) => normalizePath(route.path)).filter(Boolean)
]);

const incoming = new Map(articles.map((article) => [article.canonical, 0]));
const outgoing = new Map();
const broken = [];

for (const article of articles) {
  const unique = new Set();

  for (const rawLink of article.links) {
    const target = normalizePath(rawLink);
    if (!target) continue;
    unique.add(target);

    if (articlePaths.has(target) && target !== article.canonical) {
      incoming.set(target, (incoming.get(target) || 0) + 1);
    }

    if (
      !validPaths.has(target) &&
      !target.startsWith('/img/') &&
      !target.startsWith('/css/') &&
      !target.startsWith('/js/') &&
      !target.startsWith('/api/')
    ) {
      broken.push({ from: article.canonical, to: target });
    }
  }

  outgoing.set(article.canonical, unique.size);
}

const tagMap = new Map();
for (const article of articles) {
  for (const tag of article.tags) {
    const key = normalizeTag(tag);
    if (!tagMap.has(key)) tagMap.set(key, { count: 0, forms: new Set(), articles: [] });
    const entry = tagMap.get(key);
    entry.count += 1;
    entry.forms.add(tag);
    entry.articles.push(article.canonical);
  }
}

const tags = Array.from(tagMap.entries())
  .map(([normalized, entry]) => ({
    normalized,
    count: entry.count,
    forms: Array.from(entry.forms).sort(),
    articles: entry.articles.sort()
  }))
  .sort((a, b) => b.count - a.count || a.normalized.localeCompare(b.normalized, 'es'));

const pages = articles.map((article) => ({
  path: article.canonical,
  title: article.title,
  category: article.category,
  tags: article.tags,
  incomingContextualLinks: incoming.get(article.canonical) || 0,
  outgoingInternalLinks: outgoing.get(article.canonical) || 0
})).sort((a, b) =>
  a.incomingContextualLinks - b.incomingContextualLinks ||
  a.path.localeCompare(b.path, 'es')
);

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    articles: articles.length,
    normalizedTags: tags.length,
    singletonTags: tags.filter((tag) => tag.count === 1).length,
    variantTags: tags.filter((tag) => tag.forms.length > 1).length,
    pagesWithNoContextualIncomingLinks: pages.filter((page) => page.incomingContextualLinks === 0).length,
    pagesWithOneOrFewerContextualIncomingLinks: pages.filter((page) => page.incomingContextualLinks <= 1).length,
    brokenInternalLinks: broken.length,
    totalContextualArticleLinks: Array.from(incoming.values()).reduce((sum, value) => sum + value, 0)
  },
  tagVariants: tags.filter((tag) => tag.forms.length > 1),
  singletonTags: tags.filter((tag) => tag.count === 1),
  tags,
  pages,
  brokenInternalLinks: broken
};

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(report, null, 2) + '\n', 'utf8');

console.log(JSON.stringify(report.summary, null, 2));
console.log('Informe:', path.relative(ROOT, OUTPUT));
