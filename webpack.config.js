const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //每次构建清理dist目录
module.exports = {
	entry: './index.js',
	output: {
		filename: 'fetchs.min.js',
		library: 'fetchs',
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader'
			}
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new UglifyJsPlugin({
			test: /\.js($|\?)/i
		})
	]
};
