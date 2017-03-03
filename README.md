# generator-wallet-react [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> wallet react 

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wallet-react using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-wallet-react
```

Then generate your new project:

```bash
yo wallet-react
```

## How to use
### develop
`cd` into your project root direcotry and run the below command:
```
npm run server
```

### production
```
npm run build
```

## File Structure
```
project
│   README.md
│   .gitignore
│   .babelrc
│   webpack.config
│
└───App
│   └─── component
│   └─── reducer
│   └─── scene
│   └─── style
│   └─── util
│
└───release
    │   index.html
```

## License

MIT © [taxusyew]()


[npm-image]: https://badge.fury.io/js/generator-wallet-react.svg
[npm-url]: https://npmjs.org/package/generator-wallet-react
[travis-image]: https://travis-ci.org/taxusyew/generator-wallet-react.svg?branch=master
[travis-url]: https://travis-ci.org/taxusyew/generator-wallet-react
[daviddm-image]: https://david-dm.org/taxusyew/generator-wallet-react.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/taxusyew/generator-wallet-react
[coveralls-image]: https://coveralls.io/repos/taxusyew/generator-wallet-react/badge.svg
[coveralls-url]: https://coveralls.io/r/taxusyew/generator-wallet-react