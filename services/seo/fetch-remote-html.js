const DEFAULT_TIMEOUT_MS = 12000;
const MAX_REDIRECTS = 5;

function isRedirectStatus(status) {
  return status >= 300 && status < 400;
}

function buildAbsoluteUrl(baseUrl, maybeRelative) {
  try {
    return new URL(maybeRelative, baseUrl).toString();
  } catch (error) {
    return null;
  }
}

async function fetchOnce(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(function() {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'user-agent': 'AyudaParaMiWeb-SEOAnalyzer/1.0 (+https://www.ayudaparamiweb.com)',
        'accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'accept-language': 'es-ES,es;q=0.9,en;q=0.7'
      }
    });

    return response;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRemoteHtml(inputUrl, options) {
  const timeoutMs = (options && options.timeoutMs) || DEFAULT_TIMEOUT_MS;
  const redirects = [];
  let currentUrl = inputUrl;
  let response;
  let hops = 0;
  const start = Date.now();

  while (hops <= MAX_REDIRECTS) {
    response = await fetchOnce(currentUrl, timeoutMs);
    const location = response.headers.get('location');

    if (!isRedirectStatus(response.status) || !location) {
      break;
    }

    const nextUrl = buildAbsoluteUrl(currentUrl, location);
    redirects.push({
      from: currentUrl,
      to: nextUrl || location,
      status: response.status
    });

    if (!nextUrl) {
      break;
    }

    currentUrl = nextUrl;
    hops += 1;
  }

  const contentType = response.headers.get('content-type') || '';
  const html = await response.text();
  const elapsedMs = Date.now() - start;

  return {
    html: html,
    requestUrl: inputUrl,
    finalUrl: currentUrl,
    status: response.status,
    contentType: contentType,
    elapsedMs: elapsedMs,
    redirects: redirects
  };
}

module.exports = {
  fetchRemoteHtml
};
