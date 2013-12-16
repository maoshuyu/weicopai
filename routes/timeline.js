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
        if (error) {
            res.json({
                'code': 1,                    
                'message': error.message
            }); 
            return;
        }

        res.json({
            'code': 0,          
            'timeline': data
        });
    };

    timeline.friend(userId, oauth, done, {
        'count': count,         
        'maxId': maxId,
        'sinceId': sinceId
    });
};

exports.user = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    ownerId = req.query.ownerId,
    count = req.query.count || 8,
    sinceId = req.query.sinceId,
    maxId = req.query.maxId,
    done;

    done = function(error, data) {
        if (error) {
            res.json({
                'code': 1,                    
                'message': error.message
            }); 
            return;
        }

        res.json({
            'code': 0,          
            'timeline': data
        });
    };

    timeline.user(userId, ownerId, oauth, done, {
        'count': count,         
        'maxId': maxId,
        'sinceId': sinceId
    });
};
