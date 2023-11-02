const users = require("./users");
const inventory = require("./inventory");
const patients = require("./patients");
const admin = require("./admin");
const feedback = require("./feedback");

module.exports = {
  users: users,
  inventory: inventory,
  patients: patients,
  admin: admin,
  feedback: feedback,
};
