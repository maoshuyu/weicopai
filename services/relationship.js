var Client = require('../libs/client'),
utils = require('../libs/utils'),
parse = require('../libs/parse');

/*
 * 获取following
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, following list 
 * @param {String} userId 用户ID
 * @param {String} ownerId following所有者ID
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 * @param {Object} opt 可选参数 
 */
exports.following = function(userId, ownerId, oauth, cb, opt) {
    var params, done, count;

    // count 默认值为30
    count = opt.count || 30; 
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
        list = [];
        if (utils.type(data) === 'array') {
            data.forEach(function(item, i) {
                var obj;             
                obj = parse.user(item['user'], true);
                obj['id'] = item['id']
                list.push(obj);
            }); 
            cb(null, list);
        } else {
            cb({
                'message': '服务器错误'         
            }); 
        }
    };

    Client.lomo.fetch('/v1/profile/following', params, done, oauth); 
};


/*
 * 获取follower
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, follower list 
 * @param {String} userId 用户ID
 * @param {String} ownerId follower所有者ID
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 * @param {Object} opt 可选参数 
 */
exports.follower = function(userId, ownerId, oauth, cb, opt) {
    var params, done, count;

    // count 默认值为30
    count = opt.count || 30; 
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
        list = [];
        if (utils.type(data) === 'array') {
            data.forEach(function(item, i) {
                var obj;             
                obj = parse.user(item['user'], true);
                obj['id'] = item['id']
                list.push(obj);
            }); 
            cb(null, list);
        } else {
            cb({
                'message': '服务器错误'         
            }); 
        }
    };

    Client.lomo.fetch('/v1/profile/followers', params, done, oauth); 
};
