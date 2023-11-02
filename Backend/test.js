const { closeConnection } = require("./Config/mongoConnection");
const inventory = require("./data/inventory");

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
  closeConnection();
}

main();
