const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../utils/database');

class Studio extends Model {}

Studio.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    createdAt: false,
    tableName: 'studios',
  }
);

module.exports = { Studio };
