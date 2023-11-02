const express = require("express");
const router = express.Router();
const data = require("../data");
const inventory = data.inventory;
const patientData = data.patients;
const usersData = data.users;
const adminData = data.admin;
const validationFunc = require("../helpers");

router.route("/").get(async (req, res) => {
  try {
    console.log("Inside Admin get");
    let inventoryDetails = await inventory.getAllMedicines();
    let userDetails = await usersData.getAllUsers();
    let patientDetails = await patientData.getAllPatients();

    const data = {
      inventory: inventoryDetails,
      users: userDetails,
      patients: patientDetails,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json("Not found");
  }
});

router.route("/deleteuser/:uderid").post(async (req, res) => {
  try {
    let userID = req.params.uderid;
    let deleteUser = await adminData.deleteUser(userID);
    res.json({ message: "User deleted" });
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

router.route("/deletpatient/:patientid").post(async (req, res) => {
  try {
    console.log("Inside Patient delete");
    let patientID = req.params.patientid;
    console.log("Patient ID", patientID);
    let deletePatient = await adminData.deletePatient(patientID);
    res.json({ message: "Patient deleted" });
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

router.route("/deleteuser/:inventoryid").post(async (req, res) => {
  try {
    let inventoryID = req.params.inventoryid;
    let deleteInventory = await adminData.deleteInventory(inventoryID);
    res.json({ message: "Inventory deleted" });
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

module.exports = router;
