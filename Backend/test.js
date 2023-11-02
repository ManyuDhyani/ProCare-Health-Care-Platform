const { use } = require("passport");
const { closeConnection } = require("./Config/mongoConnection");
const inventory = require("./data/inventory");
const patients = require("./data/patients");
const users = require("./data/users");


// name,
// mg,
// exp_date,
// current_stock,
// threshold,
// remark
async function main() {
  try {
    let medicieOne = await inventory.createMedicine(
      "Dolo",
      "600",
      "01/24",
      4,
      10,
      "SOS: Treat High Fever."
    );
    console.log(medicieOne);
    console.log("Test function 1 passed: OK")
  } catch (e) {
    console.log(e);
  }
  try {
    let medicieTwo = await inventory.createMedicine(
      "Aspirin",
      "325",
      "10/24",
      20,
      5,
      "Pain Relief and blood thinner."
    );
    console.log(medicieTwo);
    console.log("Test function 2 passed: OK")
  } catch (e) {
    console.log(e);
  }
  try {
    let medicieThree = await inventory.createMedicine(
      "Benadryl",
      "25",
      "08/23",
      15,
      3,
      "Allergy relief."
    );
    console.log(medicieThree);
    console.log("Test function 3 passed: OK")
  } catch (e) {
    console.log(e);
  }
  // get all medicines
  try {
    let allMedicines = await inventory.getAllMedicines();
    console.log(allMedicines);
    console.log("Test function 4 passed: OK")
  } catch (e) {
    console.log(e);
  }
  try {
    let patientOne = await patients.createPatient(
      "John Doe",
      "1985-06-15",
      "Male",
      "Hypertension",
      "Lisinopril",
      "2023-10-20",
      ["Jane Doe", "Michael Doe", "Sarah Doe"],
      ["Dr. Smith", "Nurse Johnson", "Dr. Patel"]
    );
    console.log(patientOne);
    console.log("Test function 5 passed: OK")

  } catch (e) {
    console.log(e);
  }

  // handle name parameter
  try {
    let patientTwo = await patients.createPatient(
      "Michael Johnson",
      "1978-12-28",
       "Male",
       "Osteoarthritis",
      "Ibuprofen",
     "2023-11-01",
     ["Jennifer Johnson", "David Johnson", "Emily Johnson", "Sophia Johnson"],
     ["Dr. Rodriguez", "Nurse Brown", "Dr. Kim"]
    );
    console.log(patientTwo);
    console.log("Test function 6 passed: OK")

  } catch (e) {
    console.log(e);
  }

  try {
    let patientThree = await patients.createPatient(
        "Alice Smith",
         "1990-03-12",
        "Female",
        "Type 2 Diabetes",
        "Metformin",
        "2023-09-10",
        ["Bob Smith", "Carol Smith"],
        ["Dr. Anderson", "Nurse Williams", "Dr. Lee"]
      
    );
    console.log(patientThree);
    console.log("Test function 7 passed: OK")
  } catch (e) {
    console.log(e);
  }

  // test for get all patients
  try {
    let allPatients = await patients.getAllPatients();
    console.log(allPatients);
    console.log("Test function 8 passed: OK")

  } catch (e) {
    console.log(e);
  }

 // tests for user functions 
  try {
    let firstUser = await users.createUser(

      "john.doe@example.com",
      "s3cr3tP@ssw0rd",
      "1234567890"
      
    );
    console.log(firstUser);
    console.log("Test function 9 passed: OK")

  } catch (e) {
    console.log(e);
  }

  try {
    let secondUser = await users.createUser(
      "jane.smith@example.com",
      "myPassw0rd123",
      "9876543210"
    );
    console.log(secondUser);
    console.log("Test function 10 passed: OK")

  } catch (e) {
    console.log(e);
  }

  try {
    let thirdUser = await users.createUser(
      "user1234@emailprovider.com",
      "Passw0rd!@#",
      "5551234567"
    );
    console.log(thirdUser);
    console.log("Test function 11 passed: OK")

  } catch (e) {
    console.log(e);
  }

  // test to get all users
  try {
    let allUsers = await users.getAllUsers();
    console.log(allUsers);
    console.log("Test function 12 passed: OK")

  } catch (e) {
    console.log(e);
  }

  closeConnection();
}

main();
