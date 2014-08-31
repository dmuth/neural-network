/**
* Our common Node.js settings.
*/


var winston = require("winston");

//
// Set up our console logger.
//
var options = {
	colorize: true,
	timestamp: true,
	level: "info"
	};
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, options)


