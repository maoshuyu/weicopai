var class2type = {}, 
toString = class2type.toString,
util = require('util');

'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function(name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();        
});

exports.type = function(obj) {
    if ( obj == null ) {                                                                                                                
        return obj + '';                                                                                                                
    }                                                                                                                                   
    return typeof obj === 'object' || typeof obj === 'function' ?                                                                       
    class2type[toString.call(obj)] || 'object' :                                                                                  
    typeof obj;   
};


exports.formatUrl = function(url) {
    if (url && exports.type(url) === 'string') {
        url = url.replace(/\?imagePreview.*$/, '');     
    }
    return url;
};

exports.time = {
    'unix': function(t) {
        return new Date(t * 1000);
    },
    'fromNow': function(past) {
        var now = new Date(), 
        duration;

        if (exports.type(past) !== 'date') {
            past = new Date(past); 
        }

        duration = (now.getTime() - past.getTime()) / 1000;

        if (duration <= 120) {
            return '刚刚'; 
        } else if (duration < 3600) {
            return  util.format('%d分钟前', Math.round(duration / 60)); 
        } else if (duration < 86400) {
            return util.format('今天 %d:%d', past.getHours(), past.getMinutes());
        } else {
            return util.format('%d年%d月%d日 %d:%d', past.getFullYear(), (past.getMonth() + 1),  past.getDate(), past.getHours(), past.getMinutes());
        }
    },
    'ytm': function(t) {
        return util.format('%d年 %d月', t.getFullYear(), (t.getMonth() +1)); 
    },
    'mtd': function(t) {
        return util.format('%d月 %d日', (t.getMonth() +1), t.getDate()); 
    }
};
