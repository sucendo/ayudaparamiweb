(function () {
  var CONSENT_KEY = 'apmw_privacy_preferences_v2';
  var LEGACY_KEY = 'apmw_cookie_consent_v1';
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
      necessary: true,
      analytics: !!consent.analytics,
      updatedAt: nowIso()
    };

    localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
    localStorage.removeItem(LEGACY_KEY);
    return payload;
  }

  function applyConsentMode(consent) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };

    var analyticsGranted = !!(consent && consent.analytics);

    window.gtag('consent', 'update', {
      analytics_storage: analyticsGranted ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      personalization_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });

    document.documentElement.setAttribute(
      'data-analytics-consent',
      analyticsGranted ? 'granted' : 'denied'
    );
  }

  function createBanner() {
    var container = document.createElement('section');
    container.className = 'ct-cookie-consent';
    container.setAttribute('role', 'dialog');
    container.setAttribute('aria-labelledby', 'ct-cookie-consent-title');
    container.setAttribute('aria-describedby', 'ct-cookie-consent-description');

    container.innerHTML = [
      '<div class="ct-cookie-consent__head">',
      '  <h2 class="ct-cookie-consent__title" id="ct-cookie-consent-title">Privacidad y cookies</h2>',
      '  <p id="ct-cookie-consent-description">Guardamos tu elección de privacidad. La analítica es opcional y permanece desactivada hasta que la aceptes.</p>',
      '</div>',
      '<div class="ct-cookie-consent__toggles">',
      '  <div class="ct-cookie-consent__toggle ct-cookie-consent__toggle--fixed">',
      '    <span><strong>Necesarias</strong><small>Recordar tus preferencias y funciones básicas.</small></span>',
      '    <span class="ct-cookie-consent__status">Siempre activas</span>',
      '  </div>',
      '  <label class="ct-cookie-consent__toggle">',
      '    <span><strong>Analítica</strong><small>Medición de audiencia para mejorar contenidos.</small></span>',
      '    <input type="checkbox" data-cookie-analytics aria-label="Permitir analítica">',
      '  </label>',
      '</div>',
      '<p class="ct-cookie-consent__more"><a href="/privacidad">Ver detalles de privacidad y cookies</a></p>',
      '<div class="ct-cookie-consent__actions">',
      '  <button type="button" class="ct-cookie-consent__btn" data-cookie-reject>Solo necesarias</button>',
      '  <button type="button" class="ct-cookie-consent__btn" data-cookie-save>Guardar preferencias</button>',
      '  <button type="button" class="ct-cookie-consent__btn ct-cookie-consent__btn--primary" data-cookie-accept>Aceptar analítica</button>',
      '</div>'
    ].join('');

    return container;
  }

  function openBanner(banner, consent) {
    var analyticsToggle = banner.querySelector('[data-cookie-analytics]');
    analyticsToggle.checked = !!(consent && consent.analytics);
    banner.hidden = false;
    banner.classList.add('is-open');
  }

  function closeBanner(banner) {
    banner.hidden = true;
    banner.classList.remove('is-open');
  }

  function bindActions(banner) {
    var analyticsToggle = banner.querySelector('[data-cookie-analytics]');

    banner.querySelector('[data-cookie-accept]').addEventListener('click', function () {
      var consent = writeConsent({ analytics: true });
      applyConsentMode(consent);
      closeBanner(banner);
    });

    banner.querySelector('[data-cookie-reject]').addEventListener('click', function () {
      var consent = writeConsent({ analytics: false });
      applyConsentMode(consent);
      closeBanner(banner);
    });

    banner.querySelector('[data-cookie-save]').addEventListener('click', function () {
      var consent = writeConsent({ analytics: analyticsToggle.checked });
      applyConsentMode(consent);
      closeBanner(banner);
    });

    document.querySelectorAll('[data-cookie-settings]').forEach(function (trigger) {
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
      applyConsentMode(consent);
    } else {
      applyConsentMode({ analytics: false });
      openBanner(banner, null);
    }
  });
})();
