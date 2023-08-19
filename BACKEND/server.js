const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

//import routes
const employeeRoutes = require("./routes/employee");
const salaryRoutes =require("./routes/salary");

app.use(employeeRoutes);
app.use(salaryRoutes);

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Connected");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
