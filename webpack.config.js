const path = require('path');
const pkg = require('./package.json');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //每次构建清理dist目录
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'fetch-s.min.js',
		library: 'fetchs',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new UglifyJsPlugin({
			test: /\.js($|\?)/i
		})
	]
};
