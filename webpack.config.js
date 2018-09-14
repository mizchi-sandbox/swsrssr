const HTMLPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: {
    sw: __dirname + "/src/sw",
    main: __dirname + "/src/main"
  },
  output: {
    filename: "[name].bundle.js",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: __dirname + "/src/index.html",
      inject: false
    })
  ]
};
