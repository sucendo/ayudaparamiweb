(function() {
  function hashString(value) {
    var hash = 2166136261;
    for (var i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
  }

  function seededUnit(seed, salt) {
    var mixed = hashString(seed + ':' + salt);
    return (mixed % 10000) / 10000;
  }

  function parseDateFromDocument() {
    var publishedMeta = document.querySelector('meta[itemprop="datePublished"]');
    if (publishedMeta && /^\d{4}-\d{2}-\d{2}/.test(publishedMeta.content || '')) {
      return new Date(publishedMeta.content + 'T00:00:00Z');
    }

    var timeNode = document.querySelector('time[itemprop="datePublished"], time');
    if (timeNode) {
      var isoDate = (timeNode.getAttribute('datetime') || '').match(/\d{4}-\d{2}-\d{2}/);
      if (isoDate) {
        return new Date(isoDate[0] + 'T00:00:00Z');
      }

      var textDate = (timeNode.textContent || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (textDate) {
        var day = textDate[1].padStart(2, '0');
        var month = textDate[2].padStart(2, '0');
        return new Date(textDate[3] + '-' + month + '-' + day + 'T00:00:00Z');
      }
    }

    return null;
  }

  function getVoteProjection(seed, publishedDate) {
    var now = new Date();
    var daysSincePublication = Math.max(0, Math.floor((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - publishedDate.getTime()) / 86400000));

    var startDelay = 1 + Math.floor(seededUnit(seed, 'start-delay') * 2);
    var activeDays = Math.max(0, daysSincePublication - startDelay);

    var phase1Days = Math.min(activeDays, 21);
    var phase2Days = Math.min(Math.max(activeDays - 21, 0), 69);
    var phase3Days = Math.max(activeDays - 90, 0);

    var phase1Rate = 0.9 + (seededUnit(seed, 'phase1-rate') * 1.1);
    var phase2Rate = 0.04 + (seededUnit(seed, 'phase2-rate') * 0.2);
    var isolatedInterval = 50 + Math.floor(seededUnit(seed, 'phase3-interval') * 70);

    var votes = Math.floor(phase1Days * phase1Rate) + Math.floor(phase2Days * phase2Rate);
    votes += Math.floor(phase3Days / isolatedInterval);

    if (activeDays > 0 && votes === 0) {
      votes = 1;
    }

    var targetBase = 4.4 + (seededUnit(seed, 'target-base') * 0.45);
    var confidenceBoost = Math.min(0.25, Math.log10(votes + 1) * 0.18);
    var average = Math.min(5, targetBase + confidenceBoost);
    average = Math.max(4.4, average);

    return {
      votes: votes,
      average: Number(average.toFixed(1))
    };
  }

  function updateAggregateNode(aggregateNode, projection) {
    var strongNodes = aggregateNode.querySelectorAll('strong');
    if (strongNodes.length >= 2) {
      strongNodes[0].textContent = String(projection.votes);
      strongNodes[1].textContent = String(projection.average);
    }

    var ratingValueMeta = aggregateNode.querySelector('[itemprop="ratingValue"]');
    var ratingCountMeta = aggregateNode.querySelector('[itemprop="ratingCount"]');

    if (ratingValueMeta) {
      ratingValueMeta.setAttribute('content', String(projection.average));
    }

    if (ratingCountMeta) {
      ratingCountMeta.setAttribute('content', String(projection.votes));
    }
  }

  function applyAutomaticRatings() {
    var publishedDate = parseDateFromDocument();
    if (!publishedDate || Number.isNaN(publishedDate.getTime())) {
      return;
    }

    var slug = window.location.pathname.replace(/\/+$/, '') || '/';
    var seed = slug + '|' + publishedDate.toISOString().slice(0, 10);

    var projection = getVoteProjection(seed, publishedDate);
    var aggregateNodes = document.querySelectorAll('[itemprop="aggregateRating"]');

    for (var i = 0; i < aggregateNodes.length; i += 1) {
      updateAggregateNode(aggregateNodes[i], projection);
    }
  }

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyAutomaticRatings);
    } else {
      applyAutomaticRatings();
    }
  }
})();
