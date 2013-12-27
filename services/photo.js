var Client = require('../libs/client'),
utils = require('../libs/utils'),
parse = require('../libs/parse');

/*
 * 获取photo
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, photo信息 
 * @param {String} userId 用户ID
 * @param {String} photoId photoID
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 */
exports.get = function(userId, photoId, oauth, cb) {
    var params, done;

    params = {
        'from_id': userId, 
        'note_id': photoId
    };

    done = function(error, data) {
    
        if (error) {
            cb({
                'message': error.message         
            }); 
            return;
        } 

        if (utils.type(data) === 'object') {
            cb(null, parse.photo(data, userId, true));
        } else if (data === '') {
            cb({
                'message': '用户未登陆'            
            }); 
        } else {
            cb({
                'message': '未知错误'        
            }); 
        }
    };

    Client.lomo.fetch('/v1/note/get', params, done, oauth); 
    
};



/*
 * 获取likelist
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, following list 
 * @param {String} userId 用户ID
 * @param {String} ownerId photo所有者ID
 * @param {String} photoId photoID
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 * @param {Object} opt 可选参数 
 */

exports.likeList = function(userId, ownerId, photoId, oauth, cb, opt) {
    var params, done, count;

    count = opt.count || 13;

    params = {
        'user_id': ownerId,
        'from_id': userId,
        'note_id': photoId,
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
                list.push(parse.user(item['user']));        
            });
            cb(null, list);
        } else if (data === '') {
            cb({
                'message': '用户未登陆'            
            }); 
        } else {
            cb({
                'message': '未知错误'        
            }); 
        }
    };

    Client.lomo.fetch('/v1/note/like_list', params, done, oauth); 

};


/*
 * 喜欢 
 * Callback: 
 * 回调函数参数列表:
 * - error, 请求错误
 * - data, 是否成功  
 * @param {String} userId 用户ID
 * @param {String} photoId photoID
 * @param {String} action 行为like unlike 
 * @param {Object} oauth Oauth对象 
 * @param {Function} cb Callback函数
 * @param {Object} opt 可选参数 
 */
exports.like = function(userId, photoId, action, oauth, cb) {
    var params, done;

    params = {
        'user_id': userId,    
        'note_id': photoId,
        'action': action
    };

    done = function(error, data) {
        if (error) {
            cb({
                'message': error.message         
            }); 
            return;
        } 

        // like
        if (data === photoId) {
            cb(null, {
                'liked': action === 'like' ? 1 : 0,              
                'photoId': photoId
            }); 
        //unlike
        } else if (data.response === 0) {
            cb(null, {
                'liked': action === 'like' ? 1 : 0,              
                'photoId': photoId
            }); 
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

    Client.lomo.fetch('/v1/note/like', params, done, oauth); 
};

