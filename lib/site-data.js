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

/* ============================
   Lógica automática de ratings
   ============================ */

function hashString(value) {
  var hash = 2166136261;
  for (var i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

function seededUnit(seed, salt) {
  var mixed = hashString(seed + ':' + salt);
  return (mixed % 10000) / 10000;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizePath(pathValue) {
  const value = String(pathValue || '/').trim() || '/';
  return value === '/' ? '/' : value.replace(/\/+$/, '');
}

function getVoteCount(seed, publishedDate) {
  const now = new Date();
  const daysSincePublication = Math.max(
    0,
    Math.floor(
      (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - publishedDate.getTime()) / 86400000
    )
  );

  const startDelay = 1 + Math.floor(seededUnit(seed, 'start-delay') * 2);
  const activeDays = Math.max(0, daysSincePublication - startDelay);

  const phase1Days = Math.min(activeDays, 21);
  const phase2Days = Math.min(Math.max(activeDays - 21, 0), 69);
  const phase3Days = Math.max(activeDays - 90, 0);

  const phase1Rate = 0.9 + (seededUnit(seed, 'phase1-rate') * 1.1);
  const phase2Rate = 0.04 + (seededUnit(seed, 'phase2-rate') * 0.2);
  const isolatedInterval = 50 + Math.floor(seededUnit(seed, 'phase3-interval') * 70);

  let votes = Math.floor(phase1Days * phase1Rate) + Math.floor(phase2Days * phase2Rate);
  votes += Math.floor(phase3Days / isolatedInterval);

  return Math.max(0, votes);
}

function getSimulatedVote(seed, index) {
  // Calidad base del artículo: entre 3.8 y 5.0
  const articleTarget = 3.8 + seededUnit(seed, 'article-target') * 1.2;

  // Los primeros votos son más volátiles; luego se estabiliza
  const volatility = index < 3 ? 0.9 : index < 10 ? 0.65 : 0.45;
  const noise = (seededUnit(seed, 'vote:' + index) - 0.5) * volatility * 2;

  const raw = clamp(articleTarget + noise, 3, 5);

  // Votos enteros por estrellas
  return Math.round(raw);
}

function normalizeAverageRange(votesArray) {
  if (!votesArray.length) {
    return 0;
  }

  let total = votesArray.reduce((sum, vote) => sum + vote, 0);
  let average = total / votesArray.length;

  // Si cae por debajo de 3.8, corregimos suavemente algunos votos bajos
  if (average < 3.8) {
    for (let i = 0; i < votesArray.length && average < 3.8; i += 1) {
      if (votesArray[i] < 5) {
        const increment = (5 - votesArray[i] >= 2) ? 2 : 1;
        votesArray[i] = Math.min(5, votesArray[i] + increment);
        total += increment;
        average = total / votesArray.length;
      }
    }
  }

  average = clamp(average, 3.8, 5.0);

  return Number(average.toFixed(1));
}

function getAutomaticRating(pathValue, publishedDateString) {
  if (!publishedDateString || !/^\d{4}-\d{2}-\d{2}/.test(String(publishedDateString))) {
    return { votes: 0, average: 0 };
  }

  const normalizedPath = normalizePath(pathValue);
  const publishedDate = new Date(String(publishedDateString).slice(0, 10) + 'T00:00:00Z');

  if (Number.isNaN(publishedDate.getTime())) {
    return { votes: 0, average: 0 };
  }

  const seed = normalizedPath + '|' + publishedDate.toISOString().slice(0, 10);
  const votes = getVoteCount(seed, publishedDate);

  if (votes === 0) {
    return {
      votes: 0,
      average: 0
    };
  }

  const votesArray = [];
  for (let i = 0; i < votes; i += 1) {
    votesArray.push(getSimulatedVote(seed, i));
  }

  return {
    votes,
    average: normalizeAverageRange(votesArray)
  };
}

/* ============================
   Datos públicos del sitio
   ============================ */

function loadTopRatedArticles(limit) {
  var max = Math.max(1, Number(limit || 5));

  return contentCatalog.getAllArticles()
    .map((item) => {
      const pathValue = String(item.path || '').trim();
      const dateValue = String(item.publishedDate || item.date || '').trim();
      const projection = getAutomaticRating(pathValue, dateValue);

      return {
        slug: String(item.slug || '').trim(),
        path: pathValue,
        title: String(item.title || '').trim(),
        ratingValue: Number(projection.average || 0),
        ratingCount: Number(projection.votes || 0)
      };
    })
    .filter((item) => item.slug && item.path && item.title && item.ratingCount > 0)
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
  getAutomaticRating,
  TOP_ARTICLES_PATH,
  FRIEND_LINKS_PATH
};
