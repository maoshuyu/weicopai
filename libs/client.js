var util = require('util'), 
    hmacsign = require('oauth-sign').hmacsign,
    uuid = require('node-uuid'),
    needle = require('needle'),
    conf = require('../conf');

var Client = {

    'generateUrl': function(uri) {
        return util.format('%s%s', this.host, uri) 
    },

    'fetch': function(uri, params, cb, options) {
        var url = this.generateUrl(uri), 
        oa = this.oa(url, params),
        self = this;


        needle.post(url, oa, {'multipart': true}, function(error, response, body) {
            var data;
            if (error) {
                cb(error);
                return;
            }

            if (response.statusCode === 200) {
                data = self.getResponse(body); 
            } else {
                data = null; 
            }

            cb(null, data);
        });

    },

    'oa': function(url, params) {
        var oa = {}, 
        method = 'POST';

        for (var key in this.consumer) {
            oa['oauth_' + key] = this.consumer[key];
        }
        oa.oauth_nonce = uuid().replace(/-/g, '');
        oa.oauth_signature_method = 'HMAC-SHA1';
        oa.oauth_timestamp = Math.floor(Date.now() / 1000).toString();
        oa.oauth_version = '1.0';
        if (params) { 
            for (var key in params) oa[key] = params[key];
        }
        oa.oauth_signature = hmacsign(method, url, oa, this.consumer.consumer_secret); 

        return oa;
    },

    'getResponse': function(body) {
        body = body.toString()
                   .replace(/:\s\d{19}/g, ":\"@!#@!#$&\"")
                   .replace(/:\d{19}/g, ":\"@!#@!#$&\"")
                   .replace(/@!#@!#:\s/g,"")
                   .replace(/@!#@!#:/g,"");    
        try {
            body = JSON.parse(body);
            return body.response ? body.response : body;
        } catch (ex) {
            return body; 
        }
    }
}; 

exports.Client = Client;
// 初始化profile Client 
exports.profile = Object.create(Client, {
    'host': {
        'value': conf.host.profile, 
        'writable': false 
    }, 
    'consumer': {
        'value': conf.consumer, 
        'writable': false,
        'enumerable': true
    }
});
// 初始化lomo Client 
exports.lomo = Object.create(Client, {
    'host': {
        'value': conf.host.lomo, 
        'writable': false 
    }, 
    'consumer': {
        'value': conf.consumer, 
        'writable': false,
        'enumerable': true
    }
});
