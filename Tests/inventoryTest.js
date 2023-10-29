// This is integration testing for the inventory data functions to verify connections of Express server with MongoDB.

const { closeConnection } = require('../Backend/Config/mongoConnection') ;
const inventory = require('../Backend/data/inventory');

async function main(){
    try {
        let medicieOne = await inventory.createMedicine("Dolo", "600", "01/24", 4, 10, "SOS: Treat High Fever.")
        console.log(medicieOne)
    }catch(e){
        console.log (e);
    }
    try {
        let medicieList = await inventory.getMedicineLowinThreshold()
        console.log(medicieList)
    }catch(e){
        console.log (e);
    }
    try {
        let medicieList = await inventory.getMedicineAboutToExp()
        console.log(medicieList)
    }catch(e){
        console.log (e);
    }
    closeConnection();
}

main();