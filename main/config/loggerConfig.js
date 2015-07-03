var path = require("path");
var logsPath = path.join(__dirname, "..", "..", "logs");
var pattern = 'yyyy-MM-dd';

module.exports = {
	"logsDir" : logsPath,
	"appenders" : [ {
		"type" : "console",
		"category" : "console"
	}, {
		"type" : "dateFile",
		"filename" : "access.log",
		"pattern" : pattern,
		"category" : "access",
		"backups" : 3,
		"level" : "LOG"
	}, {
		"type" : "dateFile",
		"filename" : "error.log",
		"pattern" : pattern,
		"backups" : 3,
		"category" : "error"
	}, {
		"type" : "dateFile",
		"filename" : "record.log",
		"pattern" : pattern,
		"category" : "record",
		"level" : "LOG"
	} ],

	"replaceConsole" : true ,
	
	"logFormat" : ':req[x-real-ip] - -":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" - :req[x-real-ip]'
};