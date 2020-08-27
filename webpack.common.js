const path = require("path");

module.exports = {
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "./src"),
  },
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "imgs",
          },
        },
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: "/node_modules",
      },
    ],
  },
};
