#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const contentCatalog = require('../content');

const OUTPUT_PATH = path.join(__dirname, '..', 'content', 'generated', 'top-articles.json');
const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const LIMIT = Math.max(1, Number(process.env.TOP_ARTICLES_LIMIT || 10));

function normalizePath(rawPath) {
  if (!rawPath) return '/';
  const withoutHost = String(rawPath)
    .replace(/^https?:\/\/[^/]+/i, '')
    .split('?')[0]
    .split('#')[0]
    .trim();

  if (!withoutHost || withoutHost === '/') return '/';
  return `/${withoutHost.replace(/^\/+|\/+$/g, '')}`;
}

async function createAnalyticsClient() {
  try {
    const analyticsModule = require('@google-analytics/data');
    return new analyticsModule.BetaAnalyticsDataClient();
  } catch (error) {
    throw new Error('Falta dependencia @google-analytics/data. Ejecuta: npm install');
  }
}

async function fetchTopPaths(client) {
  const [report] = await client.runReport({
    property: `properties/${PROPERTY_ID}`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit: 500
  });

  return (report.rows || []).map((row) => ({
    pagePath: normalizePath(row.dimensionValues && row.dimensionValues[0] && row.dimensionValues[0].value),
    views: Number(row.metricValues && row.metricValues[0] && row.metricValues[0].value) || 0
  }));
}

async function buildTopArticlesJson() {
  if (!PROPERTY_ID) {
    throw new Error('Falta GA4_PROPERTY_ID en variables de entorno.');
  }

  const allArticles = contentCatalog.getAllArticles();
  const articleByPath = new Map(
    allArticles
      .filter((item) => item.type === 'article' && item.path)
      .map((item) => [normalizePath(item.path), item])
  );

  const client = await createAnalyticsClient();
  const rows = await fetchTopPaths(client);

  const aggregatedBySlug = new Map();

  rows.forEach((row) => {
    const article = articleByPath.get(row.pagePath);
    if (!article || row.views <= 0) return;

    const current = aggregatedBySlug.get(article.slug) || {
      slug: article.slug,
      path: article.path,
      title: article.title,
      views: 0
    };

    current.views += row.views;
    aggregatedBySlug.set(article.slug, current);
  });

  return Array.from(aggregatedBySlug.values())
    .sort((a, b) => b.views - a.views)
    .slice(0, LIMIT);
}

async function main() {
  const topArticles = await buildTopArticlesJson();

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(topArticles, null, 2)}\n`, 'utf8');

  console.log(`Top artículos generados: ${topArticles.length}`);
  console.log(`Salida: ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(`[generate-top-articles] ${error.message}`);
  process.exitCode = 1;
});
