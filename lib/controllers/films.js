require('../models/associations')
const { Router } = require("express");
const { Film } = require('../models/Film')
const { Studio } = require('../models/Studio')

module.exports = Router()

.post('/', async (req, res, next) => {
    try {
        const newFilm = await Film.create(req.body);

        res.send(newFilm);
    } catch(err) {
        next(err);
    }
})

.get('/', async (req, res, next) => {
    try {
        const films = await Film.findAll({
            attributes: ['id', 'title', 'released'],
            include: { 
                model: Studio,
                attributes: ['id', 'name']
            }
        })
        console.log(films);
        res.send(films);
    } catch(err) {
        next(err);
    }
})