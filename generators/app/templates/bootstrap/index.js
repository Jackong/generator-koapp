var config = require('config');
var code = require('api-code');
var jwt = require('koa-jwt');
var log = require('winston');
var input = require('koa-input');
var _ = require('underscore');
var ACL = require('koa-acl');
var Acl = require('acl')
var mongodb = require('mongodb');
var mongoose = require('koa-mongoose')
var util = require('util')
var version = require('koa-version-router')

var app = require('../app')

var bootstrap = module.exports = () => {
    bootstrap
    .log()
    .input()
    .catch()
    .header()
    .jwt()
    .mongoose()
    .route()
}

bootstrap.log = () => {
    var options = config.get('log')
    log.add(log.transports.DailyRotateFile, {
        name: 'default',
        datePattern: options.daily,
        filename: options.dir + options.name,
        level: options.level
    });

    log.add(log.transports.DailyRotateFile, {
        name: 'exception',
        datePattern: options.daily,
        filename: options.dir + options.name + '-exception',
        handleExceptions: true
    });
    return bootstrap
}

bootstrap.input = () => {
    input.onError(function(name) {
        var err = new input.InvalidInputError('Invalid input ' + name);
        err.status = 400;
        return err;
    })
    return bootstrap
}

bootstrap.route = () => {
    version(app, __dirname + '/routes')
    return bootstrap
}

bootstrap.mongoose = () => {
    app.use(mongoose(config.get('mongo')))
    return bootstrap
}

bootstrap.jwt = () => {
    app.use(
        jwt({
            debug: config.get('debug'),
            secret: config.get('keys.public')
        })
    )
    return bootstrap
}

bootstrap.header = () => {
    app.use(input.headers('x-app'))
    return bootstrap
}

bootstrap.catch = () => {
    app.use(function* (next) {
        try {
            yield next;
        } catch (err) {
            err.code = _.has(err, 'code') ? err.code : code.FAIL;
            err.message = err.message.trim();
            log.error('request error', {
                method: this.method,
                path: this.path,
                err: _.pick(err, ['message', 'status', 'code', 'stack'])
            });
            if (err.status) {
                this.status = err.status;
                this.body = {
                    code: err.code,
                    error: err.message
                };
                return;
            }
            throw err;
        }
    })
    return bootstrap
}
