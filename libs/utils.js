var class2type = {}, 
toString = class2type.toString,
type, parsePhoto, parseUser, formatUrl;

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();        
});

type = function(obj) {
    if ( obj == null ) {                                                                                                                
        return obj + '';                                                                                                                
    }                                                                                                                                   
    return typeof obj === 'object' || typeof obj === 'function' ?                                                                       
    class2type[ toString.call(obj) ] || 'object' :                                                                                  
    typeof obj;   
};

parsePhoto = function(data, detail) {
    var photo = {};
    if (!data) {
        return photo; 
    }

    // photo id
    photo['photoId'] = data['note_id'];

    // photo type url
    photo['type'] = 'photo';
    photo['image'] = data['photo_url'];
    photo['image'] = formatUrl(photo['image']);
    if (!data['video']) {
        photo['type'] = 'video';
        photo['video'] = data['video'];
    }

    // pohto user;
    if (!data['user']) {
        photo['user'] = null; 
    } else {
        photo['user'] = parseUser(data['user']);
    }

    return photo;
};

parseUser = function(data, detail) {
    var user = {};
    console.log(data);
    if (!data) {
        return user; 
    }
    // user id
    user['userId'] = data['user_id'];
    // user name
    if (data['name']) {
        user['name'] = data['name']; 
        user['emoji'] = data['name'];
    } else {
        user['name'] = user['emoji'] = ''; 
    }

    // user avatar 
    if (data['avatar_source'] || data['avatar']) {
        user['avatar'] = data['avatar_source'] ? data['avatar_source'] : data['avatar'];
        user['avatar'] = formatUrl(user['avatar']);
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

formatUrl = function(url) {
    if (url && type(url) === 'string') {
        url = url.replace(/\?imagePreview.*$/, '');     
    }
    return url;
};

exports.type = type;
exports.parsePhoto = parsePhoto;
exports.parseUser = parseUser;
exports.formatUrl = formatUrl;
