"use strict";

var path = require('path'), join = path.join.bind(path, __dirname);
var config = {
    devServer: {
        noInfo: true,
        hot: true,
        inline: true,
        contentBase: join('public'),
        publicPath: '/',
        port: 8082
    },
    resolve: {
        extensions: ['', '.jsx', '.js'],
        alias: {}
    },
    stats: {
        colors: true,
        reasons: true,
        info: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                //do this to prevent babel from translating everything.
                loader: 'babel',
                include: [
                    join('src'),
                    join('test')
                ]
            }
        ]

    }
};

module.exports = config;