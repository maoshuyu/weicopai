var Client = require('../libs/client');

// friend timeline
exports.friend = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    count = req.query.count || 8, 
    sinceId = req.query.sinceId,
    maxId = req.query.maxId,
    params, done;

    params = {
        'user_id': userId, 
        'countperpage': count
    };

    if (sinceId) {
        params['since_id'] = sinceId; 
    }
    if (maxId) {
        params['max_id'] = maxId; 
    }

    done = function(error, data) {
        res.json(data);
    };


    Client.lomo.fetch('/v1/note/friend_timeline', params, done, oauth); 
};
