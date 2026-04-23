const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TOP_ARTICLES_PATH = path.join(PROJECT_ROOT, 'content', 'generated', 'top-articles.json');
const FRIEND_LINKS_PATH = path.join(PROJECT_ROOT, 'content', 'friend-links.json');

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
      label: String(item.label || '').trim(),
      href: String(item.href || '').trim(),
      description: String(item.description || '').trim()
    }))
    .filter((item) => item.label && item.href);
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
  TOP_ARTICLES_PATH,
  FRIEND_LINKS_PATH
};
