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

function readJson(relativeFile) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relativeFile), 'utf8'));
}

function loadArticle(slug) {
  const raw = fs.readFileSync(path.join(ROOT, 'content', 'articles', `${slug}.md`), 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  return {
    type: 'article',
    slug,
    ...meta,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    breadcrumb: ['Inicio', 'Artículos', meta.title],
    bodyHtml: markdownToHtml(body)
  };
}

function loadTool(slug) {
  const tool = readJson(path.join('content', 'tools', `${slug}.json`));
  return {
    ...tool,
    type: 'tool',
    slug,
    breadcrumb: ['Inicio', 'Herramientas', tool.title]
  };
}

function loadLab(slug) {
  const lab = readJson(path.join('content', 'lab', `${slug}.json`));
  return {
    ...lab,
    type: 'laboratory',
    slug,
    breadcrumb: ['Inicio', 'Laboratorio', lab.title]
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
