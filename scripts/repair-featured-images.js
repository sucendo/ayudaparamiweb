const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const articlesDir = path.join(root, 'content', 'articles');
const imagesDir = path.join(root, 'public', 'img', 'articulo');
const testsDir = path.join(root, 'tests');

fs.mkdirSync(imagesDir, { recursive: true });

function frontmatterValue(source, key) {
  const prefix = key + ':';
  const line = source.split(/\\r?\\n/).find((entry) => entry.trimStart().startsWith(prefix));
  if (!line) return '';
  return line.slice(line.indexOf(':') + 1).trim().replace(/^["']|["']$/g, '');
}

function escapeXml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function hash(value) {
  let h = 2166136261 >>> 0;
  for (const ch of value) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function motif(slug, accent) {
  const s = slug.toLowerCase();

  if (/seguridad|hack|error-500|servidor/.test(s)) {
    return '<path d="M600 170l110 42v86c0 86-46 145-110 176-64-31-110-90-110-176v-86z" fill="' + accent + '" opacity=".16"/>' +
      '<path d="M600 188l88 34v74c0 69-35 116-88 145-53-29-88-76-88-145v-74z" fill="none" stroke="' + accent + '" stroke-width="18"/>' +
      '<path d="M566 311l24 24 50-58" fill="none" stroke="' + accent + '" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  if (/ga4|analytics|logs|dashboard|medir|core-web-vitals|rendimiento|velocidad/.test(s)) {
    return '<rect x="480" y="215" width="240" height="190" rx="22" fill="#fff" stroke="' + accent + '" stroke-width="10"/>' +
      '<path d="M520 360l45-62 42 28 58-82" fill="none" stroke="' + accent + '" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="520" cy="360" r="10" fill="' + accent + '"/><circle cx="565" cy="298" r="10" fill="' + accent + '"/>' +
      '<circle cx="607" cy="326" r="10" fill="' + accent + '"/><circle cx="665" cy="244" r="10" fill="' + accent + '"/>';
  }

  if (/ecommerce|tiendas|fichas-de-producto|shopping|canon-digital|prestashop/.test(s)) {
    return '<path d="M500 250h56l25 118h128l28-82H573" fill="none" stroke="' + accent + '" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="600" cy="398" r="18" fill="' + accent + '"/><circle cx="696" cy="398" r="18" fill="' + accent + '"/>' +
      '<path d="M625 210h60" stroke="' + accent + '" stroke-width="16" stroke-linecap="round"/>';
  }

  if (/local|business-profile|my-business|negocios-locales/.test(s)) {
    return '<path d="M600 194c-52 0-94 41-94 92 0 72 94 151 94 151s94-79 94-151c0-51-42-92-94-92z" fill="none" stroke="' + accent + '" stroke-width="16"/>' +
      '<circle cx="600" cy="286" r="34" fill="none" stroke="' + accent + '" stroke-width="16"/>';
  }

  if (/ia|chatgpt|agentes|prompts|copilots|pipelines/.test(s)) {
    return '<circle cx="600" cy="300" r="58" fill="' + accent + '" opacity=".18"/><circle cx="600" cy="300" r="34" fill="' + accent + '"/>' +
      '<g stroke="' + accent + '" stroke-width="12" stroke-linecap="round"><path d="M600 210v-50"/><path d="M600 390v50"/>' +
      '<path d="M510 300h-50"/><path d="M690 300h50"/><path d="M536 236l-36-36"/><path d="M664 364l36 36"/>' +
      '<path d="M664 236l36-36"/><path d="M536 364l-36 36"/></g>';
  }

  if (/email/.test(s)) {
    return '<rect x="470" y="220" width="260" height="170" rx="20" fill="#fff" stroke="' + accent + '" stroke-width="14"/>' +
      '<path d="M482 240l118 94 118-94" fill="none" stroke="' + accent + '" stroke-width="14" stroke-linejoin="round"/>';
  }

  if (/git|github|programacion|javascript|node-js|express|python|vue|api|codigo|html-css/.test(s)) {
    return '<rect x="450" y="205" width="300" height="200" rx="24" fill="#fff" stroke="' + accent + '" stroke-width="12"/>' +
      '<path d="M548 265l-48 40 48 40M652 265l48 40-48 40M625 248l-48 114" fill="none" stroke="' + accent + '" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  if (/hosting|migracion|mantenimiento/.test(s)) {
    return '<g fill="#fff" stroke="' + accent + '" stroke-width="12"><rect x="480" y="195" width="240" height="64" rx="16"/>' +
      '<rect x="480" y="275" width="240" height="64" rx="16"/><rect x="480" y="355" width="240" height="64" rx="16"/></g>' +
      '<g fill="' + accent + '"><circle cx="520" cy="227" r="10"/><circle cx="520" cy="307" r="10"/><circle cx="520" cy="387" r="10"/></g>';
  }

  if (/colabor|teletrabajo|productividad|microsoft-365|videollamadas|comunicacion-interna/.test(s)) {
    return '<g fill="' + accent + '" opacity=".9"><circle cx="560" cy="260" r="34"/><circle cx="650" cy="270" r="28"/>' +
      '<path d="M500 390c8-63 39-94 66-94s58 31 66 94z"/><path d="M612 390c6-50 31-75 54-75s48 25 54 75z" opacity=".65"/></g>';
  }

  if (/seo|busqueda|backlink|contenido|eeat|rich-snippets|schema|palabras-clave|motores/.test(s)) {
    return '<circle cx="565" cy="285" r="78" fill="none" stroke="' + accent + '" stroke-width="18"/>' +
      '<path d="M620 342l82 82" stroke="' + accent + '" stroke-width="22" stroke-linecap="round"/>' +
      '<path d="M518 285h92M564 239v92" stroke="' + accent + '" stroke-width="12" stroke-linecap="round" opacity=".55"/>';
  }

  return '<rect x="485" y="220" width="230" height="165" rx="24" fill="#fff" stroke="' + accent + '" stroke-width="12"/>' +
    '<circle cx="540" cy="270" r="22" fill="' + accent + '" opacity=".9"/>' +
    '<path d="M585 270h82M520 325h160" stroke="' + accent + '" stroke-width="12" stroke-linecap="round" opacity=".72"/>';
}

function makeSvg(slug, title, accent) {
  const h = hash(slug);
  const x1 = 60 + (h % 120);
  const y1 = 70 + ((h >>> 8) % 90);
  const x2 = 920 + ((h >>> 16) % 120);
  const y2 = 420 + ((h >>> 24) % 90);

  return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="t">' +
    '<title id="t">' + escapeXml(title) + '</title>' +
    '<rect width="1200" height="630" fill="#f7f9fb"/>' +
    '<circle cx="' + x1 + '" cy="' + y1 + '" r="150" fill="' + accent + '" opacity=".07"/>' +
    '<circle cx="' + x2 + '" cy="' + y2 + '" r="190" fill="' + accent + '" opacity=".055"/>' +
    '<path d="M60 520C260 460 340 570 530 505S850 420 1140 485" fill="none" stroke="' + accent + '" stroke-width="3" opacity=".16"/>' +
    '<rect x="325" y="110" width="550" height="410" rx="34" fill="#fff" stroke="#e7ebf0" stroke-width="3"/>' +
    '<rect x="325" y="110" width="550" height="54" rx="34" fill="' + accent + '" opacity=".12"/>' +
    '<circle cx="365" cy="137" r="8" fill="' + accent + '" opacity=".55"/>' +
    '<circle cx="392" cy="137" r="8" fill="' + accent + '" opacity=".35"/>' +
    '<circle cx="419" cy="137" r="8" fill="' + accent + '" opacity=".2"/>' +
    motif(slug, accent) +
    '</svg>';
}

let changedArticles = 0;
let convertedWebp = 0;
let normalizedTeal = 0;
let generatedImages = 0;

for (const fileName of fs.readdirSync(articlesDir).filter((name) => name.endsWith('.md')).sort()) {
  const filePath = path.join(articlesDir, fileName);
  const slug = fileName.replace(/\.md$/, '');
  let source = fs.readFileSync(filePath, 'utf8');
  const original = source;

  const title = frontmatterValue(source, 'title') || slug;
  let featuredImage = frontmatterValue(source, 'featuredImage');
  let themeColor = frontmatterValue(source, 'themeColor') || '#47a3da';
  const heroClass = frontmatterValue(source, 'heroClass');

  if (heroClass === 'bg-teal' || themeColor.toLowerCase() === '#537b7b') {
    source = source.replace(/^heroClass:\s*["']?bg-teal["']?\s*$/m, 'heroClass: "bg-green"');
    source = source.replace(/^themeColor:\s*["']?#537b7b["']?\s*$/mi, 'themeColor: "#58b391"');
    themeColor = '#58b391';
    normalizedTeal += 1;
  }

  if (/\.webp$/i.test(featuredImage)) {
    const svgImage = featuredImage.replace(/\.webp$/i, '.svg');
    source = source.replace(featuredImage, svgImage);
    featuredImage = svgImage;
    convertedWebp += 1;
  }

  if (!featuredImage) {
    throw new Error('Missing featuredImage in ' + fileName);
  }

  if (source !== original) {
    fs.writeFileSync(filePath, source, 'utf8');
    changedArticles += 1;
  }

  const outputPath = path.join(root, 'public', featuredImage.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, makeSvg(slug, title, themeColor), 'utf8');
  generatedImages += 1;
}

function patchArticleV2Test() {
  const filePath = path.join(testsDir, 'article-v2.test.js');
  if (!fs.existsSync(filePath)) return;

  let source = fs.readFileSync(filePath, 'utf8').replace(/\.webp/g, '.svg');

  const start = source.indexOf('function assertValidWebp');
  const end = source.indexOf("test('Domain authority vector featured image is valid SVG')");

  if (start >= 0 && end > start) {
    const replacement = [
      "function assertValidSvg(filePath) {",
      "  const svg = fs.readFileSync(filePath, 'utf8');",
      "  assert.match(svg, /^<svg\\b/);",
      "  assert.match(svg, /width=\"1200\"/);",
      "  assert.match(svg, /height=\"630\"/);",
      "  assert.match(svg, /viewBox=\"0 0 1200 630\"/);",
      "}",
      "",
      "test('Editorial SVG assets are valid and complete', () => {",
      "  ['seo-que-es-featured.svg', 'auditoria-seo-con-ia-featured.svg'].forEach((fileName) => {",
      "    assertValidSvg(path.join(__dirname, '..', 'public', 'img', 'articulo', fileName));",
      "  });",
      "});",
      "",
      ""
    ].join('\n');

    source = source.slice(0, start) + replacement + source.slice(end);
  }

  fs.writeFileSync(filePath, source, 'utf8');
}

function patchNormalizationTest() {
  const filePath = path.join(testsDir, 'content-normalization.test.js');
  if (!fs.existsSync(filePath)) return;

  let source = fs.readFileSync(filePath, 'utf8').replace(/\.webp/g, '.svg');
  const oldMarker = "test('new normalized articles use complete local WebP featured images'";
  const newMarker = "test('new normalized articles use complete local SVG featured images'";
  let start = source.indexOf(oldMarker);
  if (start < 0) start = source.indexOf(newMarker);
  const end = source.indexOf("test('2018 SEO tools article");

  if (start >= 0 && end > start) {
    const replacement = [
      "test('new normalized articles use complete local SVG featured images', () => {",
      "  Object.entries(featuredImages).forEach(([slug, expectedImage]) => {",
      "    const article = contentLoader.loadArticle(slug);",
      "    assert.equal(article.featuredImage, expectedImage, slug);",
      "    const filePath = path.join(__dirname, '..', 'public', expectedImage.replace(/^\\//, ''));",
      "    assert.ok(fs.existsSync(filePath), 'Missing featured image for ' + slug);",
      "    const svg = fs.readFileSync(filePath, 'utf8');",
      "    assert.match(svg, /<svg\\b/i, slug);",
      "    assert.match(svg, /width=\"1200\"/, slug);",
      "    assert.match(svg, /height=\"630\"/, slug);",
      "    assert.match(svg, /viewBox=\"0 0 1200 630\"/, slug);",
      "  });",
      "});",
      "",
      ""
    ].join('\n');

    source = source.slice(0, start) + replacement + source.slice(end);
  }

  fs.writeFileSync(filePath, source, 'utf8');
}

patchArticleV2Test();
patchNormalizationTest();

console.log(JSON.stringify({
  changedArticles,
  convertedWebp,
  normalizedTeal,
  generatedImages
}, null, 2));
