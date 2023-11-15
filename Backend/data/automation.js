const nodemailer = require("nodemailer");

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
  to: "manyudhyani@gmail.com", // list of receivers
  subject: "Medication Stock Alert", // Subject line
  text: `Medication stock is below the minimum threshold. Current stock: ${medicationStock}`,
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
    subject: "Patient Status: " + status, // Subject line
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
  const mailOptionsStatus = {
    from: "hcare.max.18@gmail.com", // sender address
    to: emailId, // list of receivers
    subject: "Registration Successful", // Subject line
    text: messg,
  };

module.exports = {
  inventoryAlert,
  patientStatusAlert,
  registeredAlert,
};
