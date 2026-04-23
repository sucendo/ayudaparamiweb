const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const routeCatalog = require('../routes');
const contentCatalog = require('../content');
const contentLoader = require('../lib/content/loader');
const routes = routeCatalog.publishedRoutes || routeCatalog;

const projectRoot = path.resolve(__dirname, '..');
const viewsDir = path.join(projectRoot, 'views');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(projectRoot, 'dist');

function normalizeBasePath(value) {
  if (!value || value === '/') {
    return '';
  }

  let normalized = value.trim();

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  return normalized.replace(/\/+$/, '');
}

function inferBasePath() {
  if (process.env.SITE_BASE_PATH) {
    return normalizeBasePath(process.env.SITE_BASE_PATH);
  }

  if (process.env.SITE_URL) {
    try {
      const siteHost = new URL(process.env.SITE_URL).hostname.toLowerCase();
      if (!siteHost.endsWith('github.io')) {
        return '';
      }
    } catch (error) {
      // Ignore malformed SITE_URL and continue with repository-based inference.
    }
  }

  const repository = process.env.GITHUB_REPOSITORY || '';
  const [owner = 'sucendo', repoName = 'ayudaparamiweb'] = repository.split('/');

  if (repoName.toLowerCase() === `${owner.toLowerCase()}.github.io`) {
    return '';
  }

  return `/${repoName}`;
}

const basePath = normalizeBasePath(inferBasePath());

function inferSiteUrl() {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, '');
  }

  const repository = process.env.GITHUB_REPOSITORY || 'sucendo/ayudaparamiweb';
  const [owner = 'sucendo'] = repository.split('/');

  return `https://${owner}.github.io${basePath}`;
}

const siteUrl = inferSiteUrl();
const baseHref = `${basePath || ''}/`;

function cleanDist() {
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });
}

function copyPublic() {
  fs.cpSync(publicDir, outputDir, { recursive: true });
}

function writeContentIndex(allContent) {
  const dataDir = path.join(outputDir, 'data');
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(
    path.join(dataDir, 'content-index.json'),
    JSON.stringify(allContent, null, 2),
    'utf8'
  );
}

function writeNoJekyll() {
  fs.writeFileSync(path.join(outputDir, '.nojekyll'), '', 'utf8');
}

function toViewFile(view) {
  return path.join(viewsDir, `${view}.ejs`);
}

function toOutputFile(routePath) {
  if (routePath === '/') {
    return path.join(outputDir, 'index.html');
  }
  if (routePath === '/404') {
    return path.join(outputDir, '404.html');
  }

  const cleaned = routePath.replace(/^\/+/, '');
  return path.join(outputDir, cleaned, 'index.html');
}

function addBaseHref(html) {
  if (/<base\s+href=/i.test(html)) {
    return html;
  }

  return html.replace(/<head([^>]*)>/i, `<head$1>\n\t\t<base href="${baseHref}">`);
}

function rewriteRootRelativeUrls(html) {
  if (!basePath) {
    return html;
  }

  return html.replace(
    /((?:href|src|action|content)=["'])\/(?!\/)/gi,
    `$1${basePath}/`
  );
}

function rewriteLegacyDomain(html) {
  return html
    .replace(/https?:\/\/www\.ayudaparamiweb\.com/gi, siteUrl)
    .replace(/https?:\/\/ayudaparamiweb\.com/gi, siteUrl);
}


function resolvePageContext(route, allContent) {
  if (route.contentType && route.contentSlug) {
    return {
      metadata: contentLoader.loadByType(route.contentType, route.contentSlug),
      contentItems: [],
      categories: contentCatalog.CATEGORY_DEFINITIONS,
      query: '',
      results: []
    };
  }

  var categories = contentCatalog.CATEGORY_DEFINITIONS;
  var articles = contentCatalog.filterByCategory(allContent, 'guias').concat(contentCatalog.filterByCategory(allContent, 'analisis'));
  var sectionByPath = {
    '/': allContent,
    '/guias': articles,
    '/tutoriales': contentCatalog.filterByCategory(allContent, 'tutoriales'),
    '/herramientas': contentCatalog.filterByCategory(allContent, 'herramientas'),
    '/laboratorio': contentCatalog.filterByCategory(allContent, 'laboratorio'),
    '/articulos': articles,
    '/experimentos': contentCatalog.filterByCategory(allContent, 'laboratorio'),
    '/tags': allContent,
    '/sucender': allContent
  };

  return {
    contentItems: sectionByPath[route.path] || [],
    categories: categories,
    query: '',
    results: []
  };
}

function renderRoute(route, allContent) {
  const viewFile = toViewFile(route.view);
  const outputFile = toOutputFile(route.path);

  const html = ejs.render(fs.readFileSync(viewFile, 'utf8'), resolvePageContext(route, allContent), {
    filename: viewFile,
    root: viewsDir
  });

  const processedHtml = addBaseHref(
    rewriteRootRelativeUrls(
      rewriteLegacyDomain(html)
    )
  );

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, processedHtml, 'utf8');
}

async function build() {
  cleanDist();
  copyPublic();
  const allContent = await contentCatalog.buildCatalog();
  writeContentIndex(allContent);
  routes.forEach((route) => renderRoute(route, allContent));
  writeNoJekyll();

  console.log(`GitHub Pages site generated at ${outputDir}`);
  console.log(`Base path: ${baseHref}`);
  console.log(`Site URL: ${siteUrl}`);
}

build();
