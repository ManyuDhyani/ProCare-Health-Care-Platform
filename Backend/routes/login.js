//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const validationFunc = require("../helpers");

// router.route("/").get(async (req, res) => {
//   //code here for GET
//   if (!req.session.login) {
//     return res.render("userLogin", { title: "Login" });
//   }
//   res.redirect("/protected");
// });

router.route("/register").post(async (req, res) => {
  //code here for POST
  // console.log(req.body);
  let registerData = req.body;
  let { email, password, phoneNumber } = registerData;
  try {
    // await validationFunc.createValidator(usernameInput, passwordInput);
    let registerationStatus = await usersData.createUser(
      email,
      password,
      phoneNumber
    );
    // console.log(registerationStatus);
    if (
      registerationStatus.insertedUser &&
      registerationStatus.insertedUser === true
    ) {
      res.json({ message: "Registered" });
    } else {
      res.json({ message: "email already exists" });
    }
  } catch (e) {
    res.json(e);
  }
});

router.route("/login").post(async (req, res) => {
  //code here for POST
  let loginData = req.body;
  let { email, password } = loginData;
  // console.log(req.session);
  try {
    // await validationFunc.createValidator(usernameInput, passwordInput);
    let loginDetails = await usersData.checkUser(email, password);
    // console.log(loginDetails.authenticatedUser);
    if (loginDetails.authenticatedUser) {
      console.log("here");
      req.session.login = true;
      req.session.username = email;
      // console.log(req.session);
    }

    // res.redirect("/protected");
    res.json(loginDetails);
  } catch (e) {
    res.json(e);
  }
});

router.route("/protected").get(async (req, res) => {
  //code here for GET
  res.render("private", {
    title: "Protected Page",
    username: req.session.username,
    timestamp: new Date().toUTCString(),
  });
});

router.route("/logout").get(async (req, res) => {
  //code here for GET
  req.session.destroy();
  res.render("logout", { title: "Logged Out" });
});

module.exports = router;
