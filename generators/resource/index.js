'use strict';
var yeoman = require('yeoman-generator');
var plural = require('plural')

module.exports = yeoman.generators.NamedBase.extend({
  writing: function() {
    var name = this.name.toLowerCase()
    this.props = {
      schema: name,
      model: name.charAt(0).toUpperCase() + name.slice(1),
      route: plural(name)
    }
    
    this.fs.copyTpl(
      this.templatePath('route.js'),
      this.destinationPath('routes/' + this.props.route + '.js'),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('route-test.js'),
      this.destinationPath('test/routes/' + this.props.route + '.js'),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('schema.js'),
      this.destinationPath('schemas/' + this.props.schema + '.js'),
      this.props
    )

    this.fs.copyTpl(
      this.templatePath('schema-test.js'),
      this.destinationPath('test/schemas/' + this.props.schema + '.js'),
      this.props
    )
  }
});
