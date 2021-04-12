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
  });
