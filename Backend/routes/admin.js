const express = require("express");
const router = express.Router();
const data = require("../data");
const inventory = data.inventory;
const patientData = data.patients;
const usersData = data.users;
const validationFunc = require("../helpers");

router.route("/admin").get(async (req, res) => {
  try {
    let inventoryDetails = await inventory.getAllMedicines();
    let userDetails = await usersData.getAllUsers();
    let patientDetails = await patientData.getAllPatients();

    const data = {
        inventory : inventoryDetails,
        users: userDetails,
        patients: patientDetails
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json("Not found");
  }
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
