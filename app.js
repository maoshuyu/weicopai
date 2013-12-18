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

// 从cookie中取出 oauth 和 userId 
app.use(function(req, res, next) {
    var oauth, userId, token, secret;    
    if ((token = req.signedCookies['oauth_token']) &&  
        (secret = req.signedCookies['oauth_token_secret']) && 
        (userId = req.signedCookies['user_id'])) {
    
        oauth = {
            'oauth_token': token, 
            'oauth_token_secret': secret 
        }; 

        req.oauth = oauth;
        req.userId = userId;
    } else {
        userId = 0; 
    }
    next();
});

// router
app.use(app.router);

// user routes
app.post('/api/user/login', routes.user.login);
app.post('/api/user/logout', routes.user.logout);

app.get('/api/user/login', routes.user.login);
app.get('/api/user/logout', routes.user.logout);

// timeline routes
app.get('/api/timeline/friend', routes.timeline.friend);
app.get('/api/timeline/:ownerId/user', routes.timeline.user);

// relationship routes
app.get('/api/relationship/:ownerId/following', routes.relationship.following);

// listen port
app.listen(port);

console.log(util.format('server start at http://127.0.0.1:%s', port));
