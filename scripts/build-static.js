const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const routeCatalog = require('../routes');
const contentCatalog = require('../content');
const routes = routeCatalog.publishedRoutes || routeCatalog;

const projectRoot = path.resolve(__dirname, '..');
const viewsDir = path.join(projectRoot, 'views');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(projectRoot, 'dist');

function normalizeBasePath(rawBasePath) {
  if (!rawBasePath || rawBasePath === '/') return '/';
  return `/${rawBasePath.replace(/^\/+|\/+$/g, '')}/`;
}

const basePath = normalizeBasePath(process.env.BASE_PATH || '/');

function cleanDist() {
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });
}

function copyPublic() {
  fs.cpSync(publicDir, outputDir, { recursive: true });
}

function walkFiles(dir, visitor) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkFiles(fullPath, visitor);
      return;
    }

    visitor(fullPath);
  });
}

function createNoJekyllFlag() {
  fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');
}

function toViewFile(view) {
  return path.join(viewsDir, `${view}.ejs`);
}

function toOutputFile(routePath) {
  if (routePath === '/') {
    return path.join(outputDir, 'index.html');
  }

  const cleaned = routePath.replace(/^\//, '');
  return path.join(outputDir, cleaned, 'index.html');
}

function rewriteDomainLinks(html) {
  return html
    .replace(/https?:\/\/www\.ayudaparamiweb\.com\//g, basePath)
    .replace(/https?:\/\/www\.ayudaparamiweb\.com(?=["'])/g, basePath.slice(0, -1));
}

function prependBasePath(pathFromRoot) {
  const normalizedBaseName = basePath.replace(/^\/|\/$/g, '');

  if (!pathFromRoot) {
    return basePath;
  }

  if (
    normalizedBaseName &&
    (pathFromRoot === normalizedBaseName || pathFromRoot.startsWith(`${normalizedBaseName}/`))
  ) {
    return `/${pathFromRoot}`;
  }

  return `${basePath}${pathFromRoot}`;
}

function rewriteRootRelativeUrls(html) {
  if (basePath === '/') {
    return html;
  }

  return html
    .replace(
      /(\b(?:href|src|action|poster)\s*=\s*["'])\/(?!\/)([^"']*)(["'])/gi,
      (_, prefix, pathFromRoot, suffix) => `${prefix}${prependBasePath(pathFromRoot)}${suffix}`
    )
    .replace(
      /(url\(\s*["'])\/(?!\/)([^"')]*)(["']\s*\))/gi,
      (_, prefix, pathFromRoot, suffix) => `${prefix}${prependBasePath(pathFromRoot)}${suffix}`
    )
    .replace(
      /(url\(\s*)\/(?!\/)([^)"']*)(\s*\))/gi,
      (_, prefix, pathFromRoot, suffix) => `${prefix}${prependBasePath(pathFromRoot)}${suffix}`
    );
}

function injectBaseTag(html) {
  if (/<base\s+href=/i.test(html)) {
    return html;
  }

  return html.replace(/<head(.*?)>/i, `<head$1>\n\t\t<base href="${basePath}">`);
}

function rewritePublicAssetUrls() {
  if (basePath === '/') {
    return;
  }

  const rewriteLikeHtml = (content) =>
    content
      .replace(
        /(\b(?:href|src|action|poster)\s*=\s*["'])\/(?!\/)([^"']*)(["'])/gi,
        (_, prefix, pathFromRoot, suffix) => `${prefix}${prependBasePath(pathFromRoot)}${suffix}`
      )
      .replace(
        /(url\(\s*["'])\/(?!\/)([^"')]*)(["']\s*\))/gi,
        (_, prefix, pathFromRoot, suffix) => `${prefix}${prependBasePath(pathFromRoot)}${suffix}`
      )
      .replace(
        /(url\(\s*)\/(?!\/)([^)"']*)(\s*\))/gi,
        (_, prefix, pathFromRoot, suffix) => `${prefix}${prependBasePath(pathFromRoot)}${suffix}`
      )
      .replace(
        /("(?:(?:start_url)|(?:src)|(?:scope))"\s*:\s*")\/(?!\/)([^"]*)(")/gi,
        (_, prefix, pathFromRoot, suffix) => `${prefix}${prependBasePath(pathFromRoot)}${suffix}`
      );

  walkFiles(outputDir, (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath).toLowerCase();
    const shouldRewrite =
      ext === '.css' ||
      ext === '.xml' ||
      fileName.endsWith('.webmanifest');

    if (!shouldRewrite) {
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const rewritten = rewriteLikeHtml(content);

    if (rewritten !== content) {
      fs.writeFileSync(filePath, rewritten, 'utf8');
    }
  });
}


function resolvePageContext(route, allContent) {
  const sectionByPath = {
    '/': allContent,
    '/guias': contentCatalog.filterByCategory(allContent, 'guias'),
    '/tutoriales': contentCatalog.filterByCategory(allContent, 'tutoriales'),
    '/herramientas': contentCatalog.filterByCategory(allContent, 'herramientas'),
    '/laboratorio': contentCatalog.filterByCategory(allContent, 'laboratorio'),
    '/analisis': contentCatalog.filterByCategory(allContent, 'analisis'),
    '/articulos': contentCatalog.filterByCategory(allContent, 'guias'),
    '/experimentos': contentCatalog.filterByCategory(allContent, 'laboratorio')
  };

  return {
    contentItems: sectionByPath[route.path] || [],
    categories: contentCatalog.CATEGORY_DEFINITIONS
  };
}

function renderRoute(route, allContent) {
  const viewFile = toViewFile(route.view);
  const outputFile = toOutputFile(route.path);

  let html = ejs.render(fs.readFileSync(viewFile, 'utf8'), resolvePageContext(route, allContent), {
    filename: viewFile,
    root: viewsDir
  });

  html = rewriteDomainLinks(html);
  html = rewriteRootRelativeUrls(html);
  html = injectBaseTag(html);

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, html, 'utf8');
}

async function build() {
  cleanDist();
  copyPublic();
  rewritePublicAssetUrls();
  createNoJekyllFlag();
  const allContent = await contentCatalog.buildCatalog();
  routes.forEach((route) => renderRoute(route, allContent));
  console.log(`Static site generated at ${outputDir} with BASE_PATH=${basePath}`);
}

build();
