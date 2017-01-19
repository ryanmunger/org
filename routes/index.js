const router = require('express').Router();
const passport = require('passport');
const User = require('../app/models');
const helpers = require('../app/helpers');

router.get('/', (req, res, next) => {
  res.render('pages/login', {
    pageTitle: "Login"
  });
});

router.get('/dashboard', helpers.isAuthenticated, (req, res, next) => {
  res.render('pages/dashboard', {
    pageTitle: "Dashboard",
    user: req.user
  });
});

router.get('/register', (req, res, next) => {
  res.render('pages/register', {
    pageTitle: "Register"
  });
});

router.get('/logout', helpers.isAuthenticated, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/'}),
  (req, res, next) => {
    res.redirect('/dashboard');
})

router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = helpers.generateHash(req.body.password);
  User.sync().then(() => {
    return User.create({
      username,
      password
    })
  });
  res.redirect('/');
});

module.exports = router;
