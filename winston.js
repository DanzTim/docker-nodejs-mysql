const winston = require('winston');
const expressWinston = require('express-winston');

expressWinston.requestWhitelist.push('body');
const wistonMiddleware = expressWinston.logger({
	transports: [
		new winston.transports.Console({
			json: true,
			colorize: true,
		}),
	],
	// optional: control whether you want to log the meta data about the request (default to true)
	meta: true,
	// optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
	// msg: 'HTTP {{req.method}} {{req.url}} {{req.path}}',
	// Use the default Express/morgan request formatting, with the same colors.
	// Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
	expressFormat: true,
	// Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
	colorStatus: true,
	ignoreRoute: function (req, res) {
		return false;
	}, // optional: allows to skip some log messages based on request and/or response
});

module.exports = wistonMiddleware;
