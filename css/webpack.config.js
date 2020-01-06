const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 将css作为link引入head标签
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssExtractPluginLess = require("mini-css-extract-plugin");
// 压缩CSS
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
// 压缩js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: true
      })
    ]
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
        removeAttributeQuotes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
    new MiniCssExtractPluginLess({
      filename: "net.css",
    }),
    new OptimizeCss()

  ],
  module: {
    rules: [{
      // css-loader 将@import语法打包
      // style-loder 将css插入html中
      // loader 特点，希望单一
      // 用法，字符串只用一个loader
      // 多个loader 数组或对象 默认由右向左，从下向上执行
      test: /.css$/,
      // use: ["style-loader", "css-loader"]
      use: [
        /* {
                  loader: 'style-loader',
                  options: {
                    insert: 'head'
                  }
                }, */
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader"
        // postcss-loader autoprefixer css添加浏览器前缀
      ]
    }, {
      test: /.less$/,
      use: [
        // "style-loader",
        MiniCssExtractPluginLess.loader,
        "css-loader",
        "less-loader"
      ]
    }]
  }
}