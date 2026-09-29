function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function scoreRelated(current, candidate) {
  const currentTags = (current.tags || []).map(normalize).filter(Boolean);
  const candidateTags = (candidate.tags || []).map(normalize).filter(Boolean);
  const commonTags = candidateTags.filter((tag) => currentTags.includes(tag)).length;
  const sameCategory = current.category && candidate.category === current.category ? 1 : 0;
  return (commonTags * 3) + sameCategory;
}

function buildArticleContext(metadata, allContent, limit) {
  if (!metadata || metadata.type !== 'article') {
    return {
      relatedArticles: [],
      previousArticle: null,
      nextArticle: null
    };
  }

  const maxRelated = Math.max(1, Number(limit || 4));
  const currentPath = metadata.canonical || `/${metadata.slug}`;
  const articles = (allContent || [])
    .filter((item) => item && item.type === 'article' && item.path && item.title)
    .slice()
    .sort((a, b) => new Date(b.publishedDate || b.date || 0) - new Date(a.publishedDate || a.date || 0));

  const currentIndex = articles.findIndex((item) => item.path === currentPath || item.slug === metadata.slug);
  const currentCatalogItem = currentIndex >= 0 ? articles[currentIndex] : {
    path: currentPath,
    slug: metadata.slug,
    category: metadata.category,
    tags: metadata.tags || []
  };

  const relatedArticles = articles
    .filter((item) => item.path !== currentPath)
    .map((item) => ({ item, score: scoreRelated(currentCatalogItem, item) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.item.modifiedDate || b.item.date || 0) - new Date(a.item.modifiedDate || a.item.date || 0);
    })
    .slice(0, maxRelated)
    .map((entry) => entry.item);

  return {
    relatedArticles,
    previousArticle: currentIndex >= 0 && currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
    nextArticle: currentIndex > 0 ? articles[currentIndex - 1] : null
  };
}

module.exports = { buildArticleContext };
