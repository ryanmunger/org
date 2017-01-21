const Models = require('../models');
const bcrypt = require('bcrypt');

const findById = (id, cb) => {
  Models.User.findById(id).then(user => {
    cb(null, user);
  }).catch(err => {
    cb(new Error(`User ${id} does not exist`));
  });
}

const findByUsername = (username, cb) => {
  Models.User.findOne({
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
