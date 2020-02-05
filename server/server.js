const express = require("express");
const ReactSSR = require("react-dom/server");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV = 'development';
const app = express();

if (!dev) {

    const severEntry = require("../dist/server-entry").default;
    const template = fs.readFileSync(path.join(__dirname, "../dist/index.html"), "utf8");

    app.use('/public', express.static(path.join(__dirname, "../dist")));
    app.get("*", function (req, res) {
        const appString = ReactSSR.renderToString(severEntry);
        template.replace('<!-- app -->', appString);
        res.send(appString);
    });

}else {
    const  devStatic=require("./util/dev-static");
    devStatic(app);
}


app.listen(8080, function () {
    console.log('server is listening on 8080');
});