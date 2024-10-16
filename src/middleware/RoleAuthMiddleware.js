const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserData");
const ApiUser = require("../models/ApiUser");

const RoleAuthMiddleware = (requiredRoles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);

    if (decodedToken.mode === "LOCAL") {
      const user = await User.findByPk(decodedToken.userId);
      if (requiredRoles.includes(user.role)) {
        req.userData = user;
        next();
      } else {
        res.status(403).json({ error: "Insufficient permissions" });
      }
    } else if (decodedToken.mode === "API") {
      const apiUser = await ApiUser.findByPk(decodedToken.userId);
      if (requiredRoles.includes(apiUser.role)) {
        req.userData = apiUser;
        next();
      } else {
        res.status(403).json({ error: "Insufficient permissions" });
      }
    } else {
      res.status(403).json({ error: "Invalid token mode" });
    }
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = RoleAuthMiddleware;
