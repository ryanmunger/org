const User = require('../models');
const bcrypt = require('bcrypt');

const findById = (id, cb) => {
  User.findById(id).then(user => {
    cb(null, user);
  }).catch(err => {
    cb(new Error(`User ${id} does not exist`));
  });
}

const findByUsername = (username, cb) => {
  User.findOne({
    where: {
      username
    }
  }).then(user => {
    cb(null, user);
  }).catch(err => {
    cb(null, null);
  })
}

const generateHash = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

const validPassword = (localPassword, password) => {
  return bcrypt.compareSync(localPassword, password);
}

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  findById,
  findByUsername,
  generateHash,
  validPassword,
  isAuthenticated
}
