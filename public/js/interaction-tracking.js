(function () {
  'use strict';

  var DATA_LAYER_EVENT = 'apmw_interaction';
  var ARTICLE_ENGAGED_SECONDS = 30;
  var ARTICLE_ENGAGED_DEPTH = 75;

  var state = {
    toolOpenSent: false,
    toolUseSent: false,
    toolResultSent: false,
    articleEndSent: false,
    articleEngagedSent: false,
    articleMaxDepth: 0,
    articleActiveMs: 0,
    articleActiveSince: null,
    articleTick: null,
    resultCheckTimer: null
  };

  function analyticsAllowed() {
    return document.documentElement.getAttribute('data-analytics-consent') === 'granted';
  }

  function pageSlug() {
    var path = String(window.location.pathname || '/').replace(/^\/+|\/+$/g, '');
    return path || 'inicio';
  }

  function pageType() {
    if (document.querySelector('.article-v2-content')) return 'article';
    if (document.querySelector('.tool-v2')) return 'tool';
    return 'page';
  }

  function safeId(element) {
    if (!element) return '';
    return String(element.id || element.getAttribute('name') || '').slice(0, 80);
  }

  function pushInteraction(name, parameters) {
    if (!analyticsAllowed()) return false;

    var payload = {
      event: DATA_LAYER_EVENT,
      apmw_event_name: name,
      content_type: pageType(),
      content_slug: pageSlug()
    };

    Object.keys(parameters || {}).forEach(function (key) {
      var value = parameters[key];
      if (value === undefined || value === null || value === '') return;
      if (typeof value === 'string') payload[key] = value.slice(0, 100);
      else if (typeof value === 'number' || typeof value === 'boolean') payload[key] = value;
    });

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    return true;
  }

  window.APMWTrack = function (name, parameters) {
    return pushInteraction(name, parameters || {});
  };

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () {
        return true;
      }).catch(function () {
        return false;
      });
    }

    return new Promise(function (resolve) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();

      var copied = false;
      try {
        copied = document.execCommand('copy');
      } catch (error) {
        copied = false;
      }

      document.body.removeChild(textarea);
      resolve(copied);
    });
  }

  function installArticleCodeCopy() {
    if (!window.Prism || !window.Prism.plugins || !window.Prism.plugins.toolbar) return;
    if (window.__apmwPrismCopyRegistered) return;

    window.Prism.plugins.toolbar.registerButton('apmw-copy-code', function (env) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Copiar';
      button.setAttribute('aria-label', 'Copiar código');

      button.addEventListener('click', function () {
        var code = env.element ? env.element.textContent : '';
        var blocks = document.querySelectorAll('.article-v2-content pre code');
        var blockIndex = Array.prototype.indexOf.call(blocks, env.element) + 1;

        copyText(code).then(function (copied) {
          if (!copied) {
            button.textContent = 'Selecciona y copia';
            window.setTimeout(function () {
              button.textContent = 'Copiar';
            }, 1800);
            return;
          }

          button.textContent = 'Copiado';
          pushInteraction('code_copy', {
            code_language: env.language || 'plain',
            content_block: blockIndex > 0 ? 'code_' + blockIndex : 'code'
          });

          window.setTimeout(function () {
            button.textContent = 'Copiar';
          }, 1400);
        });
      });

      return button;
    });

    window.__apmwPrismCopyRegistered = true;
  }

  installArticleCodeCopy();

  function articleDepth(article) {
    var rect = article.getBoundingClientRect();
    if (!rect.height) return 0;

    var seen = window.innerHeight - rect.top;
    var depth = Math.max(0, Math.min(100, Math.round((seen / rect.height) * 100)));
    return depth;
  }

  function pauseArticleTimer() {
    if (state.articleActiveSince !== null) {
      state.articleActiveMs += Date.now() - state.articleActiveSince;
      state.articleActiveSince = null;
    }
  }

  function resumeArticleTimer() {
    if (!analyticsAllowed() || document.visibilityState !== 'visible') return;
    if (state.articleActiveSince === null) state.articleActiveSince = Date.now();
  }

  function articleVisibleSeconds() {
    var total = state.articleActiveMs;
    if (state.articleActiveSince !== null) total += Date.now() - state.articleActiveSince;
    return Math.floor(total / 1000);
  }

  function evaluateArticle(article) {
    if (!analyticsAllowed()) return;

    var depth = articleDepth(article);
    state.articleMaxDepth = Math.max(state.articleMaxDepth, depth);

    var rect = article.getBoundingClientRect();
    if (!state.articleEndSent && rect.bottom <= window.innerHeight + 24) {
      if (pushInteraction('article_end', { scroll_percent: 100 })) {
        state.articleEndSent = true;
      }
    }

    var seconds = articleVisibleSeconds();
    if (
      !state.articleEngagedSent &&
      state.articleMaxDepth >= ARTICLE_ENGAGED_DEPTH &&
      seconds >= ARTICLE_ENGAGED_SECONDS
    ) {
      if (pushInteraction('article_engaged', {
        scroll_percent: state.articleMaxDepth,
        engaged_seconds: seconds
      })) {
        state.articleEngagedSent = true;
      }
    }
  }

  function setupArticleTracking() {
    var article = document.querySelector('.article-v2-content');
    if (!article) return;

    var ticking = false;
    function requestEvaluation() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        evaluateArticle(article);
      });
    }

    window.addEventListener('scroll', requestEvaluation, { passive: true });
    window.addEventListener('resize', requestEvaluation, { passive: true });

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') resumeArticleTimer();
      else pauseArticleTimer();
      evaluateArticle(article);
    });

    window.addEventListener('pagehide', pauseArticleTimer);

    state.articleTick = window.setInterval(function () {
      evaluateArticle(article);
    }, 1000);

    if (analyticsAllowed()) resumeArticleTimer();
    requestEvaluation();
  }

  var RESULT_SELECTORS = [
    '#seo-report:not([hidden])',
    '#heading-tree-panel:not([hidden])',
    '#link-results-panel:not([hidden])',
    '#tsa-sections',
    '#meta-code',
    '#redirect-code',
    '#robots-code',
    '#schema-output',
    '#sitemap-code',
    '#serp-preview-title',
    '#chv-summary:not([hidden])',
    '#charNumTit',
    '#charNumDesc'
  ];

  function toolContainer() {
    return document.querySelector('.tool-v2-content, .tool-v2-content.seo-tool, .seo-tool');
  }

  function meaningfulResult(container) {
    var i;
    for (i = 0; i < RESULT_SELECTORS.length; i += 1) {
      var result = container.querySelector(RESULT_SELECTORS[i]);
      if (!result || result.closest('[hidden]')) continue;

      var resultText = '';
      if ('value' in result && typeof result.value === 'string') resultText = result.value;
      else resultText = result.textContent || '';

      if (String(resultText).trim().length >= 2) {
        return safeId(result) || RESULT_SELECTORS[i].replace(/[^a-z0-9_-]/gi, '').slice(0, 80);
      }
    }

    var readonlyFields = container.querySelectorAll('input[readonly], textarea[readonly]');
    for (i = 0; i < readonlyFields.length; i += 1) {
      if (String(readonlyFields[i].value || '').trim()) return safeId(readonlyFields[i]) || 'readonly_result';
    }

    return '';
  }

  function checkToolResult() {
    if (!analyticsAllowed() || !state.toolUseSent || state.toolResultSent) return;

    var container = toolContainer();
    if (!container) return;

    var resultId = meaningfulResult(container);
    if (!resultId) return;

    if (pushInteraction('tool_result', {
      tool_name: pageSlug(),
      result_type: resultId
    })) {
      state.toolResultSent = true;
    }
  }

  function scheduleToolResultCheck() {
    window.clearTimeout(state.resultCheckTimer);
    state.resultCheckTimer = window.setTimeout(checkToolResult, 180);
  }

  function markToolUsed(source, control) {
    if (state.toolUseSent) {
      scheduleToolResultCheck();
      return;
    }

    if (pushInteraction('tool_use', {
      tool_name: pageSlug(),
      interaction_source: source,
      control_id: safeId(control)
    })) {
      state.toolUseSent = true;
      scheduleToolResultCheck();
    }
  }

  function buttonLabel(element) {
    return String((element && (element.textContent || element.value)) || '').trim().toLowerCase();
  }

  function setupToolTracking() {
    var tool = document.querySelector('.tool-v2');
    if (!tool) return;

    var container = toolContainer() || tool;

    var observer = new MutationObserver(function () {
      if (state.toolUseSent && !state.toolResultSent) scheduleToolResultCheck();
    });
    observer.observe(container, { childList: true, subtree: true, characterData: true, attributes: true });

    document.addEventListener('submit', function (event) {
      if (!tool.contains(event.target)) return;
      markToolUsed('submit', event.target);
    }, true);

    document.addEventListener('input', function (event) {
      if (!tool.contains(event.target)) return;
      if (event.target.matches('[readonly], [disabled]')) return;
      markToolUsed('input', event.target);
    });

    document.addEventListener('change', function (event) {
      if (!tool.contains(event.target)) return;
      if (event.target.matches('[readonly], [disabled]')) return;
      markToolUsed('change', event.target);
    });

    document.addEventListener('click', function (event) {
      var control = event.target.closest('button, a, input[type="button"], input[type="submit"]');
      if (!control || !tool.contains(control)) return;

      var label = buttonLabel(control);
      var id = safeId(control);
      var descriptor = (id + ' ' + label).toLowerCase();

      if (/ejemplo|example/.test(descriptor)) {
        pushInteraction('example_view', {
          tool_name: pageSlug(),
          control_id: id || 'example'
        });
        return;
      }

      if (/copiar|copy/.test(descriptor)) {
        pushInteraction('tool_copy', {
          tool_name: pageSlug(),
          control_id: id || 'copy'
        });
        return;
      }

      if (/limpiar|clear|restablecer|reset|descargar|download|eliminar|remove|añadir|agregar|importar/.test(descriptor)) {
        return;
      }

      if (/analizar|auditar|generar|calcular|convertir|validar|comprobar|procesar|crear/.test(descriptor)) {
        markToolUsed('button', control);
      }
    });

    if (analyticsAllowed() && !state.toolOpenSent) {
      if (pushInteraction('tool_open', { tool_name: pageSlug() })) state.toolOpenSent = true;
    }
  }

  function handleConsentChange() {
    var article = document.querySelector('.article-v2-content');
    var tool = document.querySelector('.tool-v2');

    if (analyticsAllowed()) {
      resumeArticleTimer();

      if (tool && !state.toolOpenSent) {
        if (pushInteraction('tool_open', { tool_name: pageSlug() })) state.toolOpenSent = true;
      }

      if (article) evaluateArticle(article);
    } else {
      pauseArticleTimer();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    setupArticleTracking();
    setupToolTracking();
    handleConsentChange();

    var consentObserver = new MutationObserver(function (mutations) {
      var changed = mutations.some(function (mutation) {
        return mutation.attributeName === 'data-analytics-consent';
      });
      if (changed) handleConsentChange();
    });

    consentObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-analytics-consent']
    });
  });
})();