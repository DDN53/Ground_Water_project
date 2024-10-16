const Wells = require("../models/Wells");
const MonthlyData = require("../models/MonthlyData");

const WellsController = {
  addWell: async (req, res) => {
    try {
      const data = req.body;
      if (!data.newWellNo) {
        return res.status(400).json({ error: "New Well Number is Missing!" });
      }
      const existingWell = await Wells.findOne({
        where: { newWellNo: data.newWellNo },
      });
      if (existingWell) {
        return res
          .status(400)
          .json({ error: "Well with the same newWellNo already exists!" });
      }
      const newWell = await Wells.create({ ...data });
      res
        .status(201)
        .json({ message: "Well added successfully", data: newWell });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add well to the database" });
    }
  },

  viewallwells: async (req, res) => {
    try {
      const allWells = await Wells.findAll();
      const wellsWithUsedProperty = [];
      for (const well of allWells) {
        const monthlyDataCount = await MonthlyData.count({
          where: { newWellNo: well.newWellNo },
        });
        const modifiedWell = {
          ...well.toJSON(),
          used: monthlyDataCount > 0,
        };
        wellsWithUsedProperty.push(modifiedWell);
      }
      res.status(200).json({
        message: "All wells retrieved successfully",
        data: wellsWithUsedProperty,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to retrieve wells from the database" });
    }
  },

  viewwell: async (req, res) => {
    try {
      const { newWellNo } = req.query;

      if (!newWellNo) {
        return res.status(400).json({ error: "Missing newWellNo parameter" });
      }

      const well = await Wells.findOne({ where: { newWellNo } });

      if (!well) {
        return res.status(404).json({ error: "Well not found" });
      }

      res.status(200).json({ data: well });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to retrieve well from the database" });
    }
  },

  removeWell: async (req, res) => {
    try {
      const { newWellNo } = req.body;
      if (!newWellNo) {
        return res.status(400).json({ error: "Missing newWellNo parameter" });
      }
      const existingWell = await Wells.findOne({
        where: { newWellNo },
      });

      if (!existingWell) {
        return res.status(404).json({ error: "Well not found" });
      }
      const monthlyDataCount = await MonthlyData.count({
        where: { newWellNo },
      });
      if (monthlyDataCount > 0) {
        return res.status(400).json({
          error: "Cannot delete the well as it has associated monthly data",
        });
      }
      await existingWell.destroy();
      res.status(200).json({
        message: "Well removed successfully",
        data: { newWellNo },
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "Failed to remove well from the database" });
    }
  },

  editWell: async (req, res) => {
    try {
      const { id, newData } = req.body;
      if (!id || !newData) {
        return res
          .status(400)
          .json({ error: "Missing id or newData parameter" });
      }
      const existingData = await Wells.findOne({ where: { id } });
      if (!existingData) {
        return res.status(404).json({ error: "Well id not found" });
      }
      Object.keys(newData).forEach((key) => {
        existingData[key] = newData[key];
      });
      await existingData.save();
      res.status(200).json({
        message: "Well info updated successfully",
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
module.exports = WellsController;
