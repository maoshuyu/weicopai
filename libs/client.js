var util = require('util'), 
    oauth = require('oauth-sign'),
    hmacsign = oauth.hmacsign,
    rfc3986 = oauth.rfc3986,    
    uuid = require('node-uuid'),
    needle = require('needle'),
    conf = require('../conf'),
    host = conf.host, 
    consumer = conf.consumer,  
    admin = conf.admin;


var Client = {

    'generateUrl': function(uri) {
        return util.format('%s%s', this.host, uri) 
    },

    'fetch': function(uri, params, cb, oauth) {
        var url = this.generateUrl(uri), 
        oauthHeader = this.toHeader(url, oauth),
        self = this;

        params = params || {};
        params['admin_id'] = this.admin.id;
        params['admin_password'] = this.admin.password;

        needle.post(url, params, {
            'headers': {
                'Authorization': oauthHeader,
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Weico+ 2.0 (Web)'
            },
            'parse': false
        }, function(error, response, body) {
            var data;
            if (error) {
                cb(error);
                return;
            }

            body = body.toString();

            if (response.statusCode === 200) {
                data = self.getResponse(body); 
            } else {
                data = null; 
            }

            cb(null, data);
        });

    },

    'toHeader': function(url, oauth) {
        var oa = {},
        oauth = oauth || {},
        signature,
        method = 'POST';

        oa['oauth_consumer_key'] = this.consumer['key'];
        oa['oauth_nonce'] = uuid().replace(/-/g, '');
        oa['oauth_signature_method'] = 'HMAC-SHA1';
        oa['oauth_timestamp'] = Math.floor(Date.now() / 1000).toString();

        oa['oauth_token'] = oauth['oauth_token'] 

        oa.oauth_version = '1.0';

        // 计算signature
        signature = hmacsign(method, url, oa, this.consumer.secret, oauth.oauth_token_secret);

        return 'OAuth ' + Object.keys(oa).sort().map(function (i) {
            return util.format('%s="%s"', i, rfc3986(oa[i]));
        }).join(',') + util.format(',oauth_signature="%s"', rfc3986(signature));
    },

    'getResponse': function(body) {
        body = body.toString()
                   .replace(/:\s\d{18,19}/g, ":\"@!#@!#$&\"")
                   .replace(/:\d{18,19}/g, ":\"@!#@!#$&\"")
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
        'value': host.profile, 
        'writable': false 
    }, 
    'consumer': {
        'value': consumer, 
        'writable': false,
        'enumerable': true
    },
    'admin': {
        'value': admin, 
        'writable': false,
        'enumerable': true
    }
});
// 初始化lomo Client 
exports.lomo = Object.create(Client, {
    'host': {
        'value': host.lomo, 
        'writable': false 
    }, 
    'consumer': {
        'value': consumer, 
        'writable': false,
        'enumerable': true
    },
    'admin': {
        'value': admin, 
        'writable': false,
        'enumerable': true
    }
});
