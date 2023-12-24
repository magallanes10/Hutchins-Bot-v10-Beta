const axios = require('axios');
const fs = require("fs");

module.exports = {
  name: "gdrandom",
  hasPermission: "members",
  Programmer: "Jonell Magallanes",
  info: "random video of geometery dash from TikTok",
  Category: "media",
  cooldowns: 20,
  prefix: "enable",
  letStart: async function({ api, event }) {
    api.sendMessage("⏱️ | Sending Random video Geometry Dash Just Please wait...", event.threadID, event.messageID);
    api.setMessageReaction("⏱️", event.messageID, () => {}, true);
    const response = await axios.get('https://hpdj3c-5000.csb.app/gd', {
      responseType: 'arraybuffer'
    }).catch(error => {
      api.sendMessage("Error fetching video.", event.threadID, event.messageID);
      console.error(error);
      return;
    });

    if (response && response.status === 200) {
      const filePath = __dirname + "/cache/gd.mp4";
      fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'), "binary");
      api.setMessageReaction("✅", event.messageID, () => {}, true);
      const tid = event.threadID;
      api.sendMessage({
        body: `Here's your Random Video of Geometry dash from TikTok\n\nID:${tid}`,
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
    } else {
      api.sendMessage("Failed to retrieve a video.", event.threadID, event.messageID);
      api.setMessageReaction("🔭", event.messageID, () => {}, true);
    }
  }
};