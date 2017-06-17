//import plugins
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');


module.exports = {
    entry: {
        //allow chunking of common vendor files for caching purposes
        vendor:['babel-polyfill', 'lodash'],
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                //loaders are read from right to left
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Intro to webpack',
            template: 'src/index.html'
        }),
        //not used, instead using webpack's -p and -d flags
        // new UglifyJsPlugin({
        //     beautify: false,
        //     mangle: { screw_ie8 : true },
        //     compress: { screw_ie8: true, warnings: false },
        //     comments: false
        // }),
        new CommonsChunkPlugin({
            //specifying vendor entry point as the chunk to be based off on and will be stored in the file vendor.bundle.js
            name: "vendor",
            filename: "vendor.bundle.js"
        })
    ]
};