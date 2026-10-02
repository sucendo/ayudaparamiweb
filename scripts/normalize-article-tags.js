#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');

function key(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

const aliases = new Map(Object.entries({
  'wordpress': ['WordPress'],
  'contenido': ['Contenidos'],
  'analitica': ['Analítica web'],
  'e-commerce': ['Ecommerce'],
  'conversiones': ['Conversión'],
  'hosting': ['Alojamiento web'],
  'mantenimiento': ['Mantenimiento web'],
  'mantenimiento web proactivo': ['Mantenimiento web'],
  'marketing online': ['Marketing digital'],
  'migracion': ['Migración web'],
  'gestion de proyectos': ['Estrategia digital'],
  'optimizacion': ['Rendimiento web'],
  'posicionamiento web': ['SEO'],
  'rendimiento': ['Rendimiento web'],
  'velocidad web': ['Rendimiento web'],
  'seguridad': ['Seguridad web'],
  'tiendas online': ['Ecommerce'],
  'wpo': ['Rendimiento web'],
  'ia y seo': ['IA', 'SEO'],
  'auditoria': ['Auditoría SEO'],
  'auditoria de contenidos': ['Contenidos', 'Auditoría SEO'],
  'auditoria seo con ia': ['Auditoría SEO', 'IA', 'SEO'],
  'autoridad de dominio': ['SEO', 'Backlinks'],
  'b2b': ['Captación', 'Marketing digital'],
  'backoffice': ['PrestaShop'],
  'bigquery': ['GA4', 'Analítica web'],
  'blogs': ['Web', 'Contenidos'],
  'bluetooth': ['Tecnología'],
  'conectividad': ['Tecnología'],
  'briefing': ['Web'],
  'busqueda multimodal': ['SEO'],
  'canibalizacion': ['SEO'],
  'canon digital': ['Ecommerce'],
  'chatgpt': ['IA'],
  'cms': ['Web', 'Desarrollo web'],
  'copywriting': ['Contenidos', 'Conversión'],
  'core web vitals': ['Rendimiento web', 'SEO técnico'],
  'dashboard': ['Analítica web', 'GA4'],
  'e-e-a-t': ['SEO', 'Contenidos'],
  'email marketing': ['Marketing digital'],
  'enlaces': ['Backlinks'],
  'equipos': ['Productividad'],
  'error xml': ['PrestaShop'],
  'errores frecuentes': ['Errores web'],
  'express.js': ['Node.js'],
  'fichas de producto': ['Ecommerce'],
  'frontend': ['Desarrollo web'],
  'google': [],
  'google lens': ['SEO'],
  'google my business': ['SEO local'],
  'google shopping': ['Ecommerce'],
  'google trends': ['SEO'],
  'herramientas de desarrollo': ['Programación'],
  'herramientas digitales': ['Productividad'],
  'html': ['Desarrollo web'],
  'informes': ['Analítica web'],
  'internet': ['Web'],
  'landing pages': ['Conversión'],
  'lanzamiento web': ['Web'],
  'logs': ['SEO técnico'],
  'malware': ['Seguridad web'],
  'microsoft 365': ['Productividad'],
  'modulos': ['PrestaShop'],
  'negocios': ['Web'],
  'optimizacion de google busin': ['SEO local'],
  'optimizacion web': ['Rendimiento web'],
  'pagespeed': ['Rendimiento web'],
  'palabras clave': ['SEO'],
  'pipelines de contenido con i': ['IA', 'Contenidos', 'Automatización'],
  'plan seo y contenidos para 2': ['SEO', 'Contenidos'],
  'planificacion': ['Estrategia digital'],
  'procesos': ['Automatización'],
  'prompts': ['IA'],
  'proyectos': ['Web'],
  'qa': ['Web'],
  'rastreo': ['SEO técnico'],
  'redaccion': ['Contenidos'],
  'redirecciones': ['SEO técnico'],
  'rediseno web': ['Web'],
  'responsive design': ['Diseño web', 'UX'],
  'seo estacional': ['SEO', 'Contenidos'],
  'seo local avanzado para pyme': ['SEO local', 'SEO'],
  'seo local y visibilidad para': ['SEO local', 'SEO'],
  'seo visual': ['SEO'],
  'soporte web': ['Errores web'],
  'transformacion digital': ['Estrategia digital'],
  'usabilidad': ['UX'],
  'videollamadas': ['Colaboración'],
  'vue.js': ['JavaScript'],
  'web corporativa': ['Web'],
  'web hackeada': ['Seguridad web'],
  'woocommerce': ['WordPress', 'Ecommerce'],
  'api': ['Programación'],
  'google analytics': ['Analítica web'],
  'negocios locales': ['SEO local']
}));

const drop = new Set([
  '2025',
  'checklist',
  'fundamentos',
  'guia',
  'herramientas',
  'tutorial'
]);

const additions = {
  'git-y-github-para-principiantes': ['Programación', 'Desarrollo web'],
  'mi-web-no-carga-que-hacer-10-minutos': ['Errores web', 'Mantenimiento web', 'Servidor'],
  'wordpress-lento-diagnostico-real-paso-a-paso': ['WordPress', 'Rendimiento web', 'Mantenimiento web'],
  'experiencia-de-usuario-ux-y-seo': ['UX'],
  'seo-on-page-aspectos-tecnicos': ['SEO técnico'],
  'que-es-bluetooth': ['Tecnología'],
  'que-es-una-api-y-para-que-sirve': ['Tecnología'],
  'microsoft-365-para-pymes': ['Tecnología'],
  'clusters-de-contenido-y-seo': ['Enlazado interno'],
  'arquitectura-web-para-catalogos-grandes': ['Enlazado interno']
};

function parseTags(raw) {
  if (!raw.trim()) return [];
  return raw.split(',').map((tag) => tag.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
}

function normalizeTags(tags, slug) {
  const output = [];
  const seen = new Set();

  function add(tag) {
    const normalizedKey = key(tag);
    if (!tag || drop.has(normalizedKey) || seen.has(normalizedKey)) return;
    seen.add(normalizedKey);
    output.push(tag);
  }

  for (const tag of tags) {
    const mapped = aliases.get(key(tag));
    if (mapped) mapped.forEach(add);
    else add(tag === 'wordpress' ? 'WordPress' : tag);
  }

  (additions[slug] || []).forEach(add);
  return output;
}

let changed = 0;

for (const filename of fs.readdirSync(ARTICLES_DIR).filter((name) => name.endsWith('.md'))) {
  const file = path.join(ARTICLES_DIR, filename);
  let source = fs.readFileSync(file, 'utf8');
  const slug = filename.replace(/\.md$/, '');
  const tagLine = source.match(/^tags:\s*\[([^\]]*)\]\s*$/m);
  const current = tagLine ? parseTags(tagLine[1]) : [];
  const next = normalizeTags(current, slug);
  const replacement = 'tags: [' + next.map((tag) => JSON.stringify(tag)).join(', ') + ']';

  if (tagLine) {
    source = source.replace(tagLine[0], replacement);
  } else {
    const categoryLine = source.match(/^category:.*$/m);
    if (categoryLine) source = source.replace(categoryLine[0], categoryLine[0] + '\n' + replacement);
  }

  const previous = fs.readFileSync(file, 'utf8');
  if (source !== previous) {
    fs.writeFileSync(file, source, 'utf8');
    changed += 1;
  }
}

console.log('Artículos con tags normalizados:', changed);
