module.export = {
	entry: ["./client/index.js"],
	output: {
		path: __dirname,
		filename: './public/bundle.js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				text: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presents: ["@babel/preset-react"]
				}
			}
		]
	}
}