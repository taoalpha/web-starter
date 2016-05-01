var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var getConfig = require('hjs-webpack');
var pkgConfig = require('./package');

var examplePath = pkgConfig.config.example;


var config = getConfig({
    in: examplePath+'/index',
    out: 'dist',
    clearBeforeBuild: '!(images|favicon.ico)',
    isDev: process.env.NODE_ENV !== 'production',
    html: false,
    port: pkgConfig.config.devPort,
    host: pkgConfig.config.devHost,
    devServer:{
        host: pkgConfig.config.devHost,
    },
    output: {
        filename: "bundle.js",
        publicPath: "/static/"
    }
});

config.plugins.push(
	new HtmlWebpackPlugin({
      filename: 'index.html',
      template: examplePath+'/index.pug'
    })
)

config.module.loaders.push({ test: /\.pug$/, loader: "pug-html" });

module.exports = config
