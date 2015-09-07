var config = require('config')
var middleware = require('koa-mongoose')
middleware.open(middleware.mongoose.connection, config.get('mongo'))
require('../bootstrap')();
var chai = require('chai');
chai.use(require('chai-as-promised'));
global.expect = chai.expect;
