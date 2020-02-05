const axios = require('axios');
const webpack = require('webpack');
const serverConfig = require("../../build/webpack.config.server");
const path=require("path");
const MemoryFs = require('memory-fs');
const ReactDomServer = require("react-dom/server");
const proxy=require('http-proxy-middleware');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data);
            })
            .catch(reject)
    })
};

const Module = module.constructor;

const mfs = new MemoryFs;
const serverComplier = webpack(serverConfig);
serverComplier.outputFileSystem = mfs;
let serverBundle;
serverComplier.watch({}, (err, stats) => {
    if (err) throw  err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err));
    stats.warnings.forEach(warn => console.log(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );

    const bundle = mfs.readFileSync(bundlePath,'utf8');
    const m = new Module();
    m._compile(bundle,'server-entry.js');
    serverBundle = m.exports.default;
});

module.exports = function (app) {

    app.use('/public',proxy({
        target:'http://localhost:8888'
    }));

    app.get("*", function (req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle);
            res.send(template.replace('<!-- app -->', content));
        })
    })

}

/**
 * 开发环境
 * 服务端SSR原理 利用前端的webpack dev server 和 hot replacement module 更新，服务端利用webpack实时监测
 * 前端代码更新后，webpack dev server 更新文件包括模板Html，静态文件等
 * node服务端 webpack 监测到文件变化，重新打包并编译成module，然后渲染插入，静态文件js等直接从前端部分获取
 **/