var test = require('node:test');
var assert = require('node:assert/strict');
var spawn = require('node:child_process').spawn;

var PORT = '5123';
var BASE_URL = 'http://127.0.0.1:' + PORT;
var serverProcess = null;

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

async function waitForServerReady() {
  var retries = 30;

  while (retries > 0) {
    try {
      var response = await fetch(BASE_URL + '/');
      if (response.status < 500) {
        return;
      }
    } catch (error) {
      // keep retrying until process is accepting connections
    }

    retries -= 1;
    await sleep(200);
  }

  throw new Error('Server did not start in time');
}

test.before(async function() {
  serverProcess = spawn('node', ['index.js'], {
    env: Object.assign({}, process.env, {
      PORT: PORT,
      APP_MODE: 'node'
    }),
    stdio: ['ignore', 'pipe', 'pipe']
  });

  serverProcess.stdout.on('data', function() {});
  serverProcess.stderr.on('data', function() {});

  await waitForServerReady();
});

test.after(function() {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
  }
});

test('GET /buscar?q=seo devuelve 200 con resultados', async function() {
  var response = await fetch(BASE_URL + '/buscar?q=seo');
  var body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /Resultados de búsqueda/);
  assert.match(body, /resultado\(s\) para <strong>"seo"<\/strong>/);
});

test('GET /buscar?s=seo devuelve 200 con resultados', async function() {
  var response = await fetch(BASE_URL + '/buscar?s=seo');
  var body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /Resultados de búsqueda/);
  assert.match(body, /resultado\(s\) para <strong>"seo"<\/strong>/);
});

test('GET /?s=seo redirige a /buscar?s=seo', async function() {
  var response = await fetch(BASE_URL + '/?s=seo', { redirect: 'manual' });

  assert.equal(response.status, 302);
  assert.equal(response.headers.get('location'), '/buscar?s=seo');
});
