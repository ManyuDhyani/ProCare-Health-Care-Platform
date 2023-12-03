const mongoCollections = require("../Config/mongoCollections");
const patients = mongoCollections.patients;
const user_collection = mongoCollections.users;
let { ObjectId } = require("mongodb");
const automation = require("./automation");
const user = require("./users");

const nodemailer = require("nodemailer");
const patientData = require("./patients");

// Replace these values with your Gmail SMTP details
const smtpConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // set to true if using SSL
  auth: {
    user: "hcare.max.18@gmail.com",
    pass: "pcqynippnjefmbur",
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

//Create Function
const createPatient = async (
  name,
  dataofBirth,
  gender,
  diagnosis,
  medication,
  admissionDate,
  status
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
    status: "stable",
  };
  const patientsCollections = await patients();
  //Insert the record
  let insertPatient = await patientsCollections.insertOne(newObj);
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

const temp = async () => {
  console.log("Madarchot");
};

const getUserEmailByID = async (userId) => {
  //email = email.trim();
  console.log("Inside getUserEmailById", userId);
  const userCollections = await user_collection();
  console.log("getUserEmailById", 1);
  let getEmailID = await userCollections.findOne({ _id: ObjectId(userId) });
  console.log(getEmailID.email);
  if (!getEmailID) {
    throw { statusCode: 400, error: "No User Found" };
  }
  console.log("getUserEmailById", 2);
  console.log(getEmailID);
  return getEmailID.email;
};

const patientStatusAlert = async (emailId, status) => {
  // Email config for status
  const mailOptionsStatus = {
    from: "hcare.max.18@gmail.com", // sender address
    to: emailId, // list of receivers
    subject: "ProCare: Patient Status - " + status, // Subject line
  };

  mailOptionsStatus.text = `Your patient is ${status}`;
  transporter.sendMail(mailOptionsStatus, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
};

const updatePatient = async (
  patientId,
  name,
  dataofBirth,
  diagnosis,
  medication,
  admissionDate,
  status
) => {
  patientId = patientId.trim();

  //Get the patient first
  let fectchObj = await getPatientByID(patientId);

  // if (fectchObj.status !== status) {
  //   //Before we automate we will need to get all the familyMem IDs and Staff Mem Ids
  //   //For each IDs we need to fetch their data and get their email IDS
  //   // And the for each Email IDs we will call this automation function to send email

  //   let familyMebArr = fectchObj.newObj.familyMembers;
  //   let StaffMemArr = fectchObj.newObj.StaffMembers;
  //   let AllUsersArr = familyMebArr.concat(StaffMemArr);
  //   // AllUsersArr.forEach(async (elem) => {
  //   //   let emailId = usersData.getUserEmailByID(elem);
  //   //   await automation.patientStatusAlert(emailId, status);
  //   // });
  // }

  let newObj = {
    name: name,
    dataofBirth: dataofBirth,
    diagnosis: diagnosis,
    medication: medication,
    admissionDate: admissionDate,
    familyMembers: fectchObj.familyMembers,
    StaffMembers: fectchObj.StaffMembers,
    status: status,
  };
  const patientsCollections = await patients();
  if (fectchObj.status !== status) {
    const result = await patientsCollections.updateOne(
      { _id: ObjectId(patientId) }, // Assuming patientId is a MongoDB ObjectId
      { $set: newObj }
    );

    //Send an email here
    console.log("abababab");
    let emailId = await getUserEmailByID(fectchObj.familyMembers[0]);
    console.log("After abababab", emailId);
    //let emailId = await usersData.getUserEmailByID(fectchObj.familyMembers[0]);
    const xyz = await patientStatusAlert(emailId, status);

    if (result.modifiedCount === 1) {
      console.log(`Patient with ID ${patientId} successfully updated.`);
    } else {
      console.log(`Update for patient with ID ${patientId} failed.`);
      throw {
        statusCode: 404,
        error: "Patient could not be updated",
      };
    }
  }
  //Fetch again
  let ID = ObjectId(patientId);
  let fetchPatientAgain = await patientsCollections.findOne({
    _id: ID,
  });
  if (!fetchPatientAgain) {
    throw {
      statusCode: 404,
      error: "No Patient with the given ID present in the Database",
    };
  }
  fetchPatientAgain._id = fetchPatientAgain._id.toString();
  return fetchPatientAgain;
};

const updatePatientStaff = async (
  patientId,
  name,
  dataofBirth,
  diagnosis,
  medication,
  admissionDate,
  StaffMembers,
  status
) => {
  const patientsCollections = await patients();
  let fectchObj = await getPatientByID(patientId);
  console.log(fectchObj);
  let newObj = {
    name: name,
    dataofBirth: dataofBirth,
    diagnosis: diagnosis,
    medication: medication,
    admissionDate: admissionDate,
    familyMembers: fectchObj.familyMembers,
    StaffMembers: [StaffMembers],
    status: status,
  };
  console.log("newObj", newObj);

  if (fectchObj.StaffMembers[0] !== StaffMembers) {
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
  }
  console.log("1111", fectchObj.StaffMembers[0], StaffMembers);
  //Fetch again
  let ID = ObjectId(patientId);
  let fetchPatientAgain = await patientsCollections.findOne({
    _id: ID,
  });

  if (!fetchPatientAgain) {
    throw {
      statusCode: 404,
      error: "No Patient with the given ID present in the Database",
    };
  }
  fetchPatientAgain._id = fetchPatientAgain._id.toString();
  return fetchPatientAgain;
};

const updatePatientFamily = async (
  patientId,
  name,
  dataofBirth,
  diagnosis,
  medication,
  admissionDate,
  familyMembers,
  status
) => {
  let fectchObj = await getPatientByID(patientId);
  console.log(fectchObj);
  let newObj = {
    name: name,
    dataofBirth: dataofBirth,
    diagnosis: diagnosis,
    medication: medication,
    admissionDate: admissionDate,
    familyMembers: [familyMembers],
    StaffMembers: fectchObj.StaffMembers,
    status: status,
  };
  console.log("newObj", newObj);
  const patientsCollections = await patients();
  if (fectchObj.familyMembers[0] !== familyMembers) {
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
  }
  //Fetch again
  let ID = ObjectId(patientId);
  let fetchPatientAgain = await patientsCollections.findOne({
    _id: ID,
  });

  if (!fetchPatientAgain) {
    throw {
      statusCode: 404,
      error: "No Patient with the given ID present in the Database",
    };
  }
  fetchPatientAgain._id = fetchPatientAgain._id.toString();
  return fetchPatientAgain;
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientByID,
  getPatientByFamilyMember,
  getPatientByStaffMember,
  updatePatient,
  updatePatientStaff,
  updatePatientFamily,
};
