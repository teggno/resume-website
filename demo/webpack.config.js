const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle" + new Date().valueOf() + ".js"
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  },

  mode: "development",
  devtool: "inline-source-map",
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
        },
        css: {
          tachyons: "./node_modules/tachyons/css/tachyons.css"
        }
      }
    })
  ]
};
