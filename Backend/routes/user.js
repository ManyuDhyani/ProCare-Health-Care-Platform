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

module.exports = router;
