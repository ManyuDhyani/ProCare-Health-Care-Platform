// Inventory routes file

const express = require("express");
const router = express.Router();
const data = require("../data");
const inv = data.inventory;

const validationFunc = require("../helpers");

router.route("/inventory").get(async (req, res) => {
  try {
    let InvList = await inv.getAllMedicines();

    res.status(200).json(InvList);
  } catch (error) {
    res.status(404).json("Not found");
  }
});

module.exports = router;
