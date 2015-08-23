'use strict';

var webpack = require('webpack');
var _ = require('lodash');
var baseConfig = require('./webpack.config');

var config = _.assign({}, baseConfig, {
    devtool: false,
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compressor: {
                drop_console: true
            }
        }),
        // use react production build (much smaller)
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            },
            '__DEV__': 'false'
        })
    ],
    entry: './index',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                optional: ['runtime'],
                plugins: ['lodash']
            }
        }]
    }
});

module.exports = config;
