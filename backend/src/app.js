const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

module.exports = {
  app,
};
