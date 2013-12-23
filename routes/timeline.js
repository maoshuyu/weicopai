var timeline = require('../services').timeline;

/*
 * friend timeline
 */
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

/*
 * user timeline
 */
exports.user = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    ownerId = req.params.ownerId,
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

/*
 * user tag timeline
 */
exports.userTag = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    ownerId = req.params.ownerId,
    tagId = req.params.tagId,
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

    timeline.userTag(userId, ownerId, tagId, oauth, done, {
        'sinceId': sinceId,     
        'maxId': maxId,
        'count': count
    });
};

/*
 * tag
 */
exports.tag = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    tagId = req.params.tagId,
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

    timeline.tag(userId, tagId, oauth, done, {
        'sinceId': sinceId,       
        'maxId': maxId,
        'count': count
    });
};
