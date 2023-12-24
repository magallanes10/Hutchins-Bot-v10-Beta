const login = require ("node-ainzfb-new");
const cron = require('node-cron');
const axios = require("axios");
const fs = require("fs");
require("./index.js");
const gradient = require('gradient-string');
const { join } = require("path");
const moment = require("moment-timezone");
const { readFileSync, existsSync, appendFileSync } = require("fs");
const handler = require("./handlers/handler");
const CooldownHandler = require("./handlers/cooldowns");
const config = require("./config.json");


console.log(gradient.instagram('[ PREPARING DEPLOYING VARIABLES ]'));
const cooldowns = new CooldownHandler();
const timeFormat = "HH:mm:ss DD/MM/YYYY";
const logsPath = 'data/user_logs.txt';


global.harold = {
  config: "config.json",
  adminbot: config.AdminBot,
  ad: config.ad,
  prefix: config.prefix,
  name: config.name,
  setOpt: config.setOpt,
  shotiCron: config.shotiCron,
  autoseen: config.autoseen,
  owner: config.BotOwner,
  ownerlink: config.ownerLink,
  api: {
    commands: {}
  },
  cooldowns: cooldowns,
  getCurrentPrefix: () => global.harold.prefix,

  hasPermission: function(member, commandName) {
    const command = this.api.commands[commandName];
    if (!command) return false;
    if (command.hasPermission === 'adminbot') return this.adminbot.includes(member.id);

    switch (command.hasPermission) {
      case 'anyone':
        return true;
      case 'members':
        return member.isMember;
      case 'admin':
        return member.isAdmin;
      default:
    }
  }
};


function getCurrentTime() {
  return moment.tz("Asia/Manila").format(timeFormat);
}

function logMessageToFile(message) {
  const timestamp = getCurrentTime();
  const logEntry = `${timestamp} - ${message}\n`;
  appendFileSync(logsPath, logEntry, 'utf8');
}

function createGradientString(text, colors) {
  const gradient = require('gradient-string');
  const applyGradient = gradient(...colors);
  return applyGradient(text);
}

const text = `[ HAROLD HUTCHINS ] - LOGGING IN AT ${getCurrentTime()}`;
const coloredText = createGradientString(text, ['#FFD700', '#FF8C00']); // Gold to Orange gradient
console.log(coloredText);
console.log(gradient.instagram('[ OK | CONFIG JSON FOUNDED! ]'));
const appStatePath = 'Haroldstate.json';
if (existsSync(appStatePath)) {
  const appState = readFileSync(appStatePath, 'utf8');
  if (appState) {
    login({ appState: JSON.parse(appState) }, (err, api) => {
      if (err) {
        console.error(`Failed to login: ${err}`);
        return;
      }


      // Emitter to prevent spamming during cron auto message sending

      const gradient = require('gradient-string');
      console.log(gradient('lightblue', 'green')('[ HAROLD HUTCHINS ] - INSTALLING COMMANDS'));
      const commandsPath = join(__dirname, "HaroldModules/commands");
      const eventsPath = join(__dirname, "HaroldModules/events");

      handler.loadCommand(api, commandsPath, global.harold.prefix);
      console.log(gradient.instagram('EVENT COMMAND INSTALLING'));
      handler.loadEvents(api, eventsPath);

      function getCurrentTime() {
        return new Date().toLocaleTimeString();
      }

      console.log(gradient('lightblue', 'violet')(`Bot has successfully logged in at ${getCurrentTime()}`));
      console.log(gradient('lightblue', 'white')('[ HAROLD HUTCHINS ] - INSTALLATION COMPLETE'));

      const moment = require('moment-timezone'); // Make sure to have moment-timezone installed

      var pogi = moment().tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY");
      //*api.sendMessage(`Bot has been activated at [ ${pogi} ]`, global.harold.adminbot);

      const newBio = `Prefix: ${global.harold.prefix}\nBot Name: ${global.harold.name}\nBot Owner: ${global.harold.owner}\n\n🟢 Active: ${pogi}`

      api.changeBio(newBio, (err) => {
        if (err) {
          // Handle error
          console.error('Failed to change bio:', err);
      //*  } else {
          // Bio changed successfully
          console.log(gradient('lightblue', 'green')('『 BOT BIO HAS BEEN CHANGED 』'));
    }
          });
      console.log(gradient.instagram('[ OK | TIKTOK DOWNLOAD AUTO ]'));

      console.log(gradient.instagram('[ OK | GOOGLE DRIVE AUTO DOWNLOAD ]'));

      console.log(gradient.instagram('[ OK | YOUTUBE DOWNLOAD AUTO ]'));

      console.log(gradient.instagram('[ OK | FACEBOOK DOWNLOAD AUTO ]'));

      console.log(gradient.instagram('[ OK | SHOTI CRON ]'));

      console.log(gradient.instagram('[ MODERTE  | AUTO REACT ]'));

      console.log(gradient.instagram('[ DISABLE | AUTO GREET ]'));

      console.log(gradient.instagram('[ THIS BOT MADE BY JONELL MAGALLANES  ]'));
      console.log(gradient.instagram('█░█ ▄▀█ █▀█ █▀█ █░░ █▀▄\n█▀█ █▀█ █▀▄ █▄█ █▄▄ █▄▀'));

      console.log(gradient.instagram(`╭─❍\nBOT NAME: ${global.harold.name}`));
      console.log(gradient.instagram(`PREFIX: ${global.harold.prefix}`));
      console.log(gradient.instagram(`ADMINBOT: ${global.harold.adminbot}`));
      console.log(gradient.instagram(`OWNER: ${global.harold.owner}\n╰───────────⟡`));

      class ThreadController {
        constructor(threadService) {
          this.threadService = threadService;
        }

        async createThread(userId, thread) {
          return await this.threadService.createThread(userId, thread);
        }

        async getThreadById(threadId) {
          return await this.threadService.getThreadById(threadId);
        }

        async updateThread(threadId, thread) {
          return await this.threadService.updateThread(threadId, thread);
        }

        async deleteThread(threadId) {
          return await this.threadService.deleteThread(threadId);
        }
      }

      module.exports = ThreadController;

      api.setOptions(global.harold.setOpt);

      global.harold.api = api;

      api.listenMqtt(async (err, event) => {
        if (err) return console.error(err);

        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database('main_bot_system.sqlite');

        // Create the 'items' table if it doesn't exist
        db.serialize(() => {
          db.run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT
    )
  `);
        });

        module.exports = db;

        //*joinnoti here
        if (event.body !== null) {
          // Check if the message type is log:subscribe
          if (event.logMessageType === "log:subscribe") {
            const request = require("request");
            const fs = require("fs-extra");
            const { threadID } = event;

            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
              api.changeNickname(`» ${global.harold.prefix} « ${(!global.harold.name) ? " " : global.harold.name}`, threadID, api.getCurrentUserID());
              return api.sendMessage(`✅ | ${global.harold.name} HAS BEEN CONNECTED FROM THIS THREAD\n\nPrefix:${global.harold.prefix}\n\n👷 Developer: ${global.harold.owner}`, threadID);
            } else {
              try {
                const fs = require("fs-extra");
                let { threadName, participantIDs } = await api.getThreadInfo(threadID);

                var mentions = [], nameArray = [], memLength = [], i = 0;

                let addedParticipants1 = event.logMessageData.addedParticipants;
                for (let newParticipant of addedParticipants1) {
                  let userID = newParticipant.userFbId;
                  api.getUserInfo(parseInt(userID), (err, data) => {
                    if (err) { return console.log(err); }
                    var obj = Object.keys(data);
                    var userName = data[obj].name.replace("@", "");
                    if (userID !== api.getCurrentUserID()) {

                      nameArray.push(userName);
                      mentions.push({ tag: userName, id: userID, fromIndex: 0 });

                      memLength.push(participantIDs.length - i++);
                      memLength.sort((a, b) => a - b);

                      (typeof threadID.customJoin == "undefined") ? msg = "BONJOUR!, {uName}\n┌────── ～●～ ──────┐\n----- Welcome to {threadName} -----\n└────── ～●～ ──────┘\nYou're the {soThanhVien} member of this group, please enjoy! 🥳♥" : msg = threadID.customJoin;
                      msg = msg
                        .replace(/\{uName}/g, nameArray.join(', '))
                        .replace(/\{type}/g, (memLength.length > 1) ? 'you' : 'Friend')
                        .replace(/\{soThanhVien}/g, memLength.join(', '))
                        .replace(/\{threadName}/g, threadName);


                      let callback = function() {
                        return api.sendMessage({ body: msg, attachment: fs.createReadStream(__dirname + `/cache/come.jpg`), mentions }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/come.jpg`))
                      };
                      request(encodeURI(`https://api.popcat.xyz/welcomecard?background=https://i.ibb.co/P6k0Q4B/images-2023-12-05-T213426-636.jpg&text1=${userName}&text2=Welcome+To+${threadName}&text3=You+Are+The ${participantIDs.length}th+Member&avatar=https://i.postimg.cc/7ZxG6XrH/images-2023-12-14-T220221-504.jpg`)).pipe(fs.createWriteStream(__dirname + `/cache/come.jpg`)).on("close", callback);
                    }
                  })
                }
              } catch (err) {
                return console.log("ERROR: " + err);
              }
            }
          }
        }
        if (event.body !== null) {
          if (event.logMessageType === "log:unsubscribe") {
            api.getThreadInfo(event.threadID).then(({ participantIDs }) => {
              let leaverID = event.logMessageData.leftParticipantFbId;
              api.getUserInfo(leaverID, (err, userInfo) => {
                if (err) {
                  return console.error('Failed to get user info:', err);
                }
                const name = userInfo[leaverID].name;
                const type = (event.author == event.logMessageData.leftParticipantFbId) ? "left the group." : "kicked by Admin of the group"; api.sendMessage(`${name} has ${type} the group.`, event.threadID);
              });
            })
          }
        }

        //*Tiktok Autodownloader here\\*
        if (event.body !== null) {
          const regEx_tiktok = /https:\/\/(www\.|vt\.)?tiktok\.com\//;
          const link = event.body;
          if (regEx_tiktok.test(link)) {
            api.setMessageReaction("📥", event.messageID, () => { }, true);
            axios.post(`https://www.tikwm.com/api/`, {
              url: link
            }).then(async response => { // Added async keyword
              const data = response.data.data;
              const videoStream = await axios({
                method: 'get',
                url: data.play,
                responseType: 'stream'
              }).then(res => res.data);
              const fileName = `TikTok-${Date.now()}.mp4`;
              const filePath = `./${fileName}`;
              const videoFile = fs.createWriteStream(filePath);

              videoStream.pipe(videoFile);

              videoFile.on('finish', () => {
                videoFile.close(() => {
                  console.log('Downloaded video file.');

                  api.sendMessage({
                    body: `𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖳𝗂𝗄𝖳𝗈𝗄 \n\n𝙲𝚘𝚗𝚝𝚎𝚗𝚝: ${data.title}\n\n𝙻𝚒𝚔𝚎𝚜: ${data.digg_count}\n\n𝙲𝚘𝚖𝚖𝚎𝚗𝚝𝚜: ${data.comment_count}\n\n𝗛𝗨𝗧𝗖𝗛𝗜𝗡𝗦 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃`,
                    attachment: fs.createReadStream(filePath)
                  }, event.threadID, () => {
                    fs.unlinkSync(filePath);  // Delete the video file after sending it
                  });
                });
              });
            }).catch(error => {
              api.sendMessage(`Error when trying to download the TikTok video: ${error.message}`, event.threadID, event.messageID);
            });
          }
          //*Auto Download Google Drive here By Jonell Magallanes//*
        }
        if (event.body !== null) {
          (async () => {
            const fs = require('fs');
            const { google } = require('googleapis');
            const mime = require('mime-types');
            const path = require('path');

            const apiKey = 'AIzaSyCYUPzrExoT9f9TsNj7Jqks1ZDJqqthuiI'; // Your API key
            if (!apiKey) {
              console.error('No Google Drive API key provided.');
              return;
            }

            const drive = google.drive({ version: 'v3', auth: apiKey });

            // Regex pattern to detect Google Drive links in messages
            const gdriveLinkPattern = /(?:https?:\/\/)?(?:drive.google.com\/(?:folderview\?id=|file\/d\/|open\?id=))([\w-]{33}|\w{19})(&usp=sharing)?/gi;
            let match;

            // Specify the directory to save files
            const downloadDirectory = path.join(__dirname, 'downloads');


            while ((match = gdriveLinkPattern.exec(event.body)) !== null) {
              // Extract fileId from Google Drive link
              const fileId = match[1];

              try {
                const res = await drive.files.get({ fileId: fileId, fields: 'name, mimeType' });
                const fileName = res.data.name;
                const mimeType = res.data.mimeType;

                const extension = mime.extension(mimeType);
                const destFilename = `${fileName}${extension ? '.' + extension : ''}`;
                const destPath = path.join(downloadDirectory, destFilename);

                console.log(`Downloading file "${fileName}"...`);

                const dest = fs.createWriteStream(destPath);
                let progress = 0;

                const resMedia = await drive.files.get(
                  { fileId: fileId, alt: 'media' },
                  { responseType: 'stream' }
                );

                await new Promise((resolve, reject) => {
                  resMedia.data
                    .on('end', () => {
                      console.log(`Downloaded file "${fileName}"`);
                      resolve();
                    })
                    .on('error', (err) => {
                      console.error('Error downloading file:', err);
                      reject(err);
                    })
                    .on('data', (d) => {
                      progress += d.length;
                      process.stdout.write(`Downloaded ${progress} bytes\r`);
                    })
                    .pipe(dest);
                });

                console.log(`Sending message with file "${fileName}"...`);
                // Use the fs.promises version for file reading
                await api.sendMessage({ body: `𝖠𝗎𝗍𝗈 𝖽𝗈𝗐𝗇 𝖦𝗈𝗈𝗀𝗅𝖾 𝖣𝗋𝗂𝗏𝖾 𝖫𝗂𝗇𝗄 \n\n𝙵𝙸𝙻𝙴𝙽𝙰𝙼𝙴: ${fileName}\n\n𝗛𝗨𝗧𝗖𝗛𝗜𝗡𝗦 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃`, attachment: fs.createReadStream(destPath) }, event.threadID);

                console.log(`Deleting file "${fileName}"...`);
                await fs.promises.unlink(destPath);
                console.log(`Deleted file "${fileName}"`);
              } catch (err) {
                console.error('Error processing file:', err);
              }
            }
          })();
        }

        //* autoseen here
        // Check the autoseen setting from config and apply accordingly
        if (event.body !== null) {
          api.markAsReadAll(() => { });
        }
        //*youtube auto down here
        if (event.body !== null) {
          const ytdl = require('ytdl-core');
          const fs = require('fs');
          const path = require('path');
          const simpleYT = require('simple-youtube-api');

          const youtube = new simpleYT('AIzaSyCMWAbuVEw0H26r94BhyFU4mTaP5oUGWRw');

          const youtubeLinkPattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

          const videoUrl = event.body;

          if (youtubeLinkPattern.test(videoUrl)) {
            youtube.getVideo(videoUrl)
              .then(video => {
                const stream = ytdl(videoUrl, { quality: 'highest' });


                const filePath = path.join(__dirname, `./downloads/${video.title}.mp4`);
                const file = fs.createWriteStream(filePath);


                stream.pipe(file);

                file.on('finish', () => {
                  file.close(() => {
                    api.sendMessage({ body: `𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖸𝗈𝗎𝖳𝗎𝖻𝖾 \n\n𝗛𝗨𝗧𝗖𝗛𝗜𝗡𝗦 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃`, attachment: fs.createReadStream(filePath) }, event.threadID, () => fs.unlinkSync(filePath));
                  });
                });
              })
              .catch(error => {
                console.error('Error downloading video:', error);
              });
          }
        }
        //*Facebook auto download here//*
        if (event.body !== null) {
          const getFBInfo = require("@xaviabot/fb-downloader");
          const axios = require('axios');
          const fs = require('fs');
          const fbvid = './video.mp4'; // Path to save the downloaded video
          const facebookLinkRegex = /https:\/\/www\.facebook\.com\/\S+/;

          const downloadAndSendFBContent = async (url) => {
            try {
              const result = await getFBInfo(url);
              let videoData = await axios.get(encodeURI(result.sd), { responseType: 'arraybuffer' });
              fs.writeFileSync(fbvid, Buffer.from(videoData.data, "utf-8"));
              return api.sendMessage({ body: "𝖠𝗎𝗍𝗈 𝖣𝗈𝗐𝗇 𝖥𝖺𝖼𝖾𝖻𝗈𝗈𝗄 𝖵𝗂𝖽𝖾𝗈\n\n𝗛𝗨𝗧𝗖𝗛𝗜𝗡𝗦 𝗕𝗢𝗧 𝟭.𝟬.𝟬𝘃", attachment: fs.createReadStream(fbvid) }, event.threadID, () => fs.unlinkSync(fbvid));
            }
            catch (e) {
              return console.log(e);
            }
          };

          if (facebookLinkRegex.test(event.body)) {
            downloadAndSendFBContent(event.body);
          }
        }
        if (event.body !== null && event.body === `${global.harold.prefix}unsend`) {
          if (!event.messageReply || event.type !== "message_reply" || event.messageReply.senderID != api.getCurrentUserID()) {
            return api.sendMessage("Can't unsend message.", event.threadID, event.messageID);
          }
          return api.unsendMessage(event.messageReply.messageID);
        }
        //shoti cron

        if (event.body !== null) {
          if (event.isNickname && event.isNicknameFrom && event.senderID === botUserID) {
            api.changeNickname(`${global.harold.name} • [${global.harold.prefix}]`, event.threadID);
            api.sendMessage("Changing the bot's nickname is not allowed in this group chat.", event.threadID);
          }
        }
        if (event.body !== null && event.isGroup) {
          if (Math.random() < 0.9) {
            axios.get(`https://school-project-lianefca.bene-edu-ph.repl.co/autoreact?query=${encodeURIComponent(event.body)}`)

              .then(response => {
                const emoji = response.data.message;
                api.setMessageReaction(emoji, event.messageID, () => { }, true);
              })
              .catch(error => {
                console.error('Error fetching auto reaction:', error);
              });
          }
        }
        if (event.body !== null) {
          if (event.body === "bot") {
            const responses = [
              "Hello there!",
              "Greetings, how can I assist you?",
              "Hey, what's up?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return api.sendMessage(randomResponse, event.threadID, event.messageID);
            // send the random response
          }
          if (event.body === `${global.harold.name}`) {
            const responses = [
              "Hello there!",
              "Greetings, how can I assist you?",
              "Hey, what's up?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return api.sendMessage(randomResponse, event.threadID, event.messageID);
          }
          if (event.body === "Bot") {
            const responses = [
              "Hello there!",
              "Greetings, how can I assist you?",
              "Hey, what's up?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return api.sendMessage(randomResponse, event.threadID, event.messageID);
          }
          if (event.body === `@${global.harold.name}`) {
            const responses = [
              "Hello there!",
              "Greetings, how can I assist you?",
              "Hey, what's up?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            return api.sendMessage(randomResponse, event.threadID, event.messageID);
            // send the random response
          }
        }
        //*const chalk = require('chalk')
        //*if (event.body !== null) {
        //* var time = moment.tz("Asia/Manila").format("LLLL");

        // Getting the thread info

        // Skip logging if it's a message from the bot itself
        //* if (event.senderID === api.getCurrentUserID()) return;
        //*const threadID = event.threadID;
        //*const body = event.body;
        // const senderID = event.senderID;

        // Skip logging if the console is turned off for the thread
        //const threadInfo = await api.getThreadInfo(event.threadID);

        // const gradientText = (text) => gradient('cyan', 'pink')(text);
        // const boldText = (text) => chalk.bold(text);
        //console.log(gradientText("━━━━━━━━━━[ DATABASE THREADS BOT LOGS ]━━━━━━━━━━"));
        //*console.log(gradientText("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"));
        //*console.log(`${boldText(gradientText(`┣➤ Group: ${threadInfo}`))}`);
        //*console.log(`${boldText(gradientText(`┣➤ Group ID: ${threadID}`))}`);
        //console.log(`${boldText(gradientText(`┣➤ User ID: ${senderID}`))}`);
        //console.log(`${boldText(gradientText(`┣➤ Content: ${body || "N/A"}`))}`);
        //console.log(`${boldText(gradientText(`┣➤ Time: ${time}`))}`);
        //console.log(gradientText("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"));
        if (event.body !== null) {
          const pastebinLinkRegex = /https:\/\/pastebin\.com\/raw\/[\w+]/;
          if (pastebinLinkRegex.test(event.body)) {
            api.getThreadInfo(event.threadID, (err, info) => {
              if (err) {
                console.error('Failed to get thread info:', err);
                return;
              }
              const threadName = info.threadName;
              api.sendMessage({
                body: `📜 | 𝗣𝗔𝗦𝗧𝗘𝗕𝗜𝗡 𝗗𝗘𝗧𝗘𝗖𝗧𝗘𝗗 𝗢𝗡\n\n𝖳𝗁𝗋𝖾𝖺𝖽: ${threadName}\nUser: ${event.senderID}\n\n𝖫𝗂𝗇𝗄:\n\n${event.body}`,
                url: event.body
              }, global.harold.adminbot);
            });
          }
        }

        // models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('./data/database.js'); // Assume you have a config folder with a database.js file

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
            const getMessages = async (groupId, page = 1, pageSize = 10) => {
      try {
        const offset = (page - 1) * pageSize;

        const messages = await Message.findAll({
          where: { groupId },
          order: [['createdAt', 'DESC']],
          limit: pageSize,
          offset,
        });

        return messages;
      } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }
    };

        logMessageToFile(`User: ${event.senderID}, Message: ${event.body}`);
        if (!event.body || event.type !== "message") return;

        const message = event.body.trim();
        const groupID = event.threadID;
        const messageDATA = event.messageID;
        const senderID = event.senderID;
        const pushMessage = {
          reply: (form) => api.sendMessage(form, event.threadID, event.messageID),
          send: (form) => api.sendMessage(form, event.threadID),
          reaction: (emoji) => api.setMessageReaction(emoji, event.messageID, () => { }, true)

        }

        let commandBody, target, commandName;
        if (message.startsWith(global.harold.prefix)) {
          commandBody = message.slice(global.harold.prefix.length).trim();
          target = commandBody.split(/\s+/);
          commandName = target.shift().toLowerCase();

          if (global.harold.api.commands[commandName]) {
            if (!global.harold.hasPermission({ id: senderID, isMember: true, isAdmin: true }, commandName)) {
              return api.sendMessage(`🛡️ | You do not have permission to use this command: "${commandName}"`, groupID, messageDATA);
            }

            if (global.harold.api.commands[commandName].prefix === "disable") {
              return api.sendMessage(`✒️ | The command "${commandName}" does not require a prefix.`, groupID, messageDATA);
            }
          } else if (global.harold.api.commands[commandName]) {
            return api.sendMessage(`⚙️ | Command "${commandName}" not found or has no usePrefix configured, please check the code.`, groupID, messageDATA);
          } else {
            return api.sendMessage(`The Command "${commandName}" not found! type ${global.harold.prefix}help to see all commands`, groupID, messageDATA);
          }
        } else {
          // Check if a command is called without the prefix
          target = message.split(/\s+/);
          commandName = target.shift().toLowerCase();
          commandBody = message.trim();
          Object.keys(global.harold.api.commands).forEach(commandName => {
            const targetFunc = global.harold?.api?.commands[commandName]?.noPrefix;
            if (typeof targetFunc === "function") {
              targetFunc({ api, event, target, commandBody, pushMessage });
            }
          });
          // Handle command without prefix and reply to commands
          Object.keys(global.harold.api.commands).forEach(command => {
            const commandData = global.harold.api.commands[command];
            if (typeof commandData.Reply === 'function' && commandBody.startsWith(command)) {
              commandData.Reply({ api, event, target, commandBody, pushMessage });
            }
            if (typeof commandData.reply === 'function' && event.messageReply && event.messageReply.messageID) {
              const replyCommand = event.body.slice(global.harold.prefix.length).trim().split(/\s+/)[0].toLowerCase();
              if (replyCommand === command) {
                commandData.reply({ api, event, target, commandBody, pushMessage });
              }
            }
          });

          if (global.harold.api.commands.hasOwnProperty(commandName)) {
            if (!global.harold.hasPermission({ id: senderID, isMember: true, isAdmin: true }, commandName)) {
              return api.sendMessage(`🛡️ | You have no permission granted to use this command "${commandName}"`, groupID, messageDATA);
            }

            if (global.harold.api.commands[commandName].prefix === "enable") {
              return api.sendMessage(`📝 | The command "${commandName}" requires the prefix "${global.harold.prefix}" to be executed.`, groupID, messageDATA);
            }
          }
        }

        const commandCooldown = global.harold.cooldowns.checkCooldown(senderID, commandName);
        if (commandCooldown) {
          const duration = global.harold.cooldowns.getCooldownRemaining(senderID, commandName);
          api.sendMessage(`⏱️ | The command you used "${commandName}" has a cooldown, just wait for ${duration / 1000} seconds.`, groupID, messageDATA);
          return;
        }

        if (global.harold.api.commands[commandName]) {
          const commandModule = require(join(commandsPath, `${commandName}.js`));
          const cooldownDuration = commandModule.cooldowns * 1000;
          global.harold.api.commands[commandName].letStart({ api, event, target, commandBody, pushMessage , getMessages}); global.harold.cooldowns.setCooldown(senderID, commandName, cooldownDuration);
        }
      })
    })
    process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

const restartCron = cron.schedule('0 */2 * * *', () => {
  console.log('Scheduled restart initiated.');
  // Perform cleanup or any other required operations before restart

  // Exit the process
  process.exit(1);
}, {
  scheduled: true,
  timezone: "Asia/Manila"
});

function handleGracefulRestart() {
  restartCron.stop(); // Stop the cron job
  console.log('Graceful restart handler invoked. Preparing to restart...');

  restartCron.start();
}

module.exports.handleGracefulRestart = handleGracefulRestart;
const { Sequelize, sequelize } = require('./database.sqlite');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Define models for users and threads
    const User = sequelize.define('User', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING,
      threadID: Sequelize.STRING
    });

    const Thread = sequelize.define('Thread', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING,
      userID: Sequelize.STRING
    });

    // Sync all models with the database
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();


  } else {
    console.error(`${appStatePath} is empty. Please check your 'Haroldstate.json' file.`);
  }
} else {
  console.error(`${appStatePath} does not exist. Please check your 'Haroldstate.json' file.`);
} 