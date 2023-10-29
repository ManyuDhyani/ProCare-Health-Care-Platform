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


module.exports = router;
