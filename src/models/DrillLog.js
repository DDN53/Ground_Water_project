const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");

const DrillLog = sequelize.define('DrillLog', {
  Did: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true, 
    },
   unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  wellId: {
    type: DataTypes.INTEGER,
    allowNull: false,

 
  },
  wellNumber: {
    type: DataTypes.STRING,
    allowNull: false, 
    unique: true,
  },
  location: {
    type: DataTypes.STRING,   
    allowNull: true,         
  },
  ProjectOffice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  selectedDistrict: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataStart: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataFinish: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  casingDia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  casingLength: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  drillingTypeOne: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  drillingTypeTwo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  screenFrom: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  screenTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  finalDepth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yieldLpm: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  swlDateTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  finalEc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rodNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startDrillTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  finishDrillTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  drillBitNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  depth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  yieldValue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ecValue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fractureDepth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  soilSampleCollected: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  soilSampleDealerName: {
    type: DataTypes.STRING,
    allowNull: true,  // Allow null if no soil sample collected
  },
  soilSampleSignature: {
    type: DataTypes.STRING,
    allowNull: true,  // Allow null if no soil sample collected
  },
  waterSampleCollected: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  waterSampleOicName: {
    type: DataTypes.STRING,
    allowNull: true,  // Allow null if no water sample collected
  },
  waterSampleSignature: {
    type: DataTypes.STRING,
    allowNull: true,  // Allow null if no water sample collected
  },
});
  module.exports = DrillLog;

