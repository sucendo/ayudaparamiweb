const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const routeCatalog = require('../routes');

const CONTENT_VIEW_PATTERN = /^(news|tools|experiments)\//;
const FALLBACK_IMAGE = '/img/logo-color.svg';
const FALLBACK_ACCENT = '#537b7b';

const CATEGORY_DEFINITIONS = {
  guias: { slug: 'guias', name: 'Guías', description: 'Contenido de referencia, estratégico y evergreen.' },
  tutoriales: { slug: 'tutoriales', name: 'Tutoriales', description: 'Contenido paso a paso para aprender haciendo.' },
  herramientas: { slug: 'herramientas', name: 'Herramientas', description: 'Utilidades prácticas e interactivas.' },
  laboratorio: { slug: 'laboratorio', name: 'Laboratorio', description: 'Pruebas, demos y experimentos editoriales.' },
  analisis: { slug: 'analisis', name: 'Análisis', description: 'Valoraciones y lectura crítica de tendencias y casos.' }
};

const CATEGORY_BY_SLUG = {
  'guia-seo-pymes-2026': 'guias','seo-tecnico-core-web-vitals-2026': 'guias','checklist-lanzamiento-web-2026': 'guias','investigacion-palabras-clave': 'guias','contenido-y-seo': 'guias','seo-on-page-aspectos-tecnicos': 'guias','motores-de-busqueda': 'guias','seo-que-es': 'guias','como-crear-una-pagina-web': 'guias','conceptos-basicos-programacion': 'guias','node-js-que-es': 'guias','express-js-para-que-sirve': 'guias','vue-js-que-es': 'guias',
  'primeros-pasos-python': 'tutoriales','codigo-traductor-google-blog': 'tutoriales','entornos-colaborativos': 'tutoriales',
  'contador-caracteres-seo': 'herramientas','conversor-binario': 'herramientas','analizador-seo-url': 'herramientas',
  'mapa-guerra-ucrania-rusia': 'laboratorio','rusia-ataca-ucrania': 'laboratorio','quantum-pacific-group': 'laboratorio','calculo-posicion-provisional-pruebas-selectivas-comunidad-de-madrid-medico-familia-atencion-primaria-2019': 'laboratorio',
  'google-shopping-actions': 'analisis','problemas-canon-digital-ecommerce': 'analisis','que-es-bluetooth': 'analisis','el-mundo-del-programador-web': 'analisis','backlink-que-es-como-construir-red-de-enlaces': 'analisis','experiencia-de-usuario-ux-y-seo': 'analisis','herramientas-seo': 'analisis','autoridad-de-dominio': 'analisis','herramientas-seo-gratuitas': 'analisis','ia-generativa-estrategia-contenidos-seo': 'analisis'
};

const COLOR_CACHE = Object.create(null);

const ACCENT_BY_BG_CLASS = {
  'bg-purple': '#64448f',
  'bg-blue': '#47a3da',
  'bg-green': '#2fa06a',
  'bg-red': '#d25565',
  'bg-orange': '#ee9e2d',
  'bg-yellow': '#f1c40f'
};

const stripTags = (value) => (value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const getSlug = (routePath) => routePath.replace(/^\//, '');
const getViewFile = (route) => path.join(__dirname, '..', 'views', `${route.view}.ejs`);
const readSource = (route) => fs.readFileSync(getViewFile(route), 'utf8');
const toAbsoluteImage = (imagePath) => path.join(__dirname, '..', 'public', imagePath.replace(/^\//, ''));
const toHexColor = (r, g, b) => `#${[r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')}`;

function extractTitle(source, slug) {
  const h1Match = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) return stripTags(h1Match[1]);
  const titleMatch = source.match(/<title>([\s\S]*?)<\/title>/i);
  if (titleMatch) return stripTags(titleMatch[1].split('|')[0]);
  return slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function extractExcerpt(source) {
  const excerptMatch = source.match(/<div[^>]*class="[^"]*ct-post-excerpt[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (excerptMatch) return stripTags(excerptMatch[1]);
  const paragraphMatch = source.match(/<p>([\s\S]*?)<\/p>/i);
  if (paragraphMatch) return stripTags(paragraphMatch[1]);
  return 'Contenido publicado en Ayuda para mi Web.';
}

function extractDate(source) {
  const contentDateMatch = source.match(/content="(\d{4}-\d{2}-\d{2})/i);
  if (contentDateMatch) return contentDateMatch[1];

  const visibleDateMatch = source.match(/<time[^>]*>(\d{2})\/(\d{2})\/(\d{4})<\/time>/i);
  if (visibleDateMatch) return `${visibleDateMatch[3]}-${visibleDateMatch[2]}-${visibleDateMatch[1]}`;

  const monthMap = {
    enero: '01', febrero: '02', marzo: '03', abril: '04', mayo: '05', junio: '06',
    julio: '07', agosto: '08', septiembre: '09', setiembre: '09', octubre: '10', noviembre: '11', diciembre: '12'
  };

  const textDateMatch = source.match(/(\d{1,2})\s+de\s+([a-záéíóúñ]+)\s+de\s+(\d{4})/i);
  if (textDateMatch) {
    const day = textDateMatch[1].padStart(2, '0');
    const month = monthMap[textDateMatch[2].toLowerCase()] || '01';
    return `${textDateMatch[3]}-${month}-${day}`;
  }

  return '1970-01-01';
}

function extractImage(source) {
  const postContentMatch = source.match(/<div[^>]*class="[^"]*ct-post-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/article>/i);
  const scope = postContentMatch ? postContentMatch[1] : source;
  const imageMatch = scope.match(/<img[^>]*src="([^"]+)"[^>]*>/i);
  if (!imageMatch) return FALLBACK_IMAGE;
  const raw = imageMatch[1].trim();
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('//')) return FALLBACK_IMAGE;
  return raw.startsWith('/') ? raw : `/${raw.replace(/^\.\//, '')}`;
}


function extractAccentFromBgClass(source) {
  const bgMatch = source.match(/class="[^"]*bg-img\s+(bg-[a-z]+)[^"]*"/i);
  if (!bgMatch) return null;
  return ACCENT_BY_BG_CLASS[bgMatch[1].toLowerCase()] || null;
}

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function extractColorFromPng(buffer) {
  const signature = '89504e470d0a1a0a';
  if (buffer.subarray(0, 8).toString('hex') !== signature) return null;

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset); offset += 4;
    const type = buffer.subarray(offset, offset + 4).toString('ascii'); offset += 4;
    const data = buffer.subarray(offset, offset + length); offset += length;
    offset += 4;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
  }

  if (!width || !height || bitDepth !== 8 || (colorType !== 2 && colorType !== 6)) return null;

  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const rowSize = width * bytesPerPixel;
  const inflated = zlib.inflateSync(Buffer.concat(idat));
  const raw = Buffer.alloc(rowSize * height);

  let inOffset = 0;
  let outOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filterType = inflated[inOffset];
    inOffset += 1;

    for (let x = 0; x < rowSize; x += 1) {
      const current = inflated[inOffset + x];
      const left = x >= bytesPerPixel ? raw[outOffset + x - bytesPerPixel] : 0;
      const up = y > 0 ? raw[outOffset + x - rowSize] : 0;
      const upLeft = (y > 0 && x >= bytesPerPixel) ? raw[outOffset + x - rowSize - bytesPerPixel] : 0;

      if (filterType === 0) raw[outOffset + x] = current;
      else if (filterType === 1) raw[outOffset + x] = (current + left) & 0xff;
      else if (filterType === 2) raw[outOffset + x] = (current + up) & 0xff;
      else if (filterType === 3) raw[outOffset + x] = (current + Math.floor((left + up) / 2)) & 0xff;
      else if (filterType === 4) raw[outOffset + x] = (current + paethPredictor(left, up, upLeft)) & 0xff;
    }

    inOffset += rowSize;
    outOffset += rowSize;
  }

  let red = 0; let green = 0; let blue = 0; let count = 0;
  for (let i = 0; i < raw.length; i += bytesPerPixel) {
    const alpha = bytesPerPixel === 4 ? raw[i + 3] : 255;
    if (alpha < 32) continue;
    red += raw[i];
    green += raw[i + 1];
    blue += raw[i + 2];
    count += 1;
  }

  if (!count) return null;
  return toHexColor(Math.round(red / count), Math.round(green / count), Math.round(blue / count));
}

function extractColorFromSvg(content) {
  const matches = content.match(/#[0-9a-fA-F]{6}/g);
  if (!matches || !matches.length) return null;
  const frequency = matches.reduce((acc, color) => {
    const key = color.toLowerCase();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a])[0];
}

function computeAccentColor(imagePath, source) {
  const accentFromClass = extractAccentFromBgClass(source);
  if (accentFromClass) return accentFromClass;

  if (!imagePath || imagePath === FALLBACK_IMAGE) return FALLBACK_ACCENT;
  if (COLOR_CACHE[imagePath]) return COLOR_CACHE[imagePath];

  try {
    const absolutePath = toAbsoluteImage(imagePath);
    if (!fs.existsSync(absolutePath)) return FALLBACK_ACCENT;

    const ext = path.extname(absolutePath).toLowerCase();
    const file = fs.readFileSync(absolutePath);

    let color = null;
    if (ext === '.png') color = extractColorFromPng(file);
    if (!color && ext === '.svg') color = extractColorFromSvg(file.toString('utf8'));

    COLOR_CACHE[imagePath] = color || FALLBACK_ACCENT;
    return COLOR_CACHE[imagePath];
  } catch (error) {
    COLOR_CACHE[imagePath] = FALLBACK_ACCENT;
    return FALLBACK_ACCENT;
  }
}

async function buildCatalog() {
  const routes = (routeCatalog.publishedRoutes || routeCatalog).filter((route) => CONTENT_VIEW_PATTERN.test(route.view));

  const items = routes.map((route) => {
    const source = readSource(route);
    const slug = getSlug(route.path);
    const image = extractImage(source);

    return {
      title: extractTitle(source, slug),
      slug,
      path: route.path,
      date: extractDate(source),
      excerpt: extractExcerpt(source),
      category: CATEGORY_BY_SLUG[slug] || 'guias',
      image,
      accentColor: computeAccentColor(image, source),
      view: route.view
    };
  });

  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function filterByCategory(items, categorySlug) {
  return items.filter((item) => item.category === categorySlug);
}

module.exports = { CATEGORY_DEFINITIONS, buildCatalog, filterByCategory };
