var webpackConfig = require('./webpack.config.js'), webpack = require('webpack');

webpackConfig.devtool = "#inline-source-map";

if (!webpackConfig.plugins) {
    webpackConfig.plugins = [];
}
webpackConfig.target = 'web';

webpackConfig.resolve.alias['subschema-expression'] = '../src/expression';

webpackConfig.plugins.unshift(new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}));

module.exports = function (config) {
    config.set({
        browserNoActivityTimeout: 20000,
        browsers: ['Chrome'], //run in Chrome
        singleRun: true, //just run once by default
        frameworks: ['mocha'], //use the mocha test framework
        files: [
            'test/index.js', //just load this file,
            {
                pattern: '**/*.js.map',
                included: false
            }
        ],
        preprocessors: {
            'test/*': ['webpack', 'sourcemap'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots'], //report results in this format
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: {
                colors: true
            }
        }
    });

};
