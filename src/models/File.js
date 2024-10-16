const { DataTypes } = require('sequelize');
const sequelize = require('../../configuration/db.config');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.BLOB, // Removed 'long' for compatibility
    allowNull: true,
  },
}, {
  tableName: 'files',
  timestamps: true,
});

module.exports = File;
