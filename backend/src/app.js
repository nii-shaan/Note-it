const express = require("express");

const app = express();
const cors = require("cors");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

module.exports = {
  app,
};
