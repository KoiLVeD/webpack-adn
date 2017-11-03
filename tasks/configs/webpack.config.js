const path = require('path');
const webpack = require('webpack-stream').webpack;
const config = require('./main.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

console.log(process.env.NODE_ENV);

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == "development";


console.log('build is '+isDevelopment);

let pluginsProd = [

    // new UglifyJSPlugin({
    //     sourceMap: false,
    // }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true,
            warnings: false
        },
        output: {
            comments: false
        },
        sourceMap: false,
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true)
];

let pluginsDev = [
    new webpack.NoErrorsPlugin()
];

let  plugins = isDevelopment ? pluginsProd : pluginsDev;

module.exports = {
    watch: isDevelopment,

    entry: config.paths.entry,

    devtool: 'eval', //settings source-map

    output: {
        publicPath: '/public/js/',
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),

        ...plugins
    ],

    module: {
        rules: [{

            test: /\.js$/,
            exclude: [/node_modules/],
            use: [
                {
                    loader: 'babel-loader',
                    options: { presets: ['es2015', 'stage-0'] }
                }
            ]
        }]
    }
};

