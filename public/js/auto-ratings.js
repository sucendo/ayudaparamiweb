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

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
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

  function getVoteCount(seed, publishedDate) {
    var now = new Date();
    var daysSincePublication = Math.max(
      0,
      Math.floor(
        (Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - publishedDate.getTime()) / 86400000
      )
    );

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

    return Math.max(0, votes);
  }

  function getSimulatedVote(seed, index) {
    // Calidad base del artículo: entre 3.8 y 5.0
    var articleTarget = 3.8 + seededUnit(seed, 'article-target') * 1.2;

    // Los primeros votos son más volátiles; luego se estabiliza
    var volatility = index < 3 ? 0.9 : index < 10 ? 0.65 : 0.45;
    var noise = (seededUnit(seed, 'vote:' + index) - 0.5) * volatility * 2;

    var raw = clamp(articleTarget + noise, 3, 5);

    // Simulamos votos por estrellas enteras
    return Math.round(raw);
  }

  function normalizeAverageRange(votesArray) {
    if (!votesArray.length) {
      return 0;
    }

    var total = votesArray.reduce(function(sum, vote) {
      return sum + vote;
    }, 0);

    var average = total / votesArray.length;

    // Si cae por debajo de 3.8, corregimos suavemente algunos votos bajos
    if (average < 3.8) {
      for (var i = 0; i < votesArray.length && average < 3.8; i += 1) {
        if (votesArray[i] < 5) {
          var increment = (5 - votesArray[i] >= 2) ? 2 : 1;
          votesArray[i] = Math.min(5, votesArray[i] + increment);
          total += increment;
          average = total / votesArray.length;
        }
      }
    }

    average = clamp(average, 3.8, 5.0);

    return Number(average.toFixed(1));
  }

  function getVoteProjection(seed, publishedDate) {
    var votes = getVoteCount(seed, publishedDate);

    if (votes === 0) {
      return {
        votes: 0,
        average: 0
      };
    }

    var votesArray = [];
    for (var i = 0; i < votes; i += 1) {
      votesArray.push(getSimulatedVote(seed, i));
    }

    return {
      votes: votes,
      average: normalizeAverageRange(votesArray)
    };
  }

  function updateRatingsNode(ratingsNode, projection) {
    var sublineNode = ratingsNode.closest('.ct-subline__time');
    var averageDisplay = Number(projection.average || 0).toFixed(1);

    if (sublineNode) {
      var strongNodes = sublineNode.querySelectorAll('strong');
      if (strongNodes.length >= 2) {
        strongNodes[0].textContent = String(projection.votes);
        strongNodes[1].textContent = averageDisplay;
      }
    }

    var ratingValueMeta = ratingsNode.querySelector('[data-rating-value], [itemprop="ratingValue"]');
    var ratingCountMeta = ratingsNode.querySelector('[data-rating-count], [itemprop="ratingCount"]');

    if (ratingValueMeta) {
      ratingValueMeta.setAttribute('content', averageDisplay);
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
    var ratingsNodes = document.querySelectorAll('.post-ratings, [itemprop="aggregateRating"]');

    for (var i = 0; i < ratingsNodes.length; i += 1) {
      updateRatingsNode(ratingsNodes[i], projection);
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
