'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var util = require('util');
var shell = require('shelljs')
var exec = require('child_process').exec

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the doozie ' + chalk.red('Koapp') + ' generator!'
    ));

    this.prompt(
        {
          type    : 'input',
          name    : 'domain',
          message : 'Your api domain',
          default : this.appname
      }, function (props) {
        this.props = props
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
            domain: this.props.domain,
            name: this.user.git.name(),
            email: this.user.git.email()
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
            this.templatePath('bootstrap'),
            this.destinationPath('bootstrap')
        );

        this.fs.copy(
            this.templatePath('test'),
            this.destinationPath('test')
        );

        shell.mkdir(this.destinationPath('keys'))
        shell.exec('openssl genrsa -out keys/private.pem 2048', { silent: true }).output.trim()
        shell.exec('openssl rsa -in keys/private.pem -pubout -out keys/public.pem', {silent: true}).output.trim()

        this.fs.copyTpl(
            this.templatePath('config'),
            this.destinationPath('config'),
            {
                appname: this.appname,
                domain: this.props.domain
            }
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
    this.installDependencies();
  }
});
