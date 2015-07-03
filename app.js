/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var loggerConfig = require("./main/config/loggerConfig");
var logger = require("./main/utils/logger");
var app = express();

//var accessLogfile = fs.createWriteStream(path.join(loggerConfig.customBaseDir, 'access.log'),{
//	flags : 'a'
//});
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
//app.use(express.logger({
//	stream : accessLogfile
//}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(logger.connectLogger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

process.on('uncaughtException', function(err) {	
	logger.error('UncaughtException : ' + err.stack);
});

process.on('error', function(err) {
	logger.error('Error : ' + err.stack);
});

http.createServer(app).listen(app.get('port'), function() {
	logger.print('Express server listening on port ' + app.get('port'));
});


