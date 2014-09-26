/**
* Our common Node.js settings.
*/


var winston = require("winston");

//
// Set up our console logger.
//
var level = "info";
//var level = "debug";

var options = {
	colorize: true,
	timestamp: true,
	level: level,
	};
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, options)

//
// Set environment to "test"
//

process.env.NODE_ENV = "test";


