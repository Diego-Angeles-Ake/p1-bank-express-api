const { DataTypes } = require('sequelize');
const { db } = require('../database/database.config');

const Transfer = db.define('transfer', {
  id: {
    // type: DataTypes.UUID,
    // primaryKey: true,
    // defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receiverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Transfer };
