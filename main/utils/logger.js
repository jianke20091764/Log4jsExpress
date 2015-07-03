var loggerConfig = require("../config/loggerConfig");
var path = require("path");
var fs = require("fs");
var log4js = require("log4js");
var logger = {};

// 判断日志目录是否存在，不存在时创建日志目录
var checkAndCreateDir = function(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
};

// 检查配置文件所需的目录是否存在，不存在时创建
var setLoggerConfig = function(objConfig) {
	var defaultAtt = objConfig["customDefaultAtt"];

	for (var i = 0, j = objConfig.appenders.length; i < j; i++) {
		var item = objConfig.appenders[i];
		if (item["type"] == "console")
			continue;

		if (defaultAtt != null) {
			for ( var att in defaultAtt) {
				if (item[att] == null)
					item[att] = defaultAtt[att];
			}
		}
		
		var fileName = item["filename"] ;
		
		if (fileName == null)
			continue;
		else
			checkAndCreateDir(path.dirname(fileName));
	}
};

var loggerDebugTool = log4js.getLogger('Debug'); 
var loggerErrorTool = log4js.getLogger('Error');
var loggerInfoTool = log4js.getLogger('Info');
var loggerWarnTool = log4js.getLogger('Warn');

logger.debug = function(msg) {
	if (msg == null)
		msg = "";
	loggerDebugTool.debug(msg);
};

logger.info = function(msg) {
	if (msg == null)
		msg = "";
	loggerInfoTool.info(msg);
};

logger.warn = function(msg) {
	if (msg == null)
		msg = "";
	loggerWarnTool.warn(msg);
};

logger.error = function(msg, exp) {
	if (msg == null)
		msg = "";
	if (exp != null)
		msg += "\r\n" + exp;
	loggerErrorTool.error(msg);
};

setLoggerConfig(loggerConfig);
log4js.configure(loggerConfig);

// 配合express用的方法
exports.use = function(app) {
	app.use(log4js.connectLogger(loggerInfoTool, {
		level : 'auto',
		format : ':method :url'
	}));
}

exports.logger = logger;
