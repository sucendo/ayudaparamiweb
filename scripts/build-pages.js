const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const routes = require('../routes');

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

function renderRoute(route) {
  const viewFile = toViewFile(route.view);
  const outputFile = toOutputFile(route.path);

  const html = ejs.render(fs.readFileSync(viewFile, 'utf8'), {}, {
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

function build() {
  cleanDist();
  copyPublic();
  routes.forEach(renderRoute);
  writeNoJekyll();

  console.log(`GitHub Pages site generated at ${outputDir}`);
  console.log(`Base path: ${baseHref}`);
  console.log(`Site URL: ${siteUrl}`);
}

build();
