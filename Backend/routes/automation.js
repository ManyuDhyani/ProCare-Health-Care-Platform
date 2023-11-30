const express = require("express");
const router = express.Router();
const data = require("../data");
const automation = data.automation;

router.route("/").post(async (req, res) => {
  try {
    let { patiendId, message } = req.body;
    console.log("patiendId", patiendId);
    console.log("message", message);
    let createCustomAlert = await automation.customizeAlert(message, patiendId);
    res.json("Alert sent");
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

module.exports = router;
