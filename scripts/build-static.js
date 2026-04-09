const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const routes = require('../routes');

const projectRoot = path.resolve(__dirname, '..');
const viewsDir = path.join(projectRoot, 'views');
const publicDir = path.join(projectRoot, 'public');
const outputDir = path.join(projectRoot, 'dist');

function cleanDist() {
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });
}

function copyPublic() {
  fs.cpSync(publicDir, outputDir, { recursive: true });
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

function renderRoute(route) {
  const viewFile = toViewFile(route.view);
  const outputFile = toOutputFile(route.path);

  const html = ejs.render(fs.readFileSync(viewFile, 'utf8'), {}, {
    filename: viewFile,
    root: viewsDir
  });

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, html, 'utf8');
}

function build() {
  cleanDist();
  copyPublic();
  routes.forEach(renderRoute);
  console.log(`Static site generated at ${outputDir}`);
}

build();
