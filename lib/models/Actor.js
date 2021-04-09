const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../utils/database');

class Actor extends Model {}

Actor.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pob: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: db,
    timestamps: false,
    createdAt: false,
    tableName: 'actors'
});


console.log(Actor === db.models.Actor);

module.exports = { Actor };