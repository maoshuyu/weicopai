var relationship = require('../services').relationship;

/*
 * relationship following
 */
exports.following = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    ownerId = req.params.ownerId,
    count = req.query.count || 8,
    sinceId = req.query.sinceId,
    maxId = req.query.maxId,
    done;

    done = function(error, data) {
        res.json(data); 
    };

    relationship.following(userId, ownerId, oauth, done, {
        'sinceId': sinceId,         
        'maxId': maxId,
        'count': count
    });
};
