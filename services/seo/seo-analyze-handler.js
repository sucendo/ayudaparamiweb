const { fetchRemoteHtml } = require('./fetch-remote-html');
const { analyzeSeo } = require('./analyze-seo');

function normalizeInputUrl(rawUrl) {
  if (!rawUrl) {
    return null;
  }

  const trimmed = String(rawUrl).trim();

  if (!trimmed) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    if (!/^https?:$/.test(parsed.protocol)) {
      return null;
    }
    return parsed.toString();
  } catch (error) {
    return null;
  }
}

async function analyzeUrl(rawUrl) {
  const normalizedUrl = normalizeInputUrl(rawUrl);

  if (!normalizedUrl) {
    const validationError = new Error('URL no válida. Introduce una URL completa, por ejemplo: https://ejemplo.com');
    validationError.code = 'INVALID_URL';
    throw validationError;
  }

  const remote = await fetchRemoteHtml(normalizedUrl, {
    timeoutMs: 12000
  });

  if (!/text\/html|application\/xhtml\+xml/i.test(remote.contentType)) {
    const typeError = new Error(`El recurso no parece HTML. Content-Type detectado: ${remote.contentType || 'desconocido'}`);
    typeError.code = 'UNSUPPORTED_CONTENT';
    throw typeError;
  }

  return analyzeSeo(remote.html, remote.finalUrl, {
    requestUrl: remote.requestUrl,
    finalUrl: remote.finalUrl,
    status: remote.status,
    redirects: remote.redirects,
    elapsedMs: remote.elapsedMs,
    contentType: remote.contentType
  });
}

function handleSeoAnalyzeRequest(request, response) {
  analyzeUrl(request.query.url)
    .then(function(report) {
      response.json({ ok: true, report: report });
    })
    .catch(function(error) {
      const statusCode = error.code === 'INVALID_URL' ? 400 : 422;
      response.status(statusCode).json({
        ok: false,
        error: error.message || 'No se pudo analizar la URL.'
      });
    });
}

module.exports = {
  analyzeUrl,
  handleSeoAnalyzeRequest
};
