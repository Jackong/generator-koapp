var app = module.exports = require('koa')();

app.use(require('koa-logger')());
app.use(require('koa-response-time')());
app.use(require('koa-bodyparser')());
