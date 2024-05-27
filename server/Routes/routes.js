// routes.js
const express = require("express");
const router = express.Router();
const {
  verifyUser,
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  fetchDataByQRCode,
} = require("../Controller/controller");

router.get("/verify", verifyUser);
router.get("/fetchdata/:qrcode", fetchDataByQRCode);
router.get("/login", loginUser);
router.post("/register", registerUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

module.exports = router;
