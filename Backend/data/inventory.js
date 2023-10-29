const mongoCollections = require("../Config/mongoCollections");
const validationFunc = require("../helpers");
const inventory = mongoCollections.inventory;
let { ObjectId } = require("mongodb");

const createMedicine = async (
  name,
  mg,
  exp_date,
  current_stock,
  threshold,
  remark
) => {
  // await validationFunc.createMedicineValidator(
  //   title,
  //   plot,
  //   genres,
  //   rating,
  //   studio,
  //   director,
  //   castMembers,
  //   dateReleased,
  //   runtime
  // );

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
    throw { statusCode: 404, error: "No medication in the Database" };
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

module.exports = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
};
