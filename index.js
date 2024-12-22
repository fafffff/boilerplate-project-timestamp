require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const timestampRoute = require('./routes/timestampRoutes');

const cors = require("cors");
const path = require("path");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected To Mongo Db"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/routes', timestampRoute);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
