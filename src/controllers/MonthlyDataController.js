const MonthlyData = require("../models/MonthlyData");
const Wells = require("../models/Wells");
const MonthlyDataController = {
  addMonthlyData: async (req, res) => {
    try {
      const data = req.body;
      const newMonthlyData = await MonthlyData.create({ ...data });
      res.status(201).json({
        message: "Monthly Data added successfully",
        data: newMonthlyData,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to add Monthly Data to the database" });
    }
  },
  viewAllMonthlyData: async (req, res) => {
    try {
      const allMonthlyData = await MonthlyData.findAll({
        include: [
          {
            model: Wells,
            attributes: ["selectedDistrict", "selectedProvince"],
          },
        ],
      });
      res.status(200).json({
        message: "All Monthly Data retrieved successfully",
        data: allMonthlyData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "Failed to retrieve all Monthly Data from the database",
      });
    }
  },

  viewMonthlyData: async (req, res) => {
    try {
      const { mid } = req.query;
      if (!mid) {
        return res.status(400).json({ error: "Missing mid parameter" });
      }
      const Data = await MonthlyData.findOne({
        where: { mid },
        include: [
          {
            model: Wells,
            attributes: { exclude: [] },
          },
        ],
      });
      if (!Data) {
        return res.status(404).json({ error: "Monthly Data not found" });
      }
      res.status(200).json({ data: Data });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to retrieve Monthly Data from the database" });
    }
  },

  removeMonthlyData: async (req, res) => {
    try {
      const { mid } = req.body;

      if (!mid) {
        return res.status(400).json({ error: "Missing mid parameter" });
      }

      const Data = await MonthlyData.findOne({ where: { mid } });

      if (!Data) {
        return res.status(404).json({ error: "Monthly Data not found" });
      }

      await MonthlyData.destroy({ where: { mid } });

      res.status(200).json({ message: "Monthly Data removed successfully" });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to remove Monthly Data from the database" });
    }
  },

  editMonthlyData: async (req, res) => {
    try {
      const { mid, newData } = req.body;
      if (!mid || !newData) {
        return res
          .status(400)
          .json({ error: "Missing mid or newData parameter" });
      }
      const existingData = await MonthlyData.findOne({ where: { mid } });
      if (!existingData) {
        return res.status(404).json({ error: "Monthly Data not found" });
      }
      Object.keys(newData).forEach((key) => {
        existingData[key] = newData[key];
      });
      await existingData.save();
      res.status(200).json({
        message: "Monthly Data updated successfully",
        data: existingData,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to update Monthly Data in the database" });
    }
  },
};
module.exports = MonthlyDataController;
