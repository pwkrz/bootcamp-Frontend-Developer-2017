const ExtrTxtPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env){
	
	var prod = env !== undefined && env.production === true;
    var dev = env !== undefined && env.development === true;
	
	return {
		entry: {
			jquery: "jquery",
			bxslider: "bxslider",
			main: './src/js/main.js'
		},	
		output: {
			filename: 'js/[name].js',
			publicPath: "",
            path: path.resolve(__dirname, "dist/"),
		},
		module: {			
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				},
				
				{
					test: /\.(png|jpg|gif)$/,
					exclude: /(node_modules|bower_components)/,
					use: [
					  {
						loader: 'url-loader',
						options: {
							limit: 10000,
							context: "src/",
							name: "[path][name].[ext]"
						  }
						// options: {
							// context: "src/",
							// name: '[path][name].[ext]'
						// }  
					  }
					]
				},
			
				{
					test: /\.(scss|css)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].css',
								outputPath: 'css/'
							}
						},
						{
							loader: 'extract-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'postcss-loader',
							options: {
								config: {
								  path: 'postcss.config.js'
								}
							  }
						},
						{
							loader: 'sass-loader'
						}
					]
				}
			]
		},
		
		plugins: [
            
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                names: ["bxslider", "jquery"]
            }),
			
			new webpack.optimize.UglifyJsPlugin(),
			
			new webpack.ProvidePlugin({
			  $: 'jquery',
			  jQuery: 'jquery',
			  "window.jQuery": "jquery",
			  "window.$": "jquery"
			})
        ]
	}
}