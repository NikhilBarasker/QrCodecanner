const express = require("express");
const router = express.Router();
const {
  InvigilatorLogin,
  registerInvigilator,
  registerContractor,
  registerSeller,
  updateUser,
  deleteUser,
  saveQRCode,
  fetchDataByQRCode,
} = require("../Controller/controller");

router.get("/fetchdata/:qrcode", fetchDataByQRCode);
router.post("/invigilatorlogin", InvigilatorLogin);
router.post("/registercontractor", registerContractor);
router.post("/registerseller", registerSeller);
router.post("/registerinvigilator", registerInvigilator);
router.put("/update", updateUser); 
router.delete("/delete", deleteUser);
router.post("/saveqrcode", saveQRCode);

module.exports = router;


