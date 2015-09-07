'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: true,
      type: String,
      desc: 'schema name'
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('schema.js'),
      this.destinationPath('schemas/' + this.name + '.js')
    );
    this.fs.copyTpl(
      this.templatePath('test.js'),
      this.destinationPath('test/schemas/' + this.name + '.js'),
      {
          model: this.name.charAt(0).toUpperCase() + this.name.slice(1),
          name: this.name
      }
    );
  }
});
