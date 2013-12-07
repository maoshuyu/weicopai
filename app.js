var express = require('express'),
    app = express(),
    ejs = require('ejs'), 
    log4js = require('log4js'),
    util = require('util'),
    // 监听的端口号
    port = process.argv[2] || 3000,
    logger = require('./logger'),
    routes = require('./routes'); 

//设置模板引擎为ejs                                                                                                                         
app.set('views', __dirname + '/views');                                                                                                     
app.set('view engine', 'html');                                                                                                             
app.engine('html', ejs.renderFile);  

app.set('port', process.env.PORT || 3000);

// 启用gzip
app.use(express.compress());

// 
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// cookie signed
app.use(express.cookieParser('11oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo='));

// logger
logger.default(app);

// router
app.use(app.router);

app.post('/api/login', routes.user.login);
app.get('/api/login', routes.user.login);

app.listen(port);
console.log(util.format('server start at http://127.0.0.1:%s', port));
