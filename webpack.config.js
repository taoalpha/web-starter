var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var getConfig = require('hjs-webpack');
var pkgConfig = require('./package');

var examplePath = pkgConfig.config.example;


var config = getConfig({
    in: examplePath+'/index',
    out: path.join('dist',examplePath),
    clearBeforeBuild: '!(images|favicon.ico)',
    isDev: process.env.NODE_ENV !== 'production',
    html: false,
    port: pkgConfig.config.devPort,
    devServer:{
        host: pkgConfig.config.devHost,
        compress: true,
        contentBase: path.join(__dirname,"dist")
    },
    output: {
        filename: "bundle.js"
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
