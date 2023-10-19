const mongoCollections = require("../Config/mongoCollections");
const patients = mongoCollections.patients;
let { ObjectId } = require("mongodb");
//Create Function
const createPatient = async (
  name,
  dataofBirth,
  gender,
  diagnosis,
  medication,
  admissionDate,
  familyMembers,
  StaffMembers
) => {
  console.log("Inside the create function");
  name = name.trim();
  //dataofBirth = dataofBirth.trim();
  gender = gender.trim();
  diagnosis = diagnosis.trim();
  //admissionDate = admissionDate.trim();
  console.log("Inside the create function 2");
  //Create a new object
  let newObj = {
    name: name,
    dataofBirth: dataofBirth,
    diagnosis: diagnosis,
    medication: medication,
    admissionDate: admissionDate,
    familyMembers: familyMembers,
    StaffMembers: StaffMembers,
  };
  const patientsCollections = await patients();
  //Insert the record
  console.log(1);
  let insertPatient = await patientsCollections.insertOne({ newObj });
  if (!insertPatient.acknowledged || insertPatient.insertedCount === 0) {
    throw { statusCode: 500, error: "The patient was not added" };
  }
  console.log(2);
  let fetchAgain = await patientsCollections.findOne({
    _id: insertPatient.insertedId,
  });
  console.log(3);
  if (!fetchAgain) {
    throw { statusCode: 404, error: `No patient with the id:- ${id}` };
  }
  fetchAgain._id = fetchAgain._id.toString();
  return fetchAgain;
};
//Get All patients
const getAllPatients = async () => {
  console.log("Inside all patients");
  const patientsCollections = await patients();
  console.log(31);
  let allPatients = await patientsCollections.find({}).toArray();
  console.log(32);
  if (allPatients.length === 0) {
    throw { statusCode: 404, error: "No Patient in the Database" };
  }
  allPatients.forEach((element) => {
    element._id = element._id.toString();
  });
  return allPatients;
};
//Get a patient by ID
const getPatientByID = async (patiendID) => {
  patiendID = patiendID.trim();
  console.log(patiendID);
  const patientsCollections = await patients();
  if (!ObjectId.isValid(patiendID)) {
    throw { statusCode: 400, error: "Patient ID is not a valid object ID" };
  }
  let ID = ObjectId(patiendID);
  let fetchPatient = await patientsCollections.findOne({
    _id: ID,
  });
  if (!fetchPatient) {
    throw {
      statusCode: 404,
      error: "No Patient with the given ID present in the Database",
    };
  }
  fetchPatient._id = fetchPatient._id.toString();
  return fetchPatient;
};
module.exports = {
  createPatient,
  getAllPatients,
  getPatientByID,
};
