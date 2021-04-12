const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../utils/database');

class Reviewer extends Model {}

Reviewer.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    createdAt: false,
    tableName: 'reviewers',
  }
);

module.exports = { Reviewer };
