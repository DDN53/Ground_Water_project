const { DataTypes } = require("sequelize");
const sequelize = require("../../configuration/db.config");

const ApiUser = sequelize.define("NWDB_GW_ApiUser", {
  userId: {
    type: DataTypes.UUID, // Change data type to UUID
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4, // Set a default value using UUIDv4
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("Admin", "User", "Editor", "Viewer"),
    allowNull: true,
    defaultValue: "User",
  },
});

module.exports = ApiUser;
