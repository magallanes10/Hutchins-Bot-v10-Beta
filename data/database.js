const { Sequelize } = require('sequelize');

// Set up a new database
// The database is stored as a sqlite file named 'database.sqlite'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false // Disable logging; default is console.log
});

module.exports = sequelize;