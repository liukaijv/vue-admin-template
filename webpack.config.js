var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = require('./config');

module.exports = {
	entry: path.resolve(config.srcPath, 'main.js'),
	output:{
		path: 'dist',				
		filename: 'js/[name]-[hash]-bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.vue']       
	},  
	module:{
		loaders:[
		{
			test:/\.vue$/,
			loader:'vue'
		},
		{
			test: /\.js?$/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
				plugins: ["transform-runtime"],					
			},
			exclude: /node_modules/
		},
		{ 
			test: /\.scss$/, 
			loaders: [ 'style', 'css', 'sass' ] 
		},
		{
			test:/\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		},			
		{
			test: /\.(woff2?|eot|ttf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'fonts/[name].[ext]'
			}
		},
		{
			test: /\.(png|jpg|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'images/[name].[ext]'
			}
		}				
		]
	},
	plugins: [       
	new ExtractTextPlugin('[name].css'),
	new HtmlWebpackPlugin({
		template: path.join(config.srcPath, 'index.html')
	}),
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		"window.jQuery": "jquery",
		"window.$": "jquery",
	})
	],   
	devServer: {       
		proxy: {
			'/backend/*': {                
				target: config.apiDomain,
				changeOrigin: true         
			}
		}
	}
}