var path = require('path')
var fs = require('fs')
var pkg = require('../package.json')

const APP_PATH = path.join(__dirname, '..');

var config = module.exports = {
    debug: true,
    log: {
        name: pkg.name,
        dir: '/var/log/app/<%= appname %>/',
        level: 'debug',
        daily: '.yyyy-MM-dd'
    },
    mongo: {
        user: '',
        pass: '',
        host: 'mongo.<%= domain %>',
        port: 27017,
        database: '<%= appname %>',
        db: {
            native_parser: true
        },
        server: {
            poolSize: 5
        }
    },
    acl: {
      host: 'acl.mongo.<%= domain %>',
      port: 27017
    },
    keys: {
        private: fs.readFileSync(APP_PATH + '/keys/private.pem').toString(),
        public: fs.readFileSync(APP_PATH + '/keys/public.pem').toString(),
        algorithm: 'RS256'
    }
}
