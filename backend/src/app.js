const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

app.use(
  cors({
   // origin: 'http://localhost:5173',
    origin:"https://note-it-alpha.vercel.app",
    methods:["POST","GET","PUT","DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());


app.get("/",(req,res)=>{
  res.json("Note it server")
})

module.exports = {
  app,
};
