const cron = require("node-cron");
const nodemailer = require("nodemailer");
const patientData = require("../Backend/data/patients");

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

// Function to send health status email
const sendHealthStatusEmail = (familyEmail, status) => {
  // Set up email content
  const mailOptions = {
    from: "hcare.max.18@gmail.com",
    to: familyEmail,
    subject: `Patient Health Status Update, Status = ${status}`,
    text: `ProCare: Your patient is ${status}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Schedule the email to be sent every 24 hours
cron.schedule("0 0 * * *", async () => {
  // Basically pass the list of the patient family member
  let allPatientObj = await patientData.getAllPatients();

  allPatientObj.forEach((elem) => {
    let fimilyMemsArr = elem.familyMembers;
    let status = elem.status;
    fimilyMemsArr.forEach((elem2) => {
      sendHealthStatusEmail(elem2, status);
    });
  });
});
