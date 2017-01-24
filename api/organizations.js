const router = require('express').Router();
const Models = require('../app/models');
const helpers = require('../app/helpers');

router.get('/', helpers.isAuthenticated, (req, res, next) => {
  const { user } = req;
  const { id } = user;
  Models.Organization.findAll({
    where: {
      userId: id
    },
    attributes: ['name', 'id'],
    raw: true
  }).then(orgs => {
    res.json(orgs);
  }).catch(err => {
    console.log(err);
  });
});

router.delete('/:id', helpers.isAuthenticated, (req, res, next) => {
  const id = req.params.id;
  Models.Organization.destroy({
    where: {
        id
    }
  }).then(org => {
    res.sendStatus(200);
  }).catch(err => {
    console.log(err);
  });
});

module.exports = router;
