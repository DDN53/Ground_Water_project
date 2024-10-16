const express = require("express");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./configuration/db.config");
const userRoutes = require("./src/routers/userRoutes");
const cors = require("cors");
const morgan = require("morgan");
const employeeRoutes = require("./src/routers/employeeRouters");
const contactRoutes = require('./src/routers/contact');
const drillLogRoutes = require('./src/routers/drillLogs');

const app = express();
require("dotenv").config();

const httpServer = require("http").createServer(app);

const port = 5000;

app.use(cors());
app.use(morgan("common"));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/users", employeeRoutes);
app.use('/api/users', contactRoutes); // Added contact routes
app.use('/api/users', drillLogRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database is synced");
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
