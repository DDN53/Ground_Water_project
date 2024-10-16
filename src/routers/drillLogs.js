const RoleAuthMiddleware = require("../middleware/RoleAuthMiddleware");
const drillLogController = require("../controllers/DrillLogController");
const express = require('express');
const router = express.Router();


router.post('/saveDrillLogs', RoleAuthMiddleware(["Super", "Admin", "Editor"]), async (req, res) => {
    drillLogController.addDrill(req, res);
  });
  router.get('/viewdrilllogs',RoleAuthMiddleware(["Super", "Admin", "Editor"]), async (req, res) => {
    drillLogController.viewDrills(req, res);
  });
  router.get('/drill/:Did',RoleAuthMiddleware(["Super", "Admin", "Editor"]),async (req, res) => {
    drillLogController.viewDrill(req, res);
  });

module.exports = router;
