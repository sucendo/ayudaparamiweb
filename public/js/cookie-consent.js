(function () {
  var CONSENT_KEY = 'apmw_cookie_consent_v1';
  var CONSENT_MAX_AGE_DAYS = 180;

  function nowIso() {
    return new Date().toISOString();
  }

  function readConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (parsed.updatedAt) {
        var elapsed = Date.now() - new Date(parsed.updatedAt).getTime();
        var maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
        if (elapsed > maxAge) {
          localStorage.removeItem(CONSENT_KEY);
          return null;
        }
      }
      return parsed;
    } catch (error) {
      return null;
    }
  }

  function writeConsent(consent) {
    var payload = {
      required: true,
      analytics: !!consent.analytics,
      updatedAt: nowIso()
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    return payload;
  }

  function analyticsAlreadyLoaded() {
    return !!document.querySelector('script[data-cookie-consent="analytics"]');
  }

  function loadAnalyticsIfAllowed(consent) {
    if (!consent || !consent.analytics || analyticsAlreadyLoaded()) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    var analyticsScript = document.createElement('script');
    analyticsScript.async = true;
    analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-114140363-1';
    analyticsScript.dataset.cookieConsent = 'analytics';
    document.head.appendChild(analyticsScript);

    window.gtag('js', new Date());
    window.gtag('config', 'UA-114140363-1');
  }

  function createBanner() {
    var container = document.createElement('section');
    container.className = 'ct-cookie-consent';
    container.setAttribute('aria-live', 'polite');
    container.innerHTML = [
      '<h2 class="ct-cookie-consent__title">Preferencias de cookies</h2>',
      '<p>Usamos cookies técnicas necesarias para el funcionamiento del sitio y, con tu permiso, cookies analíticas para medir uso y mejorar contenidos (RGPD/UE).</p>',
      '<div class="ct-cookie-consent__toggles">',
      '  <label class="ct-cookie-consent__toggle">',
      '    <span>Cookies necesarias (siempre activas)</span>',
      '    <input type="checkbox" checked disabled>',
      '  </label>',
      '  <label class="ct-cookie-consent__toggle">',
      '    <span>Cookies analíticas</span>',
      '    <input type="checkbox" data-cookie-analytics>',
      '  </label>',
      '</div>',
      '<div class="ct-cookie-consent__actions">',
      '  <button type="button" class="ct-cookie-consent__btn" data-cookie-reject>Rechazar analíticas</button>',
      '  <button type="button" class="ct-cookie-consent__btn" data-cookie-save>Guardar selección</button>',
      '  <button type="button" class="ct-cookie-consent__btn ct-cookie-consent__btn--primary" data-cookie-accept>Permitir todas</button>',
      '</div>'
    ].join('');

    return container;
  }

  function openBanner(banner, consent) {
    var analyticsToggle = banner.querySelector('[data-cookie-analytics]');
    analyticsToggle.checked = !!(consent && consent.analytics);
    banner.hidden = false;
  }

  function closeBanner(banner) {
    banner.hidden = true;
  }

  function bindActions(banner) {
    var analyticsToggle = banner.querySelector('[data-cookie-analytics]');

    banner.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      var consent = writeConsent({ analytics: true });
      loadAnalyticsIfAllowed(consent);
      closeBanner(banner);
    });

    banner.querySelector('[data-cookie-reject]').addEventListener('click', function () {
      writeConsent({ analytics: false });
      closeBanner(banner);
    });

    banner.querySelector('[data-cookie-save]').addEventListener('click', function () {
      var consent = writeConsent({ analytics: analyticsToggle.checked });
      loadAnalyticsIfAllowed(consent);
      closeBanner(banner);
    });

    var settingsTriggers = document.querySelectorAll('[data-cookie-settings]');
    settingsTriggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        openBanner(banner, readConsent());
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = readConsent();
    var banner = createBanner();
    banner.hidden = true;
    document.body.appendChild(banner);

    bindActions(banner);

    if (consent) {
      loadAnalyticsIfAllowed(consent);
    } else {
      openBanner(banner, null);
    }
  });
})();
