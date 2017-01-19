const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const db = require('../db');
const helpers = require('../helpers');

module.exports = () => {
  passport.use(new Strategy((username, password, cb) => {
    helpers.findByUsername(username, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb(null, false);
      if (!helpers.validPassword(password, user.password)) return cb(null, false);
      return cb(null, user);
    })
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    helpers.findById(id, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
}
