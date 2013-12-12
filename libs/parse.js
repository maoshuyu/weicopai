var utils = require('./utils'),
emoji = require('emoji');

exports.photo = function(data, detail) {
    var photo = {};
    if (!data) {
        return photo; 
    }

    // photo id
    photo['photoId'] = data['note_id'];

    // photo type url
    photo['type'] = 'photo';
    photo['image'] = data['photo_url'];
    photo['image'] = utils.formatUrl(photo['image']);
    if (data['video']) {
        photo['type'] = 'video';
        photo['video'] = data['video'];
    }

    // photo user;
    if (data['user']) {
        photo['user'] = exports.user(data['user']);
    } else {
        photo['user'] = null; 
    }

    // photo description
    if (data['description']) {
        photo['description'] = data['description'];   
        // emoji
        photo['descriptionEmoji'] = emoji.unifiedToHTML(data['description']);   
    } else {
        photo['description'] = ''; 
        photo['descriptionEmoji'] = '';
    }

    if (detail) {
        if (data['init_time']) {
            // 转换unix时间为js时间
            photo['time'] = utils.time.unix(data['init_time']); 
            photo['time'] = utils.time.fromNow(photo['time']);
        } else {
        
        }
    }

    return photo;
};

exports.user = function(data, detail) {
    var user = {};
    if (!data) {
        return user; 
    }
    // user id
    user['userId'] = data['user_id'];
    // user name
    if (data['name']) {
        user['name'] = data['name']; 
        user['nameEmoji'] = emoji.unifiedToHTML(data['name']);
    } else {
        user['name'] = user['emoji'] = ''; 
    }

    // user avatar 
    if (data['avatar_source'] || data['avatar']) {
        user['avatar'] = data['avatar_source'] ? data['avatar_source'] : data['avatar'];
        user['avatar'] = utils.formatUrl(user['avatar']);
    } else {
        // DEFAULT AVATAR
        user['avatar'] = ''; 
    }

    // followed
    // followed 有时候为 undefined;
    if (!data['followed']) {
        if (data['followed'] === 1) {
            user['followed'] = true; 
        } else {
            user['followed'] = false; 
        }
    } else {
        user['followed'] = false; 
    }

    return user;

};


