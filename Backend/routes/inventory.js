// Inventory routes file

const express = require("express");
const router = express.Router();
const data = require("../data");
const inv = data.inventory;

const validationFunc = require("../helpers");

router
  .route("/inventory")
  .get(async (req, res) => {
    try {
      let InvList = await inv.getAllMedicines();

      res.status(200).json(InvList);
    } catch (error) {
      res.status(404).json("Not found");
    }
  })
  .post(async (req, res) => {
    try {
      let b = req.body;

      let createdmedince = await inv.createMedicine(
        b.name,
        b.mg,
        b.exp_date,
        parseInt(b.current_stock),
        parseInt(b.threshold),
        b.remark
      );

      res.status(200).json(createdmedince);
    } catch (e) {}
  });

router.route("/inventory").post(async (req, res) => {
  try {
    let name = req.body.name;
    let mg = req.body.mg;
    let exp_date = req.body.exp_date;
    let current_stock = req.body.current_stock;
    let threshold = req.body.threshold;
    let remark = req.body.remark;

    let InvList = await inv.createMedicine(
      name,
      mg,
      exp_date,
      current_stock,
      threshold,
      remark
    );

    res.json(InvList);
  } catch (error) {
    res.status(404).json("Not found");
  }
});
module.exports = router;
