const path = require('path');
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

//判断是不是开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: "[name].[hash].js",
        path: path.join(__dirname, '../dist'),//? 绝对路径
        //静态文件生成路径
        publicPath: "/public/"
    },
    module: {
        rules: [
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
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
};

//开发环境中Webpack dev server 本地服务端自动编译和 hot replacement 热替换
if (isDev) {

    config.entry = {
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    };

    config.devServer = {
        host: '0.0.0.0', //任何IP可以进行访问
        port: '8888',    //端口
        contentBase: path.join(__dirname, '../dist'),
        hot: true,
        overlay: {
            errors: true
        },
        //错误返回
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        },
    };

    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;