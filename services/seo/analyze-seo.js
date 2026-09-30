const WEAK_ANCHORS = ['haz clic aqui', 'haz clic aquí', 'click aqui', 'click aquí', 'clic aquí', 'click here', 'leer más', 'mas info', 'más info', 'aquí'];
const STOPWORDS = new Set([
  'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por', 'un', 'para', 'con', 'no', 'una', 'su',
  'al', 'es', 'lo', 'como', 'más', 'o', 'pero', 'sus', 'le', 'ya', 'si', 'porque', 'esta', 'entre', 'cuando', 'muy',
  'sin', 'sobre', 'también', 'me', 'hasta', 'hay', 'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos',
  'one', 'the', 'is', 'to', 'and', 'in', 'for', 'on', 'with', 'as', 'of', 'by', 'at', 'an', 'be', 'or', 'from', 'this'
]);

function normalizeText(value) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

function findFirstMatch(html, regex, group) {
  const match = regex.exec(html);
  if (!match) {
    return '';
  }

  return normalizeText(match[group || 1] || '');
}

function findAllMatches(html, regex, mapper) {
  const results = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    results.push(mapper(match));
  }

  return results;
}

function stripTags(html) {
  return normalizeText(
    (html || '')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ')
      .replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
  );
}

function extractAttribute(tag, attribute) {
  const regex = new RegExp(`${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'i');
  const match = regex.exec(tag);
  return match ? normalizeText(match[2]) : '';
}

function getMetaByName(html, name) {
  const metaTags = findAllMatches(html, /<meta\b[^>]*>/gi, (match) => match[0]);

  for (let i = 0; i < metaTags.length; i += 1) {
    const tag = metaTags[i];
    const metaName = extractAttribute(tag, 'name').toLowerCase();
    if (metaName === name.toLowerCase()) {
      return extractAttribute(tag, 'content');
    }
  }

  return '';
}

function getMetaByProperty(html, property) {
  const metaTags = findAllMatches(html, /<meta\b[^>]*>/gi, (match) => match[0]);

  for (let i = 0; i < metaTags.length; i += 1) {
    const tag = metaTags[i];
    const metaProperty = extractAttribute(tag, 'property').toLowerCase();
    if (metaProperty === property.toLowerCase()) {
      return extractAttribute(tag, 'content');
    }
  }

  return '';
}

function countWords(text) {
  const matches = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  return matches.length;
}

function topTerms(text) {
  const terms = text.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || [];
  const frequencies = new Map();

  terms.forEach((term) => {
    if (STOPWORDS.has(term)) {
      return;
    }
    frequencies.set(term, (frequencies.get(term) || 0) + 1);
  });

  return Array.from(frequencies.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map((entry) => ({ term: entry[0], count: entry[1] }));
}

function buildHeadingIssues(h1Count, h2Count, h3Count) {
  const issues = [];
  if (h1Count === 0) issues.push('No se detectó ningún H1.');
  if (h1Count > 1) issues.push('Hay múltiples H1; idealmente debería haber solo uno principal.');
  if (h2Count > 0 && h1Count === 0) issues.push('Se detectaron H2 sin H1 previo.');
  if (h3Count > 0 && h2Count === 0) issues.push('Se detectaron H3 sin H2 intermedio.');
  return issues;
}

function scoreSection(start, penalties) {
  const final = penalties.reduce((total, penalty) => total - penalty, start);
  return Math.max(0, Math.min(100, final));
}

function parseLinks(html, pageUrl) {
  return findAllMatches(html, /<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (match) => {
    const attrs = match[1] || '';
    const linkText = normalizeText(stripTags(match[2] || ''));
    const href = extractAttribute(attrs, 'href');
    let absolute = href;
    let internal = false;

    try {
      absolute = new URL(href, pageUrl).toString();
      internal = new URL(absolute).hostname === new URL(pageUrl).hostname;
    } catch (error) {
      internal = href.startsWith('/') || href.startsWith('#');
    }

    return {
      href,
      absolute,
      text: linkText,
      internal
    };
  }).filter((link) => Boolean(link.href));
}

function parseImages(html) {
  return findAllMatches(html, /<img\b([^>]*)>/gi, (match) => {
    const attrs = match[1] || '';
    const src = extractAttribute(attrs, 'src');
    const alt = extractAttribute(attrs, 'alt');
    const width = Number(extractAttribute(attrs, 'width')) || 0;
    const height = Number(extractAttribute(attrs, 'height')) || 0;
    const dataSize = Number(extractAttribute(attrs, 'data-size')) || 0;

    return {
      src,
      alt,
      hasAlt: Boolean(alt),
      possibleHeavy: dataSize > 300000 || (width >= 2000 && height >= 1200)
    };
  });
}

function analyzeSeo(html, pageUrl, responseMeta) {
  const safeHtml = html || '';
  const bodyText = stripTags(findFirstMatch(safeHtml, /<body[^>]*>([\s\S]*?)<\/body>/i, 1) || safeHtml);

  const title = findFirstMatch(safeHtml, /<title[^>]*>([\s\S]*?)<\/title>/i, 1);
  const metaDescription = getMetaByName(safeHtml, 'description');
  const canonicalRaw = findFirstMatch(safeHtml, /<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*>/i, 0);
  const canonicalHref = canonicalRaw ? extractAttribute(canonicalRaw, 'href') : '';
  const canonical = canonicalHref ? new URL(canonicalHref, pageUrl).toString() : '';
  const metaRobots = getMetaByName(safeHtml, 'robots');
  const hreflang = findAllMatches(safeHtml, /<link\b[^>]*rel=["'][^"']*alternate[^"']*["'][^>]*>/gi, (match) => {
    const tag = match[0];
    const locale = extractAttribute(tag, 'hreflang');
    if (!locale) return null;
    return { hreflang: locale, href: extractAttribute(tag, 'href') };
  }).filter(Boolean);

  const htmlTag = findFirstMatch(safeHtml, /<html\b([^>]*)>/i, 1);
  const lang = htmlTag ? extractAttribute(htmlTag, 'lang') : '';
  const viewport = getMetaByName(safeHtml, 'viewport');

  const h1 = findAllMatches(safeHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/gi, (m) => stripTags(m[1]));
  const h2 = findAllMatches(safeHtml, /<h2[^>]*>([\s\S]*?)<\/h2>/gi, (m) => stripTags(m[1]));
  const h3 = findAllMatches(safeHtml, /<h3[^>]*>([\s\S]*?)<\/h3>/gi, (m) => stripTags(m[1]));

  const keywordCandidates = topTerms(bodyText);
  const images = parseImages(safeHtml);
  const links = parseLinks(safeHtml, pageUrl);

  const og = {
    title: getMetaByProperty(safeHtml, 'og:title'),
    description: getMetaByProperty(safeHtml, 'og:description'),
    image: getMetaByProperty(safeHtml, 'og:image')
  };

  const twitter = {
    card: getMetaByName(safeHtml, 'twitter:card'),
    title: getMetaByName(safeHtml, 'twitter:title'),
    description: getMetaByName(safeHtml, 'twitter:description'),
    image: getMetaByName(safeHtml, 'twitter:image')
  };

  const jsonLdCount = findAllMatches(safeHtml, /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi, (m) => m[0]).length;
  const schemaOrgMicrodata = /itemtype\s*=\s*["'][^"']*schema\.org/i.test(safeHtml);
  const faviconTag = findFirstMatch(safeHtml, /<link\b[^>]*rel=["'][^"']*(?:icon|apple-touch-icon)[^"']*["'][^>]*>/i, 0);
  const favicon = faviconTag ? extractAttribute(faviconTag, 'href') : '';

  const imagesWithAlt = images.filter((image) => image.hasAlt);
  const imagesWithoutAlt = images.filter((image) => !image.hasAlt);
  const heavyImages = images.filter((image) => image.possibleHeavy);

  const internalLinks = links.filter((link) => link.internal);
  const externalLinks = links.filter((link) => !link.internal);
  const weakAnchorLinks = links.filter((link) => {
    const text = (link.text || '').toLowerCase();
    return !text || text.length < 3 || WEAK_ANCHORS.indexOf(text) !== -1;
  });

  const headingIssues = buildHeadingIssues(h1.length, h2.length, h3.length);

  const flags = {
    noindex: /noindex/i.test(metaRobots),
    nofollow: /nofollow/i.test(metaRobots),
    missingTitle: !title,
    missingDescription: !metaDescription,
    multipleH1: h1.length > 1,
    missingH1: h1.length === 0,
    shortTitle: title.length > 0 && title.length < 30,
    longTitle: title.length > 65,
    shortDescription: metaDescription.length > 0 && metaDescription.length < 70,
    longDescription: metaDescription.length > 160,
    canonicalSuspicious: Boolean(canonicalHref) && !/^https?:\/\//i.test(canonicalHref)
  };

  const recommendations = [];
  if (flags.noindex) recommendations.push({ severity: 'critical', text: 'La URL está marcada como noindex y no debería posicionar en buscadores.' });
  if (flags.missingTitle) recommendations.push({ severity: 'critical', text: 'Falta la etiqueta <title>. Añade un título único y descriptivo.' });
  if (flags.missingDescription) recommendations.push({ severity: 'important', text: 'Falta la meta description. Incluye una descripción clara para mejorar el CTR.' });
  if (flags.multipleH1) recommendations.push({ severity: 'important', text: 'Hay más de un H1. Usa un único H1 principal para clarificar la jerarquía.' });
  if (flags.missingH1) recommendations.push({ severity: 'critical', text: 'No se detecta H1 principal. Añádelo para reforzar el tema de la página.' });
  if (imagesWithoutAlt.length > 0) recommendations.push({ severity: 'important', text: `Hay ${imagesWithoutAlt.length} imágenes sin atributo alt.` });
  if (flags.shortTitle || flags.longTitle) recommendations.push({ severity: 'recommended', text: 'Ajusta la longitud del title entre 30 y 65 caracteres.' });
  if (flags.shortDescription || flags.longDescription) recommendations.push({ severity: 'recommended', text: 'Ajusta la meta description entre 70 y 160 caracteres.' });
  if (!og.title || !og.description) recommendations.push({ severity: 'recommended', text: 'Completa Open Graph title/description para mejorar compartidos sociales.' });
  if (weakAnchorLinks.length > 0) recommendations.push({ severity: 'recommended', text: 'Revisa textos de enlaces poco descriptivos (ej. "haz clic aquí").' });

  const scores = {
    indexabilidad: scoreSection(100, [flags.noindex ? 45 : 0, flags.nofollow ? 15 : 0, flags.canonicalSuspicious ? 20 : 0, flags.missingH1 ? 20 : 0]),
    metadatos: scoreSection(100, [flags.missingTitle ? 45 : 0, flags.missingDescription ? 30 : 0, flags.shortTitle || flags.longTitle ? 12 : 0, flags.shortDescription || flags.longDescription ? 10 : 0, !viewport ? 8 : 0]),
    contenido: scoreSection(100, [headingIssues.length ? 18 : 0, countWords(bodyText) < 200 ? 15 : 0, h2.length === 0 ? 10 : 0]),
    imagenes: scoreSection(100, [images.length === 0 ? 10 : 0, imagesWithoutAlt.length * 8, heavyImages.length * 5]),
    enlazado: scoreSection(100, [links.length === 0 ? 25 : 0, weakAnchorLinks.length * 6, externalLinks.length === 0 ? 6 : 0]),
    socialSchema: scoreSection(100, [!og.title ? 12 : 0, !og.description ? 12 : 0, !twitter.card ? 8 : 0, jsonLdCount === 0 && !schemaOrgMicrodata ? 20 : 0, !favicon ? 8 : 0])
  };

  const overallScore = Math.round((scores.indexabilidad + scores.metadatos + scores.contenido + scores.imagenes + scores.enlazado + scores.socialSchema) / 6);

  return {
    analyzedAt: new Date().toISOString(),
    crawl: {
      requestedUrl: responseMeta.requestUrl,
      finalUrl: responseMeta.finalUrl,
      status: responseMeta.status,
      redirects: responseMeta.redirects,
      elapsedMs: responseMeta.elapsedMs,
      contentType: responseMeta.contentType
    },
    onPage: {
      title,
      titleLength: title.length,
      metaDescription,
      metaDescriptionLength: metaDescription.length,
      canonical,
      metaRobots,
      hreflang,
      lang,
      viewport
    },
    content: {
      h1Count: h1.length,
      h1Main: h1[0] || '',
      h2,
      h3,
      headingIssues,
      visibleWordCount: countWords(bodyText),
      topTerms: keywordCandidates,
      suggestedMainKeyword: keywordCandidates.length ? keywordCandidates[0].term : ''
    },
    images: {
      total: images.length,
      withAlt: imagesWithAlt.length,
      withoutAlt: imagesWithoutAlt.length,
      possibleHeavy: heavyImages.length,
      problems: imagesWithoutAlt.slice(0, 10).map((image) => `Imagen sin alt: ${image.src || '(sin src)'}`)
    },
    links: {
      total: links.length,
      internal: internalLinks.length,
      external: externalLinks.length,
      weakAnchorCount: weakAnchorLinks.length,
      weakAnchors: weakAnchorLinks.slice(0, 10).map((link) => ({ text: link.text, href: link.href }))
    },
    social: {
      openGraph: og,
      twitter,
      structuredData: {
        jsonLdCount,
        schemaOrgMicrodata
      },
      favicon,
      canonicalOgCoherent: Boolean(canonical) && Boolean(og.title)
    },
    indexabilityFlags: flags,
    scores: {
      overall: overallScore,
      byBlock: scores
    },
    recommendations: {
      critical: recommendations.filter((item) => item.severity === 'critical').map((item) => item.text),
      important: recommendations.filter((item) => item.severity === 'important').map((item) => item.text),
      recommended: recommendations.filter((item) => item.severity === 'recommended').map((item) => item.text)
    },
    notes: [
      'La puntuación es orientativa y no sustituye una auditoría SEO completa.',
      'No se estiman tráfico orgánico ni backlinks en este MVP.',
      'El peso real de imágenes no se descarga en este MVP; se marcan posibles imágenes pesadas por heurística.'
    ]
  };
}

module.exports = {
  analyzeSeo
};
