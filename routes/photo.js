var photo = require('../services').photo;

exports.likeList = function(req, res, next) {
    var userId = req.userId,
    oauth = req.oauth,
    photoId = req.params.photoId,
    ownerId = req.query.ownerId,
    count = req.query.count || 13,
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

    photo.likeList(userId, ownerId, photoId, oauth, done, {
        'count': count,         
        'maxId': maxId,
        'sinceId': sinceId
    });

};
