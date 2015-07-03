var path = require("path");
var logsPath = path.join(__dirname, "..", "..", "logs");

module.exports = {
	"customBaseDir" : logsPath,
	"customDefaultAtt" : {
		"type" : "dateFile",
		"absolute" : true,
		"alwaysIncludePattern" : true
	},
	"appenders" : [ {
		"type" : "console",
		"category" : "console"
	}, {
		"type" : "file", 
		"filename" : path.join(logsPath,"access.log"),
		"backups" : 3,
		"pattern" : "yyyy-MM-dd-hh.log",
		"category" : "normal"
	} ],
	"replaceConsole" : true
};