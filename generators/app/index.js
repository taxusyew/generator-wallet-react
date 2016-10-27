'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');
var extend = require('deep-extend');
var _ = require('lodash');


module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the bedazzling ' + chalk.red('generator-wallet-react') + ' generator!'
    ));

    var prompts = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Please input project name (wallet-react):',
      default: 'wallet-react'
    },
    {
      type: 'input',
      name: 'projectDesc',
      message: 'Please input project description:'
    },
    {
      type: 'input',
      name: 'projectAuthor',
      message: 'Author (wallet):',
      default: 'wallet'
    },
    {
      type: 'list',
      name: 'projectLicense',
      message: 'Please choose license:',
      choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
    }

    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  defaults: function () {

    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

  },

  writing: function () {
    
    // --------------
    // 创建 package.json
    // --------------
    var pkg = {};
    
    pkg.keywords = pkg.keywords || [];
    pkg.name = this.props.projectName;
    pkg.description = this.props.projectDesc;
    pkg.author = this.props.projectAuthor;
    pkg.license = this.props.projectLicense;

    extend(pkg, {
        "main": "index.js",
        "scripts": {
            "dev": "cross-env NODE_ENV=dev webpack-dev-server --inline --progress --colors --content-base release/ --history-api-fallback",
            "mock": "json-server --watch mock/apis.json --port 8008",
            "start": "npm run mock && npm run dev",
            "build": "cross-env NODE_ENV=production webpack -p"
        },
        "dependencies": {
            "autoprefixer": "^6.4.1",
            "babel-eslint": "^6.1.2",
            "babel-plugin-react-transform": "^2.0.2",
            "babel-preset-stage-0": "^6.5.0",
            "classnames": "^2.2.5",
            "compression": "^1.6.1",
            "cross-env": "^3.1.3",
            "express": "^4.13.4",
            "extract-text-webpack-plugin": "^1.0.1",
            "if-env": "^1.0.0",
            "json-server": "^0.8.22",
            "postcss-loader": "^0.13.0",
            "react": "^0.14.7",
            "react-dom": "^0.14.7",
            "react-progressbar.js": "^0.2.0",
            "react-redux": "^4.4.5",
            "react-router": "^2.0.0",
            "react-tap-event-plugin": "^1.0.0",
            "react-tappable": "^0.8.4",
            "react-transform-catch-errors": "^1.0.2",
            "react-transform-hmr": "^1.0.4",
            "redbox-react": "^1.3.0",
            "webpack-dashboard": "^0.1.8"
        },
        "devDependencies": {
            "babel-core": "^6.5.1",
            "babel-loader": "^6.2.2",
            "babel-preset-es2015": "^6.5.0",
            "babel-preset-react": "^6.5.0",
            "css-loader": "^0.23.1",
            "http-server": "^0.8.5",
            "less": "^2.7.1",
            "less-loader": "^2.2.3",
            "redux": "^3.5.2",
            "style-loader": "^0.13.1",
            "webpack": "^1.12.13",
            "webpack-dev-server": "^1.14.1"
        }

    });
    
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);


    // --------------
    // 创建文件夹
    // --------------
    mkdirp('app/component');
    mkdirp('app/reducer');
    mkdirp('app/scene');
    mkdirp('app/style');
    mkdirp('app/util');
    mkdirp('release');
    mkdirp('mock');

    // --------------
    // 复制文件
    // --------------
    var compiled = _.template(this.fs.read(this.templatePath('release/index.html')));
    this.fs.write(this.destinationPath('release/index.html'), compiled({
      htmltitle: this.props.projectName
    }));

    compiled = _.template(this.fs.read(this.templatePath('README.md')));
    this.fs.write(this.destinationPath('README.md'), compiled({
      project_name: this.props.projectName,
      project_license: this.props.projectLicense,
      project_author: this.props.projectAuthor
    }));

    // setup app folder
    this.fs.copy(
      this.templatePath('app/component/App.js'),
      this.destinationPath('app/component/App.js')
    );

    this.fs.copy(
      this.templatePath('app/scene/index.js'),
      this.destinationPath('app/scene/index.js')
    );

    this.fs.copy(
      this.templatePath('app/style/reset.css'),
      this.destinationPath('app/style/reset.css')
    );

    // setup mock folder
    this.fs.copy(
      this.templatePath('mock/apis.json'),
      this.destinationPath('mock/apis.json')
    );

    this.fs.copy(
      this.templatePath('mock/urlconfig.js'),
      this.destinationPath('mock/urlconfig.js')
    );

    // setup other files
    this.fs.copy(
      this.templatePath('gitignore.txt'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );


    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

  },

  install: function () {
    this.installDependencies();
  }
});
