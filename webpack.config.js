import path from 'path';
import url from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const directoryName = path.dirname(url.fileURLToPath(import.meta.url));

export default {
	entry: path.join(directoryName, 'index.js'),
	output: {
		publicPath: '/'
	},
	plugins: [new HtmlWebpackPlugin()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: path.join(directoryName, 'node_modules'),
				use: 'babel-loader'
			}
		]
	},
	devServer: {
		static: path.join(directoryName, 'dist'),
		historyApiFallback: true
	}
};
