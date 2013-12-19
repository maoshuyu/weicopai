var relationship = require('../services').relationship;

/*
 * relationship following
 */
exports.following = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    ownerId = req.params.ownerId,
    count = req.query.count || 30,
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
            'list': data
        }); 
    };

    relationship.following(userId, ownerId, oauth, done, {
        'sinceId': sinceId,         
        'maxId': maxId,
        'count': count
    });
};


/*
 * relationship follower
 */
exports.follower = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    ownerId = req.params.ownerId,
    count = req.query.count || 30,
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
            'list': data
        }); 
    };

    relationship.follower(userId, ownerId, oauth, done, {
        'sinceId': sinceId,         
        'maxId': maxId,
        'count': count
    });
};


exports.follow = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    toId = req.params.toId,
    action = req.query.action,
    done;

    done = function(error, data) {
        if (error) {
            res.json({
                'code': 1,         
                'message': error.message
            }); 
            return;
        }
        data['code'] = 0;
        res.json(data);
    };

    relationship.follow(userId, toId, action, oauth, done);

};
