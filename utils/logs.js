const gradient= require('gradient-string');
const chalkAnimation = require('chalkercli');
const color = gradient('blue', 'purple');
const crayon = gradient('yellow', 'lime', 'green');
const ok = gradient("cyan", "yellow", "blue")
const blu = gradient("#243aff", "#ADD8E6", "#5800d4");
const red = gradient("green", "blue", "cyan")
const sky = gradient('#0905ed','#346eeb', '#344feb'); //{err, error, warn, commands, events, loader}
module.exports.error = (text, type) => {
	process.stderr.write(blu(`Error - `) + text + '\n');
};

module.exports.err = (text, type) => {
  process.stderr.write(blu(`Error - `) + text) + '\n';
};

module.exports.warn = (text, type) => {
	process.stderr.write(blu(`[HUTCHINS] - ` + text + '\n'));
};

module.exports.commands = (text, type) => {
	process.stderr.write(ok(`[HUTCHINS] - ` + text+'\n'));
};
module.exports.command = (text, type) => {
	process.stderr.write(ok(text+'\n'));
};
module.exports.hm = (text, type) => {
	process.stderr.write(blu(text+'\n'));
};
module.exports.events = (text, type) => {
	process.stderr.write(blu(`Event - `) + text + '\n');
};

module.exports.warn = (text, type) => {
	process.stderr.write(red(`[HUTCHINS] - ` + text + '\n'));
};

module.exports.loader = (data, option) => {
	switch (option) {
		case "Warn":
			process.stderr.write(crayon(`Warn - `) + data + '\n');
			break;
		case "Error":
			process.stderr.write(crayon(`Error - `) + data + '\n');
			break;
		default:
			process.stderr.write(blu(`Deku - `) + data + '\n');
			break;
  }
}
/* This is simple bot only made by Deku, please don't steal it without credits :(
if you're encounter any error or bug, contact me at https://facebook.com/joshg101
*/
