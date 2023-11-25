const cron = require('node-cron');
const nodemailer = require('nodemailer');

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
const sendHealthStatusEmail = (familyEmail) => {
  // Set up email content
  const mailOptions = {
    from: 'hcare.max.18@gmail.com',
    to: familyEmail,
    subject: 'Patient Health Status Update',
    text: 'ProCare: Your patient is okay. No cause for concern.',
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error.message);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Schedule the email to be sent every 24 hours
cron.schedule('0 0 * * *', () => {
  // Basically pass the list of the patient family member
  sendHealthStatusEmail(['family@example.com']);
});