var opbeat = require('opbeat').start()

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(opbeat.middleware.express())

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//principales

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/herramientas', function(request, response) {
  response.render('pages/tools');
});

app.get('/experimentos', function(request, response) {
  response.render('pages/experiments');
});

//autores

app.get('/sucender', function(request, response) {
  response.render('authors/sucender');
});

//experimentos

app.get('/historia', function(request, response) {
  response.render('historia/historia');
});

app.get('/mapa-guerra-ucrania-rusia', function(request, response) {
  response.render('experiments/0003-mapa-guerra-ucrania-rusia');
});

app.get('/rusia-ataca-ucrania', function(request, response) {
  response.render('experiments/0002-rusia-ataca-ucrania');
});

app.get('/quantum-pacific-group', function(request, response) {
  response.render('experiments/0001-quantum-pacific-group');
});

app.get('/calculo-posicion-provisional-pruebas-selectivas-comunidad-de-madrid-medico-familia-atencion-primaria-2019', function(request, response) {
  response.render('experiments/0004-comunidad-de-madrid-pruebas-selectivas-medico-familia-atencion-primaria-2019-2022.ejs');
});

//tools

app.get('/contador-caracteres-seo', function(request, response) {
  response.render('tools/0002-contador-caracteres-seo');
});

app.get('/conversor-binario', function(request, response) {
  response.render('tools/0001-conversor-binario');
});

//articulos

app.get('/entornos-colaborativos', function(request, response) {
  response.render('news/0021-entornos-colaborativos');
});

app.get('/backlink-que-es-como-construir-red-de-enlaces', function(request, response) {
  response.render('news/0013-backlink-que-es-como-construir-red-de-enlaces');
});

app.get('/investigacion-palabras-clave', function(request, response) {
  response.render('news/0012-investigacion-palabras-clave');
});

app.get('/contenido-y-seo', function(request, response) {
  response.render('news/0011-contenido-y-seo');
});

app.get('/seo-on-page-aspectos-tecnicos', function(request, response) {
  response.render('news/0010-seo-on-page-aspectos-tecnicos');
});

app.get('/motores-de-busqueda', function(request, response) {
  response.render('news/0009-motores-de-busqueda');
});

app.get('/seo-que-es', function(request, response) {
  response.render('news/0008-seo-que-es');
});

app.get('/como-crear-una-pagina-web', function(request, response) {
  response.render('news/0007-como-crear-una-pagina-web');
});

app.get('/el-mundo-del-programador-web', function(request, response) {
  response.render('news/0006-el-mundo-del-programador-web');
});

app.get('/que-es-bluetooth', function(request, response) {
  response.render('news/0005-que-es-bluetooth');
});

app.get('/problemas-canon-digital-ecommerce', function(request, response) {
  response.render('news/0004-problemas-canon-digital-ecommerce');
});

app.get('/codigo-traductor-google-blog', function(request, response) {
  response.render('news/0002-codigo-traductor-google-blog');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


