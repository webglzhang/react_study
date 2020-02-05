const express = require("express");
const ReactSSR = require("react-dom/server");
const severEntry = require("../dist/server-entry").default;
const fs = require("fs");
const path = require("path");


const template = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8");

const app = express();

/*
 *静态文件目录做映射
*/
app.use('/public', express.static(path.join(__dirname, "../dist")));

app.get("*", function (req, res) {
    const appString = ReactSSR.renderToString(severEntry);
    template.replace('<!-- app -->', appString);
    res.send(appString);
});

app.listen(8080, function () {
    console.log('server is listening on 8080');
});