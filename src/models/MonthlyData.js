const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");
const { v4: uuidv4 } = require("uuid");
const Wells = require("./Wells");

const MonthlyData = sequelize.define("NWDB_GW_MonthlyData", {
  mid: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  newWellNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GroundWaterExtraction: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  GroundWaterLevel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  SampleDate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  SampleDepth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  SampleTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Turbidity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PH: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Elecon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Chlorides: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Totalk: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  FreeAmonia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Albamonia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Nitrates: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Nitrite: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Fluorides: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Phosphate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Totdissol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Tothard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Calchard: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Totiron: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Magnesium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Sulphate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Manganese: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Dissiron: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Totcoli: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Faecalcoli: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Filtiron: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Totresidue: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Calcium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Oxygen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Hysul: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Fixediron: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  WaterSupplyScheme: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  AvailabilityofFlowMeter: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ControlValve: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  NonReturnValve: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PumpControlUnit: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  DiameterofPumpingmain: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CapacityofthePump: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  AvailabilityofObservedWell: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  AvailabilityofWelllMaintenanceProgram: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  LastDateofWellFlushed: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  LastDateofPumpingTestDone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PossibilityForeNewWEllConstruct: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ImplementedofCatchmetProtecttoWell: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PerimeterProtectareatotheWell: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ActivitiesDoneforGWRecharge: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  AvailabilityofPolletsSourcesAroundtheWell: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = MonthlyData;
