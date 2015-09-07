'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'route name'
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('route.js'),
      this.destinationPath('routes/' + this.name + '.js'), {
        name: this.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/routes/' + this.name + '.js'), {
        name: this.name
      }
    )
  }
});
