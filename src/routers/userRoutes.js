const { Router } = require("express");
const router = Router();
const RoleAuthMiddleware = require("../middleware/RoleAuthMiddleware");
const { auth } = require("../middleware/authMiddleware");
const {
  permissionsData,
  generateToken,
} = require("../controllers/permissionController");

const permissionController = require("../controllers/permissionController");

const { checkToken } = require("../middleware/auth");

const WellsController = require("../controllers/WellsController");

const usersController = require("../controllers/userController");

const MonthlyDataController = require("../controllers/MonthlyDataController");

router.post(
  "/addwell",
  RoleAuthMiddleware(["Super", "Admin", "Editor"]),
  async (req, res) => {
    WellsController.addWell(req, res);
  }
);
router.post(
  "/editwell",
  RoleAuthMiddleware(["Super", "Admin", "Editor"]),
  async (req, res) => {
    WellsController.editWell(req, res);
  }
);

router.get(
  "/viewallwells",
  RoleAuthMiddleware(["Super", "Admin", "Editor", "Viewer"]),
  async (req, res) => {
    WellsController.viewallwells(req, res);
  }
);

router.get(
  "/viewwell",
  RoleAuthMiddleware(["Super", "Admin", "Editor", "Viewer"]),
  async (req, res) => {
    WellsController.viewwell(req, res);
  }
);

router.post(
  "/removewell",
  RoleAuthMiddleware(["Super", "Admin"]),
  async (req, res) => {
    WellsController.removeWell(req, res);
  }
);

router.get("/auth", checkToken, async (req, res) => {
  res.render("home");
});

router.get("/permissions/authnew", auth, async (req, res) => {
  const permissions = permissionController.permission(
    permissionsData[req.userRole]
  );
  res.send({ permissions });
});
router.get("/profile", auth, async (req, res) => {
  usersController.getRegisteredUserDetails(req, res);
});

router.post("/edituser", RoleAuthMiddleware(["Super"]), async (req, res) => {
  usersController.edituser(req, res);
});

router.get("/viewallusers", RoleAuthMiddleware(["Super"]), async (req, res) => {
  usersController.viewallusers(req, res);
});

router.post(
  "/deleteuser/:userId",
  RoleAuthMiddleware(["Super"]),
  async (req, res) => {
    usersController.deleteuser(req, res);
  }
);

router.post(
  "/addmonthlydata",
  RoleAuthMiddleware(["Super", "Admin", "Editor"]),
  async (req, res) => {
    MonthlyDataController.addMonthlyData(req, res);
  }
);
router.post(
  "/editmonthlydata",
  RoleAuthMiddleware(["Super", "Admin", "Editor"]),
  async (req, res) => {
    MonthlyDataController.editMonthlyData(req, res);
  }
);

router.get(
  "/viewallmonthlydata",
  RoleAuthMiddleware(["Super", "Admin", "Editor", "Viewer"]),
  async (req, res) => {
    MonthlyDataController.viewAllMonthlyData(req, res);
  }
);

router.get(
  "/viewmonthlydata",
  RoleAuthMiddleware(["Super", "Admin", "Editor", "Viewer"]),
  async (req, res) => {
    MonthlyDataController.viewMonthlyData(req, res);
  }
);

router.post(
  "/removemonthlydata",
  RoleAuthMiddleware(["Super", "Admin"]),
  async (req, res) => {
    MonthlyDataController.removeMonthlyData(req, res);
  }
);

module.exports = router;
