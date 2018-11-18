const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    compress: true,
    port: 8080,
    host: "127.0.0.1",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      templateParameters: {
        scripts: {
          react: "./node_modules/react/umd/react.development.js",
          reactDom: "./node_modules/react-dom/umd/react-dom.development.js",
          smoothScroll:
            "./node_modules/smoothscroll-polyfill/dist/smoothscroll.min.js"
        }
      }
    })
  ]
});
