const mongoCollections = require("../Config/mongoCollections");
const validationFunc = require("../helpers");
const inventory = mongoCollections.inventory;
const patients = mongoCollections.patients;
const user_collection = mongoCollections.users;
let { ObjectId } = require("mongodb");

const deleteUser = async (userID) => {
  userID = userID.trim();

  const userCollection = await user_collection();

  let deleted = await userCollection.deleteOne({ _id: ObjectId(userID) });

  if (deleted.deletedCount === 0) {
    throw { statusCode: 500, error: "Could not delete" };
  }
};

const deletePatient = async (patientID) => {
  patientID = patientID.trim();

  const patientsCollection = await patients();

  let deleted = await patientsCollection.deleteOne({
    _id: ObjectId(patientID),
  });
  if (deleted.deletedCount === 0) {
    throw { statusCode: 500, error: "Could not delete" };
  }
};

const deleteInventory = async (inventoryID) => {
  inventoryID = inventoryID.trim();

  const inventoryIDCollection = await inventory();

  let deleted = await inventoryIDCollection.deleteOne({
    _id: ObjectId(inventoryID),
  });
  if (deleted.deletedCount === 0) {
    throw { statusCode: 500, error: "Could not delete" };
  }
};

module.exports = {
  deleteUser,
  deleteInventory,
  deletePatient,
};
