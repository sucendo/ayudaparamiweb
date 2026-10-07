const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ARTICLES = path.join(ROOT, 'content', 'articles');

function articleSources() {
  return fs.readdirSync(ARTICLES)
    .filter((name) => name.endsWith('.md'))
    .sort()
    .map((name) => ({
      name,
      source: fs.readFileSync(path.join(ARTICLES, name), 'utf8')
    }));
}

test('todos los bloques Markdown de código declaran lenguaje y usan triple acento grave', () => {
  const problems = [];

  articleSources().forEach(({ name, source }) => {
    const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');
    const lines = body.split(/\r?\n/);
    let open = false;
    let fence = '';

    lines.forEach((line, index) => {
      const match = line.match(/^(```|~~~)(.*)$/);
      if (!match) return;

      if (!open) {
        open = true;
        fence = match[1];
        const language = match[2].trim();

        if (fence !== '```') {
          problems.push(`${name}:${index + 1} usa ~~~`);
        }
        if (!language) {
          problems.push(`${name}:${index + 1} no declara lenguaje`);
        }
      } else if (match[1] === fence) {
        open = false;
        fence = '';
      }
    });
  });

  assert.deepEqual(problems, []);
});

test('los pre antiguos que quedan declaran language-* para Prism', () => {
  const problems = [];

  articleSources().forEach(({ name, source }) => {
    const body = source.replace(/^---\n[\s\S]*?\n---\n/, '');

    for (const match of body.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi)) {
      if (!/<code\b[^>]*class=["'][^"']*language-[^"']*["']/i.test(match[1])) {
        problems.push(name);
      }
    }
  });

  assert.deepEqual([...new Set(problems)], []);
});

test('Prism incluye las gramáticas adicionales usadas por los artículos', () => {
  const prism = fs.readFileSync(path.join(ROOT, 'public', 'js', 'prism.js'), 'utf8');

  assert.match(prism, /languages\.python/);
  assert.match(prism, /languages\.bash/);
  assert.match(prism, /languages\.http/);
  assert.match(prism, /languages\.apacheconf/);
  assert.match(prism, /languages\.php/);
  assert.match(prism, /languages\.smarty/);
  assert.match(prism, /Prism\.languages\.apache = Prism\.languages\.apacheconf/);
});

test('los artículos corregidos distinguen código real de listas editoriales', () => {
  const programming = fs.readFileSync(path.join(ARTICLES, 'conceptos-basicos-programacion.md'), 'utf8');
  const git = fs.readFileSync(path.join(ARTICLES, 'git-y-github-para-principiantes.md'), 'utf8');
  const backlinks = fs.readFileSync(path.join(ARTICLES, 'backlink-que-es-como-construir-red-de-enlaces.md'), 'utf8');
  const canon = fs.readFileSync(path.join(ARTICLES, 'problemas-canon-digital-ecommerce.md'), 'utf8');

  assert.match(programming, /```javascript/);
  assert.match(programming, /```bash/);
  assert.match(git, /```bash/);
  assert.match(backlinks, /```html\n<a href=/);
  assert.match(canon, /```php/);
  assert.match(canon, /```smarty/);
});
