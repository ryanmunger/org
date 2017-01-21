const router = require('express').Router();
const passport = require('passport');
const Models = require('../app/models');
const helpers = require('../app/helpers');

// Login
router.get('/', (req, res, next) => {
  res.render('pages/login', {
    pageTitle: "Login"
  });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  (req, res, next) => {
    res.redirect('/dashboard');
});

// Register
router.get('/register', (req, res, next) => {
  res.render('pages/register', {
    pageTitle: "Register"
  });
});

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = helpers.generateHash(req.body.password);
  Models.User.sync().then(() => {
    return Models.User.create({
      username,
      password
    }).catch(err => {
      console.log(err);
    });
  });
  res.redirect('/');
});


// Logout
router.get('/logout', helpers.isAuthenticated, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
