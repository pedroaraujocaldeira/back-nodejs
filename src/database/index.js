const Sequelize = require('sequelize');
const database = require('../config/database');

const User = require('../models/User');
const Session = require('../models/Session');

// const connection = new Sequelize(database.database, database.username, database.password, database);
const connection = new Sequelize(database.url, database);

User.init(connection);
Session.init(connection);
Session.associate(connection.models);

module.exports = connection;
