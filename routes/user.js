var Client = require('../libs/client'), 
    utils  = require('../libs/utils'), 
    crypto = require('crypto'),
    conf = require('../conf');

exports.login = function(req, res, next) {
    var username, password, params, done;

    username = req.query.username;
    password = req.query.password;
    /*username = req.body.username,
    password = req.body.password;*/

    if (!(username && password)) {
        res.json({
            'code': '3',         
            'message': '用户名密码不能为空'
        }); 
        return;
    }

    params = {
        'consumer_key': conf.consumer.key, 
        'consumer_secret': conf.consumer.secret,
        // 对password进行 sha1 加密
        'x_auth_password': crypto.createHash('sha1').update(password).digest('hex'),
        'x_auth_username': username 
    };

    done = function(error, data) {
        var type; 
        if (error) {
            res.json({
                'code': '2',
                'message': '登陆错误，请稍候再试'
            });
        } else {
            // 获取返回数据的类型
            // 如果为object，则登陆成功
            // 如果为string, 则登陆失败
            type = utils.type(data);
            if (type === 'object' && data['user_id']) {
                res.cookie('user_id', data['user_id'], {'signed': true, 'maxAge': 900000, 'httpOnly': true});
                res.cookie('oauth_token', data['oauth_token'], {'signed': true, 'maxAge': 900000, 'httpOnly': true});
                res.cookie('oauth_token_secret', data['oauth_token_secret'], {'signed': true, 'maxAge': 900000, 'httpOnly': true});
                res.json({
                    'code': '0',
                    'message': '登陆成功',
                    'id': data['user_id'],      
                    'name': data['user']['name'],      
                    'url': '/'
                });
            } else if (type === 'string' && data.indexOf('error_code=403') >= 0) {
                res.json({
                    'code': '1',
                    'message': '用户名密码错误'
                });
            } else {
                res.json({
                    'code': '2',
                    'message': '登陆错误，请稍候再试'
                });
            }
        }
    };

    Client.lomo.fetch('/v1/login', params, done); 
};

exports.logout = function(req, res, next) {
    res.clearCookie('user_id');
    res.clearCookie('oauth_token');
    res.clearCookie('oauth_token_secret');
    res.json({
        'code': '0',         
        'message': '注销成功' 
    });
};
