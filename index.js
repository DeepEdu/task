const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
require("dotenv").config();

const Route = require("./route/routes");
app.use("/api", Route);

mongoose
  .connect(process.env.MONGODB_URL)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name:: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
