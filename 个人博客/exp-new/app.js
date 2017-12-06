const express = require('express');
const path = require('path');
const fs = require("fs");
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require("nunjucks");
const session = require("express-session");

const index = require('./routes/index');
const login = require("./routes/login");
const users = require('./routes/users');
const signup = require("./routes/signup");
const editor = require("./routes/editor");
const upload = require("./routes/upload");
const artical = require("./routes/artical");
const captcha = require("./routes/captcha");

const app = express();

// view engine setup
nunjucks.configure("views", {
	autoescape: true,
	express: app,
})
app.set('view engine', 'html');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// 配置文件日志
const cLogger = logger.format("clogger",
	":date[iso] :: :user-agent :: :remote-addr :: :method :: :url :: :status :: :response-time ms");
const logPath = __dirname + "/logs";
const accessLogFile = fs.createWriteStream(logPath + "/access.log", {flags: "a"});
app.use(logger('clogger',{
	stream: accessLogFile
}));

// 配置session
app.use(session({
	// store: new MongoStore({
	// 	mongooseConnection: mongoose.connection
	// }),
	name: "Carp",
	secret: "123345ljgaotu09354u0",
	cookie: {maxAge: 60*60*1000},

	// 如果为true， 则每次请求都更行cookie的过期时间;
	rolling: true,

	// 如果为true, 则默认每次请求都强制保存session;
	resave: true,

	// true 表示 所有连接只要没有session对象，都自动生成一个；
	// false 表示 不会自动生成，只有调用req.session进行操作时才会生成；
	saveUninitialized: false,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 根路径 /
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', index);
app.use("/login", login);
app.use("/signup", signup);
app.use('/user', users);
app.use("/editor", editor);
app.use("/upload", upload);
app.use("/article", artical);
app.use("/captcha", captcha);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.send(err);
  next(err);
});

console.log(app.get("env"));
module.exports = app;
