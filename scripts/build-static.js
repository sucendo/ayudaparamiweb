const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const routes = require('../routes');

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

function renderRoute(route) {
  const viewFile = toViewFile(route.view);
  const outputFile = toOutputFile(route.path);

  let html = ejs.render(fs.readFileSync(viewFile, 'utf8'), {}, {
    filename: viewFile,
    root: viewsDir
  });

  html = rewriteDomainLinks(html);
  html = rewriteRootRelativeUrls(html);
  html = injectBaseTag(html);

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, html, 'utf8');
}

function build() {
  cleanDist();
  copyPublic();
  createNoJekyllFlag();
  routes.forEach(renderRoute);
  console.log(`Static site generated at ${outputDir} with BASE_PATH=${basePath}`);
}

build();
