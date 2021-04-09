const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {}



console.log(User === sequelize.models.User);