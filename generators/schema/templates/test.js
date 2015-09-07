var mongoose = require('koa-mongoose').mongoose
var <%= model %> = mongoose.model('<%= model %>', require('../../schemas/<%= name %>'))

describe('<%= name %> model', () => {

})
