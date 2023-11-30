const users = require("./users");
const inventory = require("./inventory");
const patients = require("./patients");
const admin = require("./admin");
const feedback = require("./feedback");
const inquiry = require("./inquiry");
const automation = require("./automation");

module.exports = {
  users: users,
  inventory: inventory,
  patients: patients,
  admin: admin,
  feedback: feedback,
  inquiry: inquiry,
  automation: automation,
};
