const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  devServer: { // 开发服务配置
    port: 8080,

    contentBase: "./build"
  },
  mode: 'development',
  entry: "./src/index.js", // 入口
  output: {
    filename: 'boundle.js', // 打包后的文件名
    path: path.resolve(__dirname, 'build') // 路径必须是一个绝对路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      // https://github.com/jantimon/html-webpack-plugin#minification
      template: "./index.html",
      filename: "index.html",
      minify: {
        // https://github.com/DanielRuf/html-minifier-terser
        removeAttributeQuotes: true,

      }
    })
  ]
}