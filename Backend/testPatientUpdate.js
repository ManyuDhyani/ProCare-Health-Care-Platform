const { use } = require("passport");
const { closeConnection } = require("./Config/mongoConnection");
const inventory = require("./data/inventory");
const patients = require("./data/patients");
const users = require("./data/users");



async function main() {
  
  try {
    const patientOne = await patients.createPatient(
      "Mahesh Dhondge",
      "1985-06-15",
      "Male",
      "Hypertension",
      "Lisinopril",
      "2023-10-20",
      "stable"

    );
    const patientOneId = patientOne._id;
    console.log("patient 1",patientOne);
    console.log("id ",patientOneId);

  } catch (e) {
    console.log(e);
  }

  try{
  const familyOne = await users.createUser(
    "mahesh.dhondge@gmail.com",
    "password1234",
    "3322654207"
  );
  console.log(patientOne);
} catch (e) {
  console.log(e);
}
try{
const staffOne = await users.createUser(
    "maheshscoe@gmail.com",
    "password1234",
    "5516979406"
  );
  console.log(patientOne);
} catch (e) {
  console.log(e);
}

try{
    let patientOneUpdate = await patients.updatePatient(
    "6555930a7f3e72d77289bd0f",
    "Shreneel",
    "12-03-1996",
    "Hypertension",
    "Lisinopril",
    "2023-10-20",
    "stable"
      );
      console.log("Updated patient ",patientOneUpdate);
    } catch (e) {
      console.log(e);
    }



  closeConnection();
}

main();