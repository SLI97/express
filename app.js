const path = require("path")
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require("express")
const favicon = require('serve-favicon');
const index = require("./controller/index")
const article = require("./controller/article")
const tag = require("./controller/tag")

//生成服务
const app = express()

//静态资源托管中间件
// app.use(express.static("./public"))
app.use(express.static(path.join(__dirname, 'public')));
//ejs模板引擎设置
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//设置模板的后缀是html
app.engine('html', require('ejs').renderFile);
//指定总模板
app.set('view engine', 'html');

//请求参数解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//日志中间件
// app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//业务逻辑路由中间件
app.use("/", index)
app.use("/article", article)
app.use("/tag", tag)

//兜底404
// app.use(function (req, res, next) {
//     console.log("NOT FOUND404")
//     next(createError(404));
// });

//抛出异常才会来到这
app.use((err, req, res, next) =>{
    res.locals.error = err;
    res.status(500)
    res.render("error")
})

const port = 3030
app.listen(port, () => {
    console.log("application is running at http://localhost:" + port)
})
