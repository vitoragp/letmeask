const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyPlugin = require("copy-webpack-plugin");

/*******************************************/

module.exports = {
  entry: {
    index: "./index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    publicPath: "/",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-typescript",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(svg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(scss)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(
        dotenv.config({ path: __dirname + "/.env.local" }).parsed
      ),
    }),
  ],
};
