const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(
      `MONGODB connected sucessfully on ${connection.connection.host}`
    );
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  connectDB,
};
