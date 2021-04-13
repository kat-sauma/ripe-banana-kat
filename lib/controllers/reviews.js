require('../models/associations')
const { Router } = require("express");
const { Film } = require('../models/Film')
const { Review } = require('../models/Review')

module.exports = Router()

.post('/', async (req, res, next) => {
    try {
        const newReview = await Review.create(req.body);

        res.send(newReview);
    } catch (err) {
        next (err)
    }
})