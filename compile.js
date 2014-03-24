'use strict';


//
// Require some modules
//


var Mincer = require('mincer');


var environment = new Mincer.Environment();
environment.appendPath('assets/javascripts');
environment.appendPath('assets/stylesheets');
environment.appendPath('node_modules/jquery/tmp');
environment.appendPath('node_modules/highcharts-client/lib');
environment.appendPath('node_modules/socket.io-client/dist');
environment.appendPath('node_modules/foundation/scss');

var manifest = new Mincer.Manifest(environment, './public/assets');
manifest.compile(['*'], function(err, data) {
  console.info('Finished precompile:');
  console.dir(data);
});