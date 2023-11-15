const mongoCollections = require("../Config/mongoCollections");
const patients = mongoCollections.patients;
let { ObjectId } = require("mongodb");
const automation = require("./automation");

//Create Function
const createPatient = async (
  name,
  dataofBirth,
  gender,
  diagnosis,
  medication,
  admissionDate
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
    familyMembers: [],
    StaffMembers: [],
  };
  const patientsCollections = await patients();
  //Insert the record
  let insertPatient = await patientsCollections.insertOne({ newObj });
  if (!insertPatient.acknowledged || insertPatient.insertedCount === 0) {
    throw { statusCode: 500, error: "The patient was not added" };
  }
  let fetchAgain = await patientsCollections.findOne({
    _id: insertPatient.insertedId,
  });
  if (!fetchAgain) {
    throw { statusCode: 404, error: `No patient with the id:- ${id}` };
  }
  fetchAgain._id = fetchAgain._id.toString();
  return fetchAgain;
};
//Get All patients
const getAllPatients = async () => {
  const patientsCollections = await patients();
  let allPatients = await patientsCollections.find({}).toArray();
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

//Get all patients who have familyID in familyMembers array
const getPatientByFamilyMember = async (familyID) => {
  familyID = familyID.trim();
  const patientsCollections = await patients();
  const patientsWithFamilyMember = await patientsCollections
    .find({ familyMembers: familyID })
    .toArray();
  return patientsWithFamilyMember;
};

//Get all patients who have staff member in StaffMembers array
const getPatientByStaffMember = async (StaffMemberID) => {
  StaffMemberID = StaffMemberID.trim();
  const patientsCollections = await patients();
  const patientsWithStaffMember = await patientsCollections
    .find({ StaffMembers: StaffMemberID })
    .toArray();
  return patientsWithStaffMember;
};

const updatePatient = async (
  patientId,
  name,
  dataofBirth,
  diagnosis,
  medication,
  admissionDate
) => {
  patientId = patientId.trim();

  //Get the patient first
  let fectchObj = getPatientByID(patientId);

  await automation.patientStatusAlert(status);

  let newObj = {
    name: name,
    dataofBirth: dataofBirth,
    diagnosis: diagnosis,
    medication: medication,
    admissionDate: admissionDate,
    familyMembers: fectchObj.familyMembers,
    StaffMembers: fectchObj.StaffMembers,
  };

  const patientsCollections = await patients();
  const result = await patientsCollections.updateOne(
    { _id: ObjectId(patientId) }, // Assuming patientId is a MongoDB ObjectId
    { $set: newObj }
  );

  if (result.modifiedCount === 1) {
    console.log(`Patient with ID ${patientId} successfully updated.`);
  } else {
    console.log(`Update for patient with ID ${patientId} failed.`);
    throw {
      statusCode: 404,
      error: "Patient could not be updated",
    };
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientByID,
  getPatientByFamilyMember,
  getPatientByStaffMember,
  updatePatient,
};
