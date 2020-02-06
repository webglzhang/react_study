const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js','.jsx']
  },
  output: {
    path: path.join(__dirname, '../dist'),//? 绝对路径
    //静态文件生成路径
    publicPath: "/public/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /.(js|jsx)$/,
        loader: "eslint-loader",
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  }
}
