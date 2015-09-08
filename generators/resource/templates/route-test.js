var request = require('supertest-koa-agent');
var code = require('api-code');
var app = require('../../app');
var <%= model %> = mongoose.model('<%= model %>', require('../../schemas/<%= schema %>'))


describe('<%= route %> route', () => {

    describe('POST /api/<%= route %>', () => {

    })

    describe('PUT /api/<%= route %>/:<%= route %>', () => {

    })

    describe('PATCH /api/<%= route %>/:<%= route %>', () => {

    })

    describe('GET /api/<%= route %>', () => {

    })

    describe('GET /api/<%= route %>/:<%= route %>', () => {

    })

    describe('DELETE /api/<%= route %>/:<%= route %>', () => {

    })
})
