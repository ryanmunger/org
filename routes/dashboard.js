const router = require('express').Router();
const helpers = require('../app/helpers');

router.get('/', helpers.isAuthenticated, (req, res, next) => {
  res.render('pages/dashboard', {
    pageTitle: "Dashboard",
    user: req.user
  });
});

module.exports = router;
