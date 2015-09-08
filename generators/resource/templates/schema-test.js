var mongoose = require('koa-mongoose').mongoose
var <%= model %> = mongoose.model('<%= model %>', require('../../schemas/<%= schema %>'))

describe('<%= schema %> model', () => {

})
