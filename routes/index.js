var user = require('./user'),
timeline = require('./timeline'),
relationship = require('./relationship'),
photo = require('./photo');

module.exports = function(app) {
    // user routes
    app.post('/api/user/login', user.login);
    app.post('/api/user/logout',user.logout);

    app.get('/api/user/login', user.login);
    app.get('/api/user/logout',user.logout);

    // timeline routes
    app.get('/api/timeline/friend', timeline.friend);
    app.get('/api/timeline/user/:ownerId', timeline.user);
    app.get('/api/timeline/user/:ownerId/tag/:tagId', timeline.userTag);
    app.get('/api/timeline/tag/:tagId', timeline.tag);

    // relationship routes
    app.get('/api/relationship/following/:ownerId', relationship.following);
    app.get('/api/relationship/follower/:ownerId', relationship.follower);

    app.get('/api/relationship/follow/:toId', relationship.follow);
    app.post('/api/relationship/follow/:toId', relationship.follow);

    // photo routes
    app.get('/api/photo/:photoId/like/list', photo.likeList);

    app.get('/api/photo/:photoId/like', photo.like);
    app.post('/api/photo/:photoId/like', photo.like);

    app.get('/api/photo/:photoId', photo.get);
};

