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
                'message': error.message         
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
                'message': error.message         
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

/*
 * 关注，取消关注 
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, 是否关注 / 取消关注成功 
 * @param {String} userId 用户ID
 * @param {String} toId 关注 / 取消关注 用户ID 
 * @param {String} action 关注 / 取消关注操作 
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 */
exports.follow = function(userId, toId, action, oauth, cb) {
    var params, done;

    if (userId === toId) {
        cb({
            'message': '不能关注自己'
        }); 
        return;
    }

    params = {
        'from_id': userId, 
        'to_id': toId,
        'action': action 
    };

    done = function(error, data) {
        if (error) {
            cb({
                'message': error.message          
            }); 
            return;
        }
        // 返回success followed_before isdup 都表示请求成功 
        // 如果一个用户增经被followed 则返回followed_before
        // isdup 表示用户已经被follow了 
        if (data === 'success' || data === 'followed_before' || data === 'isdup') {
            cb(null, {
                'toId': toId,            
                'action': action
            });
        } else if (data === 'auth failed') {
            cb({
                'message': '用户未登陆'            
            }); 
        } else if (data === 'limit') {
            cb({
                'message': '不能关注自己'         
            }); 
        } else {
            cb({
                'message': '服务器错误'          
            }); 
        }
    };

    Client.lomo.fetch('/v1/profile/follow', params, done, oauth); 

};
