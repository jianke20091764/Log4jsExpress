/*
 * GET home page.
 */

var logger = require("../main/utils/logger").logger;
exports.index = function(req, res) {
	logger.info(req.url);
	res.render('index', {
		title : 'Express'
	});
};