//import modules
const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config/.env" });
const connectDB = require("./config/connectDB");
const user = require("./models/User");
//database connection
connectDB();
//instance of all express methods
const app = express();
app.use(json());
//CRUD
app.post("/api/adduser", async (req, res) => {
  console.log(req.body);
  try {
    let newUser = await user.create(req.body);
    console.log(newUser);
    res.status(200).send({ msg: `user ${newUser.username} added succ` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: `cannot add user` });
  }
});
app.get("/api/allusers", async (req, res) => {
  try {
    let allUsers = await user.find();
    res.status(200).send({
      msg: `this is list of all users name: ${allUsers
        .map((el) => el.username)
        .join(", ")}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: `cannot get users` });
  }
});
app.put("/api/edit/:id", async (req, res) => {
  try {
    let editedUser = await user.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ msg: "user updated succ" });
    console.log(editedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: `cannot edit user` });
  }
});
app.delete("api/delete/:id", async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "user deleted succ" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: `cannot delete user` });
  }
});
//server creation
PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port:${PORT}`));
