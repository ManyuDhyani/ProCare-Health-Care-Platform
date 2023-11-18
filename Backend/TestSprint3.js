const { use } = require("passport");
const { closeConnection } = require("./Config/mongoConnection");
const inventory = require("./data/inventory");
const patients = require("./data/patients");
const users = require("./data/users");



async function main() {

  let patientOne = "";
  let patientTwo = "";
  let patientThree = "";
  let patientOneId = "";
  let patientTwoId = "";
  let patientThreeId = "";
  let familyOne = "";
  let familyTwo = "";
  let familyThree = "";
  let staffOne = "";
  let staffTwo = "";
  let staffThree = "";

  
  
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
    patientOneId = patientOne._id;
    console.log("patient 1",patientOne);
    console.log("id ",patientOneId);

  } catch (e) {
    console.log(e);
  }

  try {
    const patientTwo = await patients.createPatient(
      "Gayatri Awate",
      "1985-06-15",
      "Diabetes",
      "Metformin",
      "2023-10-20",
      "stable"

    );
    patientTwoId = patientTwo._id;
    console.log("patient 2",patientTwo);
    console.log("id ",patientTwoId);

  } catch (e) {
    console.log(e);
  }

  try {
    const patientThree = await patients.createPatient(
      "Kshitij Chaudhari",
      "1999-06-15",
      "Male",
      "Osteoporosis",
      "Calcirol",
      "2023-10-20",
      "stable"

    );
    patientThreeId = patientThree._id;
    console.log("patient 3",patientThree);
    console.log("id ",patientThreeId);

  } catch (e) {
    console.log(e);
  }

  try{
  const familyOne = await users.createUser(
    "mahesh.dhondge@gmail.com",
    "password1234",
    "3322654207"
  );
  console.log(familyOne);
} catch (e) {
  console.log(e);
}

try{
  const familyTwo = await users.createUser(
    "manyudhyani@gmail.com",
    "password1234",
    "3322654207"
  );
  console.log(familyTwo);
} catch (e) {
  console.log(e);
}

try{
  const familyThree = await users.createUser(
    "ckothadi@stevens.edu",
    "password1234",
    "3322654207"
  );
  console.log(familyThree);
} catch (e) {
  console.log(e);
}

try{
const staffOne = await users.createUser(
    "Gsokhi@stevens.edu",
    "password1234",
    "5516979406"
  );
  console.log(staffOne);
}
catch (e) {
  console.log(e);
}

  try{
    const staffTwo = await users.createUser(
    "skala1@stevens.edu",
    "password1234",
    "5516979406"
      );
      console.log(staffTwo);

    }
      catch (e) {
        console.log(e);
      }
  try{
    const staffThree = await users.createUser(
    "gawate@stevens.edu",
    "password1234",
    "5516979406"
      );    
  console.log(staffThree);
} catch (e) {
  console.log(e);
}


  try {
    let medicieOne = await inventory.createMedicine("Dolo", "800", "01/24", 4, 12, "SOS: Treat High Fever.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("Paracetamol", "100", "03/24", 3, 15, "SOS: Fever and pain relief.")
    console.log(medicieOne)
    }catch(e){
      console.log (e);
    }
    try {
    let medicieOne = await inventory.createMedicine("Ibuprofen", "200", "06/24", 2, 14, "SOS: Anti-inflammatory and pain relief.")
    console.log(medicieOne)
  }catch(e){
      console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("Aspirin", "400", "01/24", 6, 14, "SOS: Blood thinner and pain relief.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("Ciprofloxacin", "100", "08/24", 4, 10, "SOS: Antibiotic for bacterial infections.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("Loratadine", "200", "10/24", 2, 10, "SOS: Antihistamine for allergies.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("Omeprazole", "300", "02/24", 6, 18, "SOS: Proton pump inhibitor for heartburn.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("Amoxicillin", "600", "06/24", 2, 12, "SOS: Antibiotic for bacterial infections.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("DHydrochlorothiazideolo", "100", "03/25", 4, 16, "SOS: Diuretic for high blood pressure.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }
  try {
    let medicieOne = await inventory.createMedicine("Simvastatin", "20", "03/24", 30, 11, "SOS: Statins for cholesterol management.")
    console.log(medicieOne)
  }catch(e){
    console.log (e);
  }

  closeConnection();
}

main();