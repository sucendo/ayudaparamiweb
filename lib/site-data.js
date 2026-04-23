const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TOP_ARTICLES_PATH = path.join(PROJECT_ROOT, 'content', 'generated', 'top-articles.json');
const FRIEND_LINKS_PATH = path.join(PROJECT_ROOT, 'content', 'friend-links.json');
const contentCatalog = require('../content');

function readJsonArray(filePath) {
  try {
    if (!fs.existsSync(filePath)) return [];
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

function normalizeTopArticles(items) {
  return items
    .map((item) => ({
      slug: String(item.slug || '').trim(),
      path: String(item.path || '').trim(),
      title: String(item.title || '').trim(),
      views: Number(item.views || 0)
    }))
    .filter((item) => item.slug && item.path && item.title)
    .slice(0, 10);
}

function normalizeFriendLinks(items) {
  return items
    .map((item) => ({
      title: String(item.title || item.label || '').trim(),
      url: String(item.url || item.href || '').trim(),
      description: String(item.description || '').trim()
    }))
    .filter((item) => item.title && item.url);
}

function loadTopRatedArticles(limit) {
  var max = Math.max(1, Number(limit || 5));

  return contentCatalog.getAllArticles()
    .map((item) => ({
      slug: String(item.slug || '').trim(),
      path: String(item.path || '').trim(),
      title: String(item.title || '').trim(),
      ratingValue: Number(item.ratingValue || 0),
      ratingCount: Number(item.ratingCount || 0)
    }))
    .filter((item) => item.slug && item.path && item.title && item.ratingValue > 0 && item.ratingCount > 0)
    .sort((a, b) => {
      if (b.ratingValue !== a.ratingValue) return b.ratingValue - a.ratingValue;
      if (b.ratingCount !== a.ratingCount) return b.ratingCount - a.ratingCount;
      return a.title.localeCompare(b.title, 'es');
    })
    .slice(0, max);
}

function loadTopArticles() {
  return normalizeTopArticles(readJsonArray(TOP_ARTICLES_PATH));
}

function loadFriendLinks() {
  return normalizeFriendLinks(readJsonArray(FRIEND_LINKS_PATH));
}

module.exports = {
  loadTopArticles,
  loadFriendLinks,
  loadTopRatedArticles,
  TOP_ARTICLES_PATH,
  FRIEND_LINKS_PATH
};
