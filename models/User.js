const mongoose = require("mongoose");

const personschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  occupation: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  createdAt: { type: Date, default: new Date() },
});
module.exports = mongoose.model("user", personschema);
