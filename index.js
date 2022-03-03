var opbeat = require('opbeat').start()

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/experimentos', function(request, response) {
  response.render('pages/experiments');
});

app.get('/rusia-ataca-ucrania', function(request, response) {
  response.render('experiments/2-rusia-ataca-ucrania');
});

app.get('/mapa-guerra-ucrania-rusia', function(request, response) {
  response.render('experiments/3-mapa-guerra-ucrania-rusia');
});

app.get('/entornos-colaborativos', function(request, response) {
  response.render('news/21-entornos-colaborativos');
});

app.get('/backlink-que-es-como-construir-red-de-enlaces', function(request, response) {
  response.render('news/13-backlink-que-es-como-construir-red-de-enlaces');
});

app.get('/investigacion-palabras-clave', function(request, response) {
  response.render('news/12-investigacion-palabras-clave');
});

app.get('/contenido-y-seo', function(request, response) {
  response.render('news/11-contenido-y-seo');
});

app.get('/seo-on-page-aspectos-tecnicos', function(request, response) {
  response.render('news/10-seo-on-page-aspectos-tecnicos');
});

app.get('/motores-de-busqueda', function(request, response) {
  response.render('news/9-motores-de-busqueda');
});

app.get('/seo-que-es', function(request, response) {
  response.render('news/8-seo-que-es');
});

app.get('/como-crear-una-pagina-web', function(request, response) {
  response.render('news/7-como-crear-una-pagina-web');
});

app.get('/el-mundo-del-programador-web', function(request, response) {
  response.render('news/6-el-mundo-del-programador-web');
});

app.get('/que-es-bluetooth', function(request, response) {
  response.render('news/5-que-es-bluetooth');
});

app.get('/problemas-canon-digital-ecommerce', function(request, response) {
  response.render('news/4-problemas-canon-digital-ecommerce');
});

app.get('/quantum-pacific-group', function(request, response) {
  response.render('news/3-quantum-pacific-group');
});

app.get('/codigo-traductor-google-blog', function(request, response) {
  response.render('news/2-codigo-traductor-google-blog');
});

app.get('/contador-caracteres-seo', function(request, response) {
  response.render('news/1-contador-caracteres-seo');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


