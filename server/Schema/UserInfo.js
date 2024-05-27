const mongoose = require("mongoose");

const model = new mongoose.Schema({
  name: {
    type: String,
  },
  gender: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("Info", model);
