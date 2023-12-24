const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: "autoinsta",
  Programmer: "Jonell Magallanes",
  info: "automatic downloads",
  hasPermission: "members",
  category: "utility",
  usages: "",
  cooldowns: 5,
  prefix: "disable",
  noPrefix: function({api, event, target}) {
    const videoLink = target[0];
    const regex = /https:\/\/www\.instagram\.com\/.*\/.*/;

    if (regex.test(videoLink)) {
      const apikey = 'fuck';
      const apiUrl = `https://for-devs.rishadapis.repl.co/api/instadl?url=${videoLink}&apikey=${apikey}`;

      axios.get(apiUrl)
        .then(response => {
          const videoData = response.data;
          const videoBuffer = Buffer.from(videoData, 'base64');

          const savePath = path.join(__dirname, 'cache');
          const fileName = 'insta.mp4';
          const fullPath = path.join(savePath, fileName);

          // Ensure the directory exists
          if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath);
          }

          // Save the video file
          fs.writeFileSync(fullPath, videoBuffer);

          console.log(`Video saved at: ${fullPath}`);

          // Send the video as an attachment
          api.sendMessage({ body: 'Here is your video:', attachment: fs.createReadStream(fullPath) }, message.threadID);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
    }
  },
  letStart: async function ({api, event}) {
    api.sendMessage("hello world", event.threadID);
  }
}
