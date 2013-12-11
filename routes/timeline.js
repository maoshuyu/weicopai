var timeline = require('../services').timeline;

// friend timeline
exports.friend = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    count = req.query.count || 8, 
    sinceId = req.query.sinceId,
    maxId = req.query.maxId,
    done;

    done = function(error, data) {
        res.json(data);
    };


    timeline.friend(userId, oauth, done, {
        'count': count,         
        'maxId': maxId,
        'sinceId': sinceId
    });
};
