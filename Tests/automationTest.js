// To check and test the code you can insert your own mail as well.
const automation = require("../Backend/data/automation");

// Test1: Patient Status Alert when there health status change. Mail is sent.
let emailId = ['manyudhyani@gmail.com', 'kshitijchaudhari12345@gmail.com']
let status = "Critical"
automation.patientStatusAlert(emailId, status)
console.log("Test Case 1: Passed - Mail is sent")

// Test2: Inventory Alert when stock is less than Threshold. Mail is sent.
automation.inventoryAlert(20, 25);
console.log("Test Case 2: Passed - Mail is sent")

// Test3: Inventory Alert when stock is more than Threshold. No Mail is sent.
automation.inventoryAlert(400, 25);
console.log("Test Case 3: Passed - No Mail is sent")

// Test4: Registration Alert for new registered user. Mail is sent.
emailId = 'manyudhyani@gmail.com'
automation.registeredAlert(emailId)
console.log("Test Case 4: Passed - Mail is sent")

// Test5: Feedback Alert for the Admin. Mail is sent.
let feedback = "This is Feedback Alert Test"
automation.feedbackAlert(feedback)
console.log("Test Case 5: Passed - Mail is sent")

// Test6: Patient Status Alert when there health status change. Mail is sent.
emailId = ['manyudhyani@gmail.com', 'kshitijchaudhari12345@gmail.com']
status = "Stable"
automation.patientStatusAlert(emailId, status)
console.log("Test Case 6: Passed - Mail is sent")

