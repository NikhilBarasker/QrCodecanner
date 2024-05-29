const mongoose = require("mongoose");

const model = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  designation: {
    type: String,
  },
  invigilator: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  qrcode: {
    type: String,
  },
  profilePic: {
    type:String,
  }
});

module.exports = mongoose.model("Contractor", model);
