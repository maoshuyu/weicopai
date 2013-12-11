var Client = require('../libs/client'),
    utils = require('../libs/utils');

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
    var params, done,
    count, sinceId, maxId;

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

    done = function(error, list) {
        var data;
        if (error) {
            cb(error); 
            return;
        } 
        data = [];
        list.forEach(function(item, i) {
            data.push(utils.parsePhoto(item)); 
        }); 

        cb(null, data);
    };

    Client.lomo.fetch('/v1/note/friend_timeline', params, done, oauth); 
};
