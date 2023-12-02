const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;

router.route("/").get(async (req, res) => {
  //Get all the patients data
  try {
    let getall = await usersData.getAllUsers();
    // console.log(getall);
    res.json(getall);
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

router.route("/T/:userID").post(async (req, res) => {
  //Get all the patients data
  try {
    // console.log("inside type update route");
    let pId = req.params.userID;
    let type = req.body.type;
    // console.log("type = ", type);
    let updated = await usersData.updateUserType(pId, type);
    // console.log(updated);
    res.json(updated);
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

router.route("/updateProfile").post(async (req, res) => {
  //Get all the patients data
  try {
    console.log("inside update Profile route", req.body);
    let { userID, email, phoneNumber } = req.body;
    let updated = await usersData.updateUserProfile(userID, email, phoneNumber);
    console.log(updated);
    res.json(updated);
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

module.exports = router;
