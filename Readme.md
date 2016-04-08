# Scaffold

Nothing in here doesn't have a reason to be.

## Features
* `make` start a livereload server for example pages with watch for rebuild
* `make test` start a webpack-dev-server with mocha-loader for live testing
* `make test-karma` let karma run tests in your browser
* `make test-coveralls` let karma run tests and send coverage results to [coveralls.io](http://coveralls.io)
* `make doc` make example folder as your gh-pages branch and push to github

## For babel users

```
{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional[]=runtime' }
```
Add this to loaders in your webpack.config.js and `npm i babel-loader -D`

This would enable some es7 features, most importantly `async` `await`

**in babel 6, this not works any more**

## FAQ

**Q**: Why not build a tool?

**A**: Because the config files much easier to be customized, and you don't need to learn unnecessary thing, and it's also important to get understand how they works.  Beside, a combined tool would probably do something that you're not expected and make you confused.

**Q**: Why not use webpack-dev-server for develop example?

**A**: webpack-dev-server with hot module replacement is quite cool, but using simple livereload server is much more reliable.  webpack-dev-server have no support for serving files, so we start one at port 3000 by ourselves, the build performance is good enough for simple library, it don't need to be complicated.

**Q**: Why use Firefox for karma?

**A**: Because mostly I use Chrome for develop, by use Firefox I can got at least 2 browsers covered, and using Firefox I can see what happening in the UI (compare to phantomjs), sometimes it's quite necessary for some UI test.  You can add other browsers easily by install plugins at https://npmjs.org/browse/keyword/karma-launcher and then change karma.conf.js.

## Usage

``` bash
wget https://github.com/chemzqm/scaffold/tarball/master
tar -zxf master
rm master
```

## License

WTFPL
