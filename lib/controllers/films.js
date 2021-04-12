const { Router } = require("express");
const { Film } = require('../models/Film')

module.exports = Router()

.post('/', async (req, res, next) => {
    try {
        const newFilm = await Film.create(req.body);

        res.send(newFilm);
    } catch(err) {
        next(err);
    }
})