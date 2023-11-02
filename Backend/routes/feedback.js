const express = require("express");
const router = express.Router();
const data = require("../data");
const feedData = data.feedback;

router.route("/").post(async (req, res) => {
  try {
    let { famMebId, message } = req.body;
    console.log("FMID:", famMebId);
    console.log("Message:", message);
    let postFeedback = await feedData.createFeedback(message, famMebId);
    res.status(200).json({ mesage: "Feedback posted" });
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

router.route("/").get(async (req, res) => {
  try {
    let getAllfeedback = await feedData.getAllFeedbacks();
    res.status(200).json(getAllfeedback);
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

module.exports = router;
