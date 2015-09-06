var app = require('./app');

require('./bootstrap')(require('./package.json'), app);

var log = require('winston');
log.debug('start app');
app.listen(process.env.PORT);
