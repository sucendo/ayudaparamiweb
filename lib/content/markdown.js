function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/!\[(.*?)\]\((.+?)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function markdownToHtml(markdown) {
  const lines = String(markdown || '').split(/\r?\n/);
  const html = [];
  let inUnorderedList = false;
  let inOrderedList = false;
  let inCode = false;
  let codeLanguage = '';

  const closeLists = () => {
    if (inUnorderedList) {
      html.push('</ul>');
      inUnorderedList = false;
    }
    if (inOrderedList) {
      html.push('</ol>');
      inOrderedList = false;
    }
  };

  lines.forEach((line) => {
    if (line.startsWith('```')) {
      closeLists();
      if (!inCode) {
        inCode = true;
        codeLanguage = line.replace(/^```/, '').trim();
        const langClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : '';
        html.push(`<pre><code${langClass}>`);
      } else {
        inCode = false;
        codeLanguage = '';
        html.push('</code></pre>');
      }
      return;
    }

    if (inCode) {
      html.push(escapeHtml(line));
      return;
    }

    if (!line.trim()) {
      closeLists();
      return;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      closeLists();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      return;
    }

    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      closeLists();
      html.push(`<blockquote><p>${renderInline(quote[1])}</p></blockquote>`);
      return;
    }

    const unorderedListItem = line.match(/^[-*]\s+(.+)$/);
    if (unorderedListItem) {
      if (!inUnorderedList) {
        if (inOrderedList) {
          html.push('</ol>');
          inOrderedList = false;
        }
        html.push('<ul>');
        inUnorderedList = true;
      }
      html.push(`<li>${renderInline(unorderedListItem[1])}</li>`);
      return;
    }

    const orderedListItem = line.match(/^\d+[.)]\s+(.+)$/);
    if (orderedListItem) {
      if (!inOrderedList) {
        if (inUnorderedList) {
          html.push('</ul>');
          inUnorderedList = false;
        }
        html.push('<ol>');
        inOrderedList = true;
      }
      html.push(`<li>${renderInline(orderedListItem[1])}</li>`);
      return;
    }

    if (/^<[^>]+>/.test(line.trim())) {
      closeLists();
      html.push(line);
      return;
    }

    closeLists();
    html.push(`<p>${renderInline(line)}</p>`);
  });

  closeLists();
  if (inCode) {
    html.push('</code></pre>');
  }

  return html.join('\n');
}

module.exports = { markdownToHtml };
