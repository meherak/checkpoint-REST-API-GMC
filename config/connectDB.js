const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/cp-restapi`);
    console.log("database is connected");
  } catch (error) {
    console.error(error);
  }
};
module.exports = connectDB;
