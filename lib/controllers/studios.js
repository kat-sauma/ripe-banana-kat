const { Router } = require('express');
const { Studio } = require('../models/Studio');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newStudio = await Studio.create(req.body);
      res.send(newStudio);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const studios = await Studio.findAll({
        attributes: ['id', 'name'],
      });
      res.send(studios);
    } catch (err) {
      next(err);
    }
  });
