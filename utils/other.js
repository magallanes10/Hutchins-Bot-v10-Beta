const axios = require("axios")
module.exports.dlImage = async function (url, path) {
	const { createWriteStream } = require('fs');

	const response = await axios({
		method: 'GET',
		responseType: 'stream',
		url
	});

	const writer = createWriteStream(path);

	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	});
};
/* This is simple bot only made by Deku, please don't steal it without credits :(
if you're encounter any error or bug, contact me at https://facebook.com/joshg101
*/