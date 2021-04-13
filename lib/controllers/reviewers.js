const { Router } = require('express');
const { Reviewer } = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const newReviewer = await Reviewer.create(req.body);
      res.send(newReviewer);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const reviewers = await Reviewer.findAll();
      res.send(reviewers);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const reviewer = await Reviewer.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(reviewer);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      await Reviewer.destroy({
        where: { id: req.params.id },
      });
      res.send({ deleted: '👍' });
    } catch (err) {
      next(err);
    }
  });
