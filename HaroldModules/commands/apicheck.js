const apiCheck = require('api-check');

module.exports = {
  name: 'apicheck',
  hasPermission: 'members',
  Programmer: 'Jonell Magallanes',
  info: 'Check the status of an API link',
  category: 'Custom',
  usages: 'apicheck [api_link]',
  cooldowns: 5,
  prefix: 'disable',

  letStart: async function ({ target, pushMessage }) {
    if (!target[0]) {
      return pushMessage.reply('Please provide an API link to check.');
    }

    const apiLink = target[0];

    // Make sure to pass an object with a 'url' property
    const apiCheckObject = { url: apiLink };

    apiCheck(apiCheckObject)
      .then((response) => {
        const apiCheckData = response.apiCheckData || {};
        const statusMessage = `You passed:\n"${apiLink}"\n\nWith the type:\n"${apiCheckData.type}"\n\nThe API calls for:\n${JSON.stringify(apiCheckData.calls, null, 2)}`;
        pushMessage.reply(statusMessage);
      })
      .catch((error) => {
        // Handle errors
        pushMessage.reply(`Error checking API: ${error.message}`);
      });
  },
};
