const mongoCollections = require("../Config/mongoCollections");
const validationFunc = require("../helpers");
const inventory = mongoCollections.inventory;
let { ObjectId } = require("mongodb");
const automation = require("./automation");

const createMedicine = async (
  name,
  mg,
  exp_date,
  current_stock,
  threshold,
  remark
) => {
  // Cleaning Data: Triming input for storage
  name = name.trim();
  mg = mg.trim();
  exp_date = exp_date.trim();
  remark = remark.trim();

  let inventoryCollection = await inventory();

  let newMedicine = {
    name: name,
    mg: mg,
    exp_date: exp_date,
    current_stock: current_stock,
    threshold: threshold,
    remark: remark,
  };

  let insertMedicine = await inventoryCollection.insertOne(newMedicine);
  if (!insertMedicine.acknowledged || insertMedicine.insertedCount === 0) {
    throw { statusCode: 500, error: "The medicine was not added" };
  }

  let newMedID = insertMedicine.insertedId;
  let result = await inventoryCollection.findOne({ _id: newMedID });
  if (!result) {
    throw { statusCode: 404, error: `No medicine with the id:- ${id}` };
  }
  result._id = result._id.toString();

  return result;
};

const getAllMedicines = async () => {
  let inventoryCollection = await inventory();
  let medList = await inventoryCollection.find({}).toArray();
  if (medList.length === 0) {
    return { message: "No Medicines" };
  }
  medList.forEach((element) => {
    element._id = element._id.toString();
  });

  return medList;
};

const getMedicineById = async (medID) => {
  await validationFunc.idValidator(medID);
  id = medID.trim();

  let inventoryCollection = await inventory();
  let result = await inventoryCollection.findOne({ _id: ObjectId(id) });

  if (!result) {
    throw { statusCode: 404, error: `No such medication with id: ${id}` };
  }
  result._id = result._id.toString();
  return result;
};

const getMedicineLowinThreshold = async () => {
  let inventoryCollection = await inventory();
  // Query to find medications with low stock.
  const query = { current_stock: { $lt: "$threshold" } };

  // Projecting the fields to be retrieved. Here we want all!
  const projection = {
    name: 1,
    mg: 1,
    exp_date: 1,
    current_stock: 1,
    threshold: 1,
    remark: 1,
  };
  const result = await inventoryCollection
    .find(query)
    .project(projection)
    .toArray();

  return result;
};

const getMedicineAboutToExp = async () => {
  const currentDate = new Date();
  const expirationDateThreshold = new Date(currentDate);
  expirationDateThreshold.setMonth(currentDate.getMonth() + 1);

  let inventoryCollection = await inventory();
  const result = await inventoryCollection.find().toArray();

  const medicationsAboutToExp = result.filter((medication) => {
    // Parse the 'exp_date' string as a date
    const expDateParts = medication.exp_date.split("/");
    const expDate = new Date(expDateParts[1], expDateParts[0] - 1);

    // Check if the medication is expiring within one month
    return expDate > currentDate && expDate <= expirationDateThreshold;
  });

  return medicationsAboutToExp;
};

const updateMedicine = async (medID, current_stock, threshold) => {
  medID = medID.trim();

  //Get the patient first
  // let Medicine = getMedicineById(medID);
  await automation.inventoryAlert(
    parseInt(current_stock, 10),
    parseInt(threshold, 10)
  );

  let newMedicine = {
    current_stock: current_stock,
    threshold: threshold,
  };

  const inventoryCollections = await inventory();
  const result = await inventoryCollections.updateOne(
    { _id: ObjectId(medID) }, // Assuming patientId is a MongoDB ObjectId
    { $set: newMedicine }
  );

  if (result.modifiedCount === 1) {
    console.log(`Medicine with ID ${medID} successfully updated.`);
  } else {
    console.log(`Update for Medicine with ID ${medID} failed.`);
    throw {
      statusCode: 404,
      error: "Medicine could not be updated",
    };
  }
};

const deleteMedicine = async (medID) => {
  const inventoryCollection = await inventory();
  const Deleted = await inventoryCollection.deleteOne({
    _id: ObjectId(medID),
  });
};

module.exports = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  getMedicineLowinThreshold,
  getMedicineAboutToExp,
  updateMedicine,
  deleteMedicine,
};
