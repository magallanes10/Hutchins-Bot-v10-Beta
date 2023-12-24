const fs = require('fs');
const path = require('path');
const request = require('request');

module.exports = {
  name: "owner",
  info: "Show the info of owner",
  hasPermission: "members",
  prefix: "enable",
  category: "info",
  cooldowns: 5,
  letStart: function ({ api, event }) {
    const imageUrl = "https://i.postimg.cc/ZqfGHVJr/New-Project-1241-1402-BBE.png";
    const imagePath = path.join(__dirname, 'cache', 'ownerInfo.png');

    fs.mkdirSync(path.dirname(imagePath), { recursive: true });
    const imageStream = fs.createWriteStream(imagePath);
    request(imageUrl).pipe(imageStream).on('close', () => {
      api.sendMessage(
        {
          body: `𝖮𝗐𝗇𝖾𝗋 𝖮𝖿 𝖧𝗎𝗍𝖼𝗂𝗇𝗌 𝖡𝖮𝖳\n\n𝗡𝗮𝗺𝗲: ${global.harold.owner}\n\n𝗨𝗜𝗗: ${global.harold.adminbot}\n\n𝗟𝗶𝗻𝗸 𝗢𝘄𝗻𝗲𝗿: ${global.harold.ownerlink}`,
          attachment: fs.createReadStream(imagePath),
        },
        event.threadID
      );
    });
  },
};