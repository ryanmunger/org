const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  }
});

const Organization = db.define('organization', {
  name: {
    type: Sequelize.STRING
  }
});

Organization.belongsTo(User, {});

module.exports = {
  User,
  Organization
};
