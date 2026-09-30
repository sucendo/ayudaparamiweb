(function () {
  var MONTHS = {
    enero: 0,
    febrero: 1,
    february: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    setiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11
  };

  function parseDate(text) {
    if (!text) return new Date(0);
    var normalized = text.trim().toLowerCase();
    var match = normalized.match(/(\d{1,2})\s+de\s+([a-záéíóú]+)\s+de\s+(\d{4})/i);

    if (!match) {
      var fallback = Date.parse(normalized);
      return Number.isNaN(fallback) ? new Date(0) : new Date(fallback);
    }

    var day = Number(match[1]);
    var monthName = match[2]
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    var year = Number(match[3]);
    var month = MONTHS[monthName];

    if (typeof month !== 'number') return new Date(0);
    return new Date(year, month, day);
  }

  function reorderArchiveGrid(container) {
    var articles = Array.prototype.slice.call(container.querySelectorAll('.ct-box'));
    if (!articles.length) return;

    articles.sort(function (a, b) {
      var aDate = parseDate((a.querySelector('time') || {}).textContent || '');
      var bDate = parseDate((b.querySelector('time') || {}).textContent || '');
      return bDate.getTime() - aDate.getTime();
    });

    container.innerHTML = '';

    for (var i = 0; i < articles.length; i += 2) {
      var row = document.createElement('div');
      row.className = 'ct-row';
      row.appendChild(articles[i]);
      if (articles[i + 1]) {
        row.appendChild(articles[i + 1]);
      }
      container.appendChild(row);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('.ct-main-archive .ct-archive-container');
    if (!container) return;
    reorderArchiveGrid(container);
  });
})();
