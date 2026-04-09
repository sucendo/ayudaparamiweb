var opbeat = require('opbeat').start();

var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();

var appMode = process.env.APP_MODE || 'node';
app.set('port', (process.env.PORT || 5000));

if (appMode === 'static') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.listen(app.get('port'), function() {
    console.log('Static mode running on port', app.get('port'));
  });
} else {
  app.use(express.static(__dirname + '/public'));
  app.use(opbeat.middleware.express());

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  routes.forEach(function(route) {
    app.get(route.path, function(request, response) {
      response.render(route.view);
    });
  });

  app.listen(app.get('port'), function() {
    console.log('Node mode running on port', app.get('port'));
  });
}
