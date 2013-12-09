var Client = require('../libs/client');

// friend timeline
exports.friend = function(req, res, next) {
    var oauth = req.oauth,
    userId = req.userId,
    params, done;

    params = {
        'user_id': userId 
    };

    done = function(error, data) {
        res.json(data);
    };


    Client.lomo.fetch('/v1/note/friend_timeline', params, done, oauth); 
};
