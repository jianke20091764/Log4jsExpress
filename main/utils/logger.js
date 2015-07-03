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
	var defaultAtt = objConfig.logsDir;
	checkAndCreateDir(defaultAtt);
};

var loggerErrorTool = log4js.getLogger('error');
var loggerInfoTool = log4js.getLogger('access');
var loggerPrintTool = log4js.getLogger('record');

logger.info = function(msg) {
	if (msg == null)
		msg = "";
	loggerInfoTool.info(msg);
};

logger.print = function(msg) {
	if (msg == null)
		msg = "";
	loggerPrintTool.info(msg);
};

logger.error = function(msg, exp) {
	if (msg == null)
		msg = "";
	if (exp != null)
		msg += "\r\n" + exp;
	loggerErrorTool.error(msg);
};

log4js.configure(loggerConfig,{
	cwd : loggerConfig.logsDir
});

// 配合express用的方法
exports.connectLogger = function() {
	return log4js.connectLogger(loggerInfoTool, {
		format : loggerConfig.logFormat
	});
}

exports.info = logger.info;
exports.error = logger.error;
exports.print = logger.print;
