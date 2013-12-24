var Client = require('../libs/client'),
utils = require('../libs/utils'),
parse = require('../libs/parse');

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
