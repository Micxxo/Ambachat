const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(`/api/${process.env.VERSIONING}/users`, userRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URL;

app.listen(port, (req, res) => {
  console.log("Server Running on port " + port);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection success"))
  .catch((error) => console.log("MongoDB Connection Failed: ", error.message));
