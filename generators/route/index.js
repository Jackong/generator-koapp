'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
      var done = this.async();
      this.prompt([
          {
              type: 'input',
              name: 'name',
              message: 'route name'
          }
      ], function (props) {
          this.props = props
          done()
      }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('route.js'),
      this.destinationPath('routes/' + this.props.name + '.js'),
      this.props
    );
  }
});
