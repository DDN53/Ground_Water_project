const Well = require("../models/Wells");
const DrillLog = require("../models/DrillLog");

const drillLog = {
  // Add drill logs for a specific well
  addDrill: async (req, res) => {
    try {
      const { newWellNo, drillLogs } = req.body;

      // Validate input
      if (!newWellNo || !Array.isArray(drillLogs) || drillLogs.length === 0) {
        return res
          .status(400)
          .json({
            message:
              "Invalid input data. Please provide a valid Well number and drill logs.",
          });
      }

      // Find the well by its newWellNo
      const well = await Well.findOne({ where: { newWellNo } });

      // Handle case where well is not found
      if (!well) {
        return res
          .status(404)
          .json({ message: `Well with Well No. ${newWellNo} not found` });
      }

      // Extract the location from the found well
      const location = well.location;

      // Prepare logs for bulk creation by mapping over drillLogs array
      const logsToSave = drillLogs.map((log) => ({
        wellId: well.id,
        wellNumber: newWellNo,
        location: well.Location,
        ProjectOffice: well.ProjectOffice,
        Village: well.Village, // Associate drill log with the well ID
        dataStart: log.dataStart || "", // Set to '' if not provided
        dataFinish: log.dataFinish || "",
        casingDia: log.casingDia || "",
        casingLength: log.casingLength || "",
        drillingTypeOne: log.drillingTypeOne || "",
        drillingTypeTwo: log.drillingTypeTwo || "",
        screenFrom: log.screenFrom || "",
        screenTo: log.screenTo || "",
        swlDateTime: log.swlDateTime || "",
        finalEc: log.finalEc || "",
        finalDepth: log.finalDepth || "",
        yieldLpm: log.yieldLpm || "", // Ensure SQL keywords do not clash
        date: log.date || "",
        rodNo: log.rodNo || "",
        startDrillTime: log.startDrillTime || "",
        finishDrillTime: log.finishDrillTime || "",
        duration: log.duration || "",
        drillBitNo: log.drillBitNo || "",
        hammerType: log.hammerType || "",
        depth: log.depth || "",
        yieldValue: log.yieldValue || "",
        ecValue: log.ecValue || "",
        fractureDepth: log.fractureDepth || "",
        description: log.description || "",
        soilSampleCollected: log.soilSample?.collected || "No", // Default 'No' if not provided
        soilSampleDealerName: log.soilSample?.dealerName || "", // Default empty string
        soilSampleSignature: log.soilSample?.signature || "",
        waterSampleCollected: log.waterSample?.collected || "No", // Default 'No'
        waterSampleOicName: log.waterSample?.oicName || "",
        waterSampleSignature: log.waterSample?.signature || "",
      }));

      // Save the logs to the database
      await DrillLog.bulkCreate(logsToSave);

      // Send success response
      return res.status(201).json({ message: "Drill logs saved successfully" });
    } catch (error) {
      console.error("Error saving drill logs:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while saving drill logs" });
    }
  },

  // View all drill logs
  viewDrills: async (req, res) => {
    try {
      // Fetch all drill logs
      const drillLogs = await DrillLog.findAll();

      // Send the data as a response
      res.status(200).json(drillLogs);
    } catch (error) {
      console.error("Error fetching drill logs:", error);
      res
        .status(500)
        .json({ message: "An error occurred while fetching drill logs" });
    }
  },

  // Edit a specific drill log by ID
  viewDrill: async (req, res) => {
    const { Did } = req.params; // Extract the Did (primary key) from the request parameters
    console.log("Did", Did);
    try {
      // Fetch the drill log entry from the database by Did
      const drillLog = await DrillLog.findOne({
        where: { Did }, // Find drill log by the primary key 'Did'
        include: [{ all: true }],
      });

      // If no drill log is found, return 404
      if (!drillLog) {
        return res.status(404).json({ message: "Drill log not found" });
      }

      // Return the drill log details in the response
      return res.json(drillLog);
    } catch (error) {
      // Handle any errors that occur during the fetch process
      console.error("Error fetching drill log details:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};

module.exports = drillLog;
