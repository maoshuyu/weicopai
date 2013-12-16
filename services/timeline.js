var Client = require('../libs/client'),
utils = require('../libs/utils'),
parse = require('../libs/parse');

/*
 * 获取friend timeline
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, timeline list
 * @param {String} userId 用户ID
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 * @param {Object} opt 可选参数 
 */
exports.friend = function(userId, oauth, cb, opt) {
    var params, done, count;

    // count 默认值为8
    count = opt.count || 8; 
    params = {
        'user_id': userId, 
        'countperpage': count
    };

    if (opt.sinceId) {
        params['since_id'] = opt.sinceId; 
    }
    if (opt.maxId) {
        params['max_id'] = opt.maxId; 
    }

    done = function(error, data) {
        var list;
        if (error) {
            cb({
                'message': '服务器错误'         
            }); 
            return;
        } 

        if (utils.type(data) === 'array') {
            list = [];
            data.forEach(function(item, i) {
                list.push(parse.photo(item, true)); 
            }); 
            cb(null, list);
        } else if (data === 'auth failed') {
            cb({
                'message': '用户未登陆'
            }); 
        } else {
            cb({
                'message': '未知错误'
            }); 
        }
    };

    Client.lomo.fetch('/v1/note/friend_timeline', params, done, oauth); 
};


/*
 * 获取user timeline
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, timeline list
 * @param {String} userId 用户ID
 * @param {String} ownerId timeline所有者ID
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 * @param {Object} opt 可选参数 
 */
exports.user = function(userId, ownerId, oauth, cb, opt) {
    var params, done, count;

    count = opt.count || 8;
    userId = userId || 0;
    params = {
        'user_id': ownerId, 
        'from_id': userId,
        'countperpage': count
    };

    if (opt.sinceId) {
        params['since_id'] = opt.sinceId; 
    }
    if (opt.maxId) {
        params['max_id'] = opt.maxId; 
    }

    done = function(error, data) {
        var list;
        if (error) {
            cb({
                'message': '服务器错误'         
            }); 
            return;
        } 

        if (utils.type(data) === 'array') {
            list = [];
            data.forEach(function(item, i) {
                list.push(parse.photo(item, true)); 
            }); 
            cb(null, list);
        } else if (data === 'auth failed') {
            cb({
                'message': '用户未登陆'
            }); 
        } else {
            cb({
                'message': '未知错误'
            }); 
        }
    };

    Client.lomo.fetch('/v1/note/user_timeline', params, done, oauth); 
};
