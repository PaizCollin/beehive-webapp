const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/error.middleware");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersRouter = require("./routes/user.routes.js");
const organizationsRouter = require("./routes/organization.routes.js");
//const devicesRouter = require("./routes/device.routes.js");
//const activityRouter = require("./routes/activity.routes.js");

app.use("/users", usersRouter);
app.use("/organizations", organizationsRouter);
//app.use("/devices", devicesRouter);
//app.use("/activity", activityRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
