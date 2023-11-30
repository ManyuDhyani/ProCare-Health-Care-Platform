const express = require("express");
const router = express.Router();
const data = require("../data");
const automation = data.automation;

router.route("/").post(async (req, res) => {
  try {
    let { patientId, message } = req.body;
    let createCustomAlert = await automation.customizeAlert(message, patientId);
    res.json("Alert sent");
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

module.exports = router;
