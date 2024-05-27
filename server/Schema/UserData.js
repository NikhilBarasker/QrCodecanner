const mongoose = require("mongoose");

const model = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User",model)