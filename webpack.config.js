var path = require('path');
var webpack = require('webpack');
var sourceMap = require('source-map');

module.exports = {
    entry: [
        './js/index.js'
    ],
    output: {
        path: __dirname,
        filename: 'js/bundle.js'
    },
    devtool: "source-map"
};