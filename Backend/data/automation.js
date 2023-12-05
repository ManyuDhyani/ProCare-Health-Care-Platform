const mongoCollections = require("../Config/mongoCollections");
const nodemailer = require("nodemailer");
const patientData = require("./patients");
const user_collection = mongoCollections.users;
let { ObjectId } = require("mongodb");

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

// Medication information
const medicationStock = 4; // Replace with your actual stock count
const minimumThreshold = 10;

// Email configuration for inventory
const mailOptions = {
  from: "hcare.max.18@gmail.com", // sender address
  to: "hcare.max.18@gmail.com", // list of receivers
  subject: "ProCare: Medication Stock Alert", // Subject line
  text: `Medication stock is below the minimum threshold.`,
};

const inventoryAlert = async (medicationStock, minimumThreshold) => {
  // Check stock level and send email if below the threshold
  if (medicationStock < minimumThreshold) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error(error);
      }
      console.log("Email sent: " + info.response);
    });
  } else {
    console.log("Stock is sufficient. No email sent.");
  }
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

const registeredAlert = async (emailId) => {
  // sending email to registered users
  const messg = `We're pleased to inform you that your registration (with emailId: ${emailId}) for our service has been successfully received. Thank you for choosing to be a part of our community! Your account is currently pending activation and will undergo a thorough review process by our administrative team. We anticipate completing this process within the next 24 hours. Once the necessary checks and actions are taken, your account will be activated. We appreciate your patience and understanding during this brief period. Thank you for choosing our service. We look forward to having you on board!`;
  const mailOptionsRegister = {
    from: "hcare.max.18@gmail.com", // sender address
    to: emailId, // list of receivers
    subject: "ProCare: Registration Successful", // Subject line
    text: messg,
  };
  transporter.sendMail(mailOptionsRegister, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
};

const userTypeUpdateAlert = async (emailId, userType) => {
  // sending email to registered users
  let type;
  if (userType === "S") {
    type = "Staff Member";
  } else if (userType === "F") {
    type = "Family Member";
  } else if (userType === "A") {
    type = "Admin";
  }

  const messg = `Your account has been activated for${emailId} and you have been registered as ${type}`;
  const mailOptionsRegister = {
    from: "hcare.max.18@gmail.com", // sender address
    to: emailId, // list of receivers
    subject: "ProCare: Registration Successful", // Subject line
    text: messg,
  };
  transporter.sendMail(mailOptionsRegister, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
};

// Email for feedback to company
const feedbackAlert = async (feedback) => {
  const mailOptionsFeedback = {
    from: "hcare.max.18@gmail.com", // sender address
    to: "hcare.max.18@gmail.com", // list of receivers
    subject: "ProCare: New Feedback", // Subject line
    text: feedback,
  };
  transporter.sendMail(mailOptionsFeedback, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
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

// Sending customize message by staff to family
const customizeAlert = async (message, patientId) => {
  //Fetch all the familyMembers associated to this patient
  //And send alll of them email about this custom message
  let familyObj = await patientData.getPatientByID(patientId);
  console.log(familyObj);
  console.log(message);
  let familyMem = familyObj.familyMembers[0];
  console.log(familyMem);
  const mailOptionsFeedback = {
    from: "hcare.max.18@gmail.com", // sender address
    to: await getUserEmailByID(familyMem), // list of receivers
    subject: "ProCare: Important update about your Patinet.", // Subject line
    text: message,
  };
  transporter.sendMail(mailOptionsFeedback, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("Email sent: " + info.response);
  });
};

module.exports = {
  inventoryAlert,
  patientStatusAlert,
  registeredAlert,
  feedbackAlert,
  customizeAlert,
  userTypeUpdateAlert,
};
