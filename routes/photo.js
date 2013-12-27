var photo = require('../services').photo;


exports.get = function(req, res, next) {
    var userId = req.userId,
    oauth = req.oauth,
    photoId = req.params.photoId,
    done;

    done = function(error, data) {
        if (error) {
            res.json({
                'code': 1,         
                'message': error.message
            }); 
        } 

        res.json({
            'code': 0,         
            'photo': data
        });
    
    };

    photo.get(userId, photoId, oauth, done);
};

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

exports.like = function(req, res, next) {
    var userId = req.userId,
    oauth = req.oauth,
    photoId = req.params.photoId,
    action = req.query.action;

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

    photo.like(userId, photoId, action, oauth, done);

};
