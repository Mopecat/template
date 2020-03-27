const path = require("path");

const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 设置入口文件
  entry: "./src/index.js",
  // 设置出口文件
  output: {
    filename: "bundle.js"
  },
  // 设置插件
  plugins: [new htmlWebpackPlugin()],
  // 设置模块
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  // 设置devServer
  devServer: {
    port: 8020,
    clientLogLevel: "none",
    // 一切服务都启用gzip压缩
    compress: true,
    // 出现编译错误时直接出现在页面上
    overlay: true,
    // 清空过多的输出信息 美化输出信息可以用friendly-errors-webpack-plugin
    quiet: true
  }
};
