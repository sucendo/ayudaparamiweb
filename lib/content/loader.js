const fs = require('fs');
const path = require('path');
const { markdownToHtml } = require('./markdown');

const ROOT = path.join(__dirname, '..', '..');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Markdown sin frontmatter válido');
  }

  const frontmatter = {};
  match[1].split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const [key, ...rest] = line.split(':');
    const value = rest.join(':').trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key.trim()] = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^"|"$/g, ''))
        .filter(Boolean);
      return;
    }

    frontmatter[key.trim()] = value.replace(/^"|"$/g, '');
  });

  return {
    meta: frontmatter,
    body: match[2]
  };
}


function normalizeImagePath(imagePath) {
  return String(imagePath || '')
    .trim()
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\.\./, '');
}

function removeDuplicatedFeaturedImage(markdownBody, featuredImage) {
  const normalizedFeatured = normalizeImagePath(featuredImage);
  if (!normalizedFeatured) return markdownBody;

  let removed = false;
  return String(markdownBody || '').replace(/!\[[^\]]*\]\(([^)]+)\)/g, (match, imageUrl) => {
    if (removed) return match;
    if (normalizeImagePath(imageUrl) === normalizedFeatured) {
      removed = true;
      return '';
    }
    return match;
  });
}

function readJson(relativeFile) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativeFile), 'utf8'));
}

function stripHtml(value) {
  return String(value || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugifyHeading(value) {
  return stripHtml(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function enhanceArticleHtml(bodyHtml) {
  const usedIds = Object.create(null);
  const headings = [];

  const html = String(bodyHtml || '').replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    const existingId = String(attrs || '').match(/\sid=["']([^"']+)["']/i);
    let id = existingId ? existingId[1] : slugifyHeading(inner) || 'seccion';

    if (!existingId) {
      const baseId = id;
      usedIds[baseId] = (usedIds[baseId] || 0) + 1;
      if (usedIds[baseId] > 1) id = `${baseId}-${usedIds[baseId]}`;
    }

    headings.push({
      level: Number(level),
      id,
      text: stripHtml(inner)
    });

    if (existingId) return match;
    return `<h${level}${attrs || ''} id="${id}">${inner}</h${level}>`;
  });

  const wordCount = stripHtml(html).split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 220));
  const h2Count = headings.filter((heading) => heading.level === 2).length;

  return {
    html,
    headings,
    toc: h2Count >= 4 ? headings : [],
    wordCount,
    readingTime
  };
}

function loadArticle(slug) {
  const raw = fs.readFileSync(path.join(ROOT, 'content', 'articles', `${slug}.md`), 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  const enhanced = enhanceArticleHtml(markdownToHtml(removeDuplicatedFeaturedImage(body, meta.featuredImage)));
  return {
    type: 'article',
    slug,
    ...meta,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    breadcrumb: [
      { name: 'Inicio', url: '/' },
      { name: 'Artículos', url: '/articulos' },
      { name: meta.title, url: meta.canonical || `/${slug}` }
    ],
    bodyHtml: enhanced.html,
    toc: enhanced.toc,
    readingTime: enhanced.readingTime,
    wordCount: enhanced.wordCount
  };
}

function loadTool(slug) {
  const tool = readJson(path.join('content', 'tools', `${slug}.json`));
  return {
    ...tool,
    type: 'tool',
    slug,
    breadcrumb: [
      { name: 'Inicio', url: '/' },
      { name: 'Herramientas', url: '/herramientas' },
      { name: tool.title, url: tool.canonical || `/${slug}` }
    ]
  };
}

function loadLab(slug) {
  const lab = readJson(path.join('content', 'lab', `${slug}.json`));
  return {
    ...lab,
    type: 'laboratory',
    slug,
    breadcrumb: [
      { name: 'Inicio', url: '/' },
      { name: 'Laboratorio', url: '/laboratorio' },
      { name: lab.title, url: lab.canonical || `/${slug}` }
    ]
  };
}

function loadByType(type, slug) {
  if (type === 'article') return loadArticle(slug);
  if (type === 'tool') return loadTool(slug);
  if (type === 'laboratory') return loadLab(slug);
  throw new Error(`Tipo de contenido no soportado: ${type}`);
}

module.exports = {
  loadByType,
  loadArticle,
  loadTool,
  loadLab
};
