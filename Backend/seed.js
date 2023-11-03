const { use } = require("passport");
const { closeConnection } = require("./Config/mongoConnection");
const inventory = require("./data/inventory");
const patients = require("./data/patients");
const users = require("./data/users");



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
      [],
      []
    );
    console.log(patientOne);

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
     [],
     []
    );
    console.log(patientTwo);

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
        [],
        []
      
    );
    console.log(patientThree);
  } catch (e) {
    console.log(e);
  }

  
  try {
    let firstUser = await users.createUser(

      "john.doe@example.com",
      "s3cr3tP@ssw0rd",
      "1234567890"
      
    );
    console.log(firstUser);

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
  } catch (e) {
    console.log(e);
  }

  
  closeConnection();
}

main();
