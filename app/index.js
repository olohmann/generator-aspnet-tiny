'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('underscore.string');
var generators = yeoman.generators;
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
    this.mkdirp = require('mkdirp');
  },

  constructor: function() {
    // arguments and options should be
    // defined in the constructor.
    generators.Base.apply(this, arguments);

    this.argument('appName', {
      type: String,
      required: false
    });

    this.rootNamespace = _.capitalize(_.camelize(_.humanize(this.appName)));
    this.appName = _.camelize(_.slugify(_.humanize(this.appName)));
    this.wwwRoot = 'wwwroot';
  },

  welcome: function() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stunning ' + chalk.red('aspnet-tiny') +
      ' generator! This is an extremly simple template for' +
      ' ASP.NET 5 applications with a Web API and static files.'));
  },

  prompting: function() {
    // If we passed in the app name, don't prompt the user for it
    if (this.appName) {
      return;
    }

    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What would you like to name the app?',
      default: this.appName || path.basename(process.cwd())
    }];

    this.prompt(prompts, function(answers) {
      this.appName = answers.appName;
      this.appName = this.appName || 'WebApp';
      this.rootNamespace = _.capitalize(_.camelize(_.humanize(this.appName)));
      this.appName = (_.slugify(this.appName));
      done();
    }.bind(this));
  },

  displayName: function() {
    this.log('Creating ' + this.appName + ' app based on aspnet-tiny.');
  },

  writing: {
    directories: function() {
      var that = this;

      this.mkdirp(path.join(that.appName, that.wwwRoot));
      this.mkdirp(path.join(that.appName, 'Controllers'));
    },

    files: function() {
      var that = this;

      var ctx = {
        wwwRoot: that.wwwRoot,
        appName: that.appName,
        rootNamespace: that.rootNamespace
      };

      var templateCmds = [
        ['_editorconfig', '.editorconfig'],
        ['_project.json', 'project.json'],
        ['_Startup.cs', 'Startup.cs'],
        ['_index.html', path.join(that.wwwRoot, 'index.html')],
        ['_ValuesController.cs', path.join('Controllers', 'ValuesController.cs')],
        ['favicon.ico', path.join(that.wwwRoot, 'favicon.ico')]
      ];

      templateCmds.forEach(function(pair) {
        that.fs.copyTpl(
          that.templatePath(pair[0]),
          that.destinationPath(path.join(ctx.appName, pair[1])),
          ctx
        );
      });
    }
  },

  install: function() {
    var that = this;
    that.log('Running ' + chalk.yellow.bold('dnu restore') +
      '. If this fails, run the commands ' +
      'yourself. dnu must be configured. See https://github.com/aspnet/dnvm for details.');

    var dnuRestore = that.spawnCommand('dnu', ['restore', that.appName + '/']);
    dnuRestore.on('close', function(code) {
      that.log('dnu completed.')
    });
  }
});
