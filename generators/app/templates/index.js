var app = require('./app');

require('./bootstrap')();

var log = require('winston');
log.debug('start app');
app.listen(process.env.PORT);
