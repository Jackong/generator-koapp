var log = require('winston')
var input = require('koa-input')
var code = require('api-code')

var router = module.exports = require('koa-router')({
    prefix: '/api/<%= route %>'
})

router.post('/',
    function* (next) {

    }
)

router.put('/:<%= route %>',
    function* (next) {

    }
)

router.patch('/:<%= route %>',
    function* (next) {

    }
)

router.get('/',
    function* (next) {

    }
)

router.get('/:<%= route %>',
    function* (next) {

    }
)

router.delete('/:<%= route %>',
    function* (next) {

    }
)
