var log4js = require('log4js'),
    fs = require('fs');

// 如果 logs 文件夹不存在，自动建立一个
if (!fs.existsSync('./logs')) {
    fs.mkdirSync('./logs');
}

// log4js 配置
log4js.configure({
    'appenders': [
        // 控制台输出
        { 
            'type': 'console' 
        },         
        // 文件输出
        {
            'type': 'file',             
            'filename': 'logs/access.log', 
            'pattern': '-yyyy-MM-dd',
            'backups': 3
            // 将所有log暂时都打到access.log中
            //,'category': 'default'
        }
    ],
    // 替换console 以INFO Level 输出到日志中 
    'replaceConsole': true

});

exports.create = function(name){
    var logger = log4js.getLogger(name);
    logger.setLevel('INFO');
    return logger;
};

exports.default = function(app){
    var logger = exports.create('default');
    app.use(log4js.connectLogger(logger, {'level': 'auto'}));
}
