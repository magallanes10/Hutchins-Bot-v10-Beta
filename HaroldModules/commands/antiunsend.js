module.exports = {
  name: "antiunsend",
  hasPermission: "members",
  prefix: "disable",
  Programmer: "Jonell Magallanes",
  info: "Resends messages that were unsent by a user",
  category: "Utility",
  usages: "N/A",
  cooldowns: 5,

  noPrefix({ api, event }) {
    if (event.type === "message_unsend") {
      const fs = require('fs');
      const logFilePath = './logs.json';

      let chatLogs = {};
      if (fs.existsSync(logFilePath)) {
        chatLogs = JSON.parse(fs.readFileSync(logFilePath, 'utf8'));
      }

      if (chatLogs[event.threadID]) {
        const unsentMessage = chatLogs[event.threadID].find(m => m.messageID === event.messageID);
        if (unsentMessage && unsentMessage.senderID === event.senderID) {
          api.sendMessage(unsentMessage, event.threadID);
        }
      }
    }
  }
};