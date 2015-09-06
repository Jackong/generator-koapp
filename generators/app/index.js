'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var util = require('util');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the doozie ' + chalk.red('Koapp') + ' generator!'
    ));

    this.prompt([
        {
          type    : 'input',
          name    : 'api',
          message : 'Your api',
          default : util.format('http://%s/api', this.appname)
      },
      {
         type: 'input',
         name: 'name',
         message: 'Your name'
     },
     {
         type: 'input',
         name: 'email',
         message: 'Your email'
     }
    ], function (answers) {
        this.props = answers
        done()
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
            appname: this.appname,
            api: this.props.api,
            name: this.props.name,
            email: this.props.email
        }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {
            appname: this.appname
        }
      );
    },

    bootstrap: function() {
        this.fs.copy(
            this.templatePath('app.js'),
            this.destinationPath('app.js')
        );

        this.fs.copy(
            this.templatePath('index.js'),
            this.destinationPath('index.js')
        );

        this.fs.copy(
            this.templatePath('bootstrap.js'),
            this.destinationPath('bootstrap.js')
        );

        this.fs.copy(
            this.templatePath('test'),
            this.destinationPath('test')
        );

        this.fs.copy(
            this.templatePath('config'),
            this.destinationPath('config')
        );

        this.fs.copy(
            this.templatePath('routes'),
            this.destinationPath('routes')
        );
    },

    docker: function() {
        this.fs.copyTpl(
            this.templatePath('docker-compose.yml'),
            this.destinationPath('docker-compose.yml'),
            {
                appname: this.appname
            }
        )
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    //this.installDependencies();
  }
});
