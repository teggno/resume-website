const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      templateParameters: {
        scripts: {
          react: "https://unpkg.com/react@16/umd/react.production.min.js",
          reactDom:
            "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
          smoothScroll: "https://npmcdn.com/smoothscroll"
        },
        css: {
          tachyons: "https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"
        }
      }
    })
  ]
});
