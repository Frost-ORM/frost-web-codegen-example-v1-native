const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: path.resolve(__dirname, "src/index.ts"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js",
		clean: true,
		assetModuleFilename: "[name][ext]",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		port: 3001,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.s?(a|c)ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webp|xvif|webm)$/i,
				type: "assets/resource",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Frost ORM Codegen Vanilla Js example",
			filename: "index.html",
			template: "public/index.html",
			favicon: `public/favicon.ico`,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, "public/static"), to: path.resolve(__dirname, "dist") }, // ignore dot (hidden) files
				//   { from: `${srcDir}/favicon.ico`, to: 'favicon.ico' },
			],
		}),
	],
};
