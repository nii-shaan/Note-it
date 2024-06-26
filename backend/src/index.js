require("dotenv").config();
const { app } = require("./app");

const { connectDB } = require("./db/connect");

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error on express: ${error}`);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect database", error);
  });

/**
 * * Routes
 */
const userRouter = require("./routes/user.route.js");
app.use("/user", userRouter);
