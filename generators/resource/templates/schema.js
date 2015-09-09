var mongoose = require('koa-mongoose').mongoose;

var schema = module.exports = new mongoose.Schema({
    isValid: {type: Boolean, default: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

schema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
})

schema.pre('update', function (next) {
    this.updatedAt = new Date()
    next()
})
