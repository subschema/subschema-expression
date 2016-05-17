var path = require('path'), join = path.join.bind(path, __dirname);

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
            'test/*': ['webpack'] //preprocess with webpack and our sourcemap loader
        },
        reporters: ['dots'], //report results in this format
        webpack: {
            devtool: "#inline-source-map",
            stats: {
                colors: true,
                reasons: true
            },
            resolve: {
                alias: {
                    'expression': join('src/expression')
                }
            },
            module: {
                extensions: ['', '.jsx', '.js'],
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        include: [
                            join('src'),
                            join('test')
                        ]
                    }]

            }
        }
    });

};
