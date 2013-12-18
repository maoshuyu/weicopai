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
        cb(null, data); 
    };

    Client.lomo.fetch('/v1/profile/following', params, done, oauth); 
};
