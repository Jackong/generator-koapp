var log = require('winston')
var input = require('koa-input')
var code = require('api-code')

var router = module.exports = require('koa-router')({
    prefix: '/api/<%= name %>'
})

router.post('/',
    function* (next) {

    }
)

router.put('/:<%= name %>',
    function* (next) {

    }
)

router.patch('/:<%= name %>',
    function* (next) {

    }
)

router.get('/',
    function* (next) {

    }
)

router.get('/:<%= name %>',
    function* (next) {

    }
)

router.delete('/:<%= name %>',
    function* (next) {

    }
)
