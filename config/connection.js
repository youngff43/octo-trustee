const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
let sequelize;

// using Herokus variable to connect
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  
// if you cant connect to Heroku then use the localhost config 
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;