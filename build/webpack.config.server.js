const path = require('path');
const webpackMerge = require("webpack-merge");

const baseConfig = require('./webpack.base');

module.exports = webpackMerge(baseConfig,{
    //打包出来执行在什么环境 node环境node.js / web环境
    target: "node",
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: "server-entry.js",
        //模块加载方案 umd amd
        libraryTarget: "commonjs2"
    }
})
