const path = require('path')
const HTMLPlugin = require("html-webpack-plugin")

module.exports = {
    //打包出来执行在什么环境 node环境node.js / web环境
    target: "node",
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: "server-entry.js",
        path: path.join(__dirname, '../dist'),
        publicPath: "/public",
        //模块加载方案 umd amd
        libraryTarget: "commonjs2"
    },
    module:{
      //代码转换规则
        rules: [
            {
                enforce: "pre",
                test:/.(js|jsx)$/,
                loader: "eslint-loader",
                exclude:[
                    path.join(__dirname, '../node_modules')
                ]
            },
            {
                test:/.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/.js$/,
                loader:'babel-loader',
                exclude:[
                    path.join(__dirname, '../node_modules')
                ]
            }
        ]
    }
}