const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config({ path: "./config/.env" });
mongoose.connect(process.env.MONGO_URL, (err) =>
  err ? console.log(err) : console.log("server connected")
);

const User = require("./models/User");

app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/getusers", (req, res) => {
  User.find({})
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ msg: "something went wrong " }));
});
app.post("/adduser", (req, res) => {
  User.create(req.body)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(500).json({ msg: `something went wrong ${err}` })
    );
});
app.delete("/deleteuser/:userid", (req, res) => {
  User.findByIdAndDelete(req.params.userid)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(500).json({ msg: `something went wrong ${err}` })
    );
});
app.put("/updateuser/:userid", (req, res) => {
  User.findByIdAndUpdate(req.params.userid, req.body, { new: true })
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(500).json({ msg: `something went wrong ${err}` })
    );
});
app.listen(process.env.Port, () => console.log("server is running"));
