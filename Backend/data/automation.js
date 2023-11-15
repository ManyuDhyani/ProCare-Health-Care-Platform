const nodemailer = require('nodemailer');

// Replace these values with your Gmail SMTP details
const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // set to true if using SSL
  auth: {
    user: 'hcare.max.18@gmail.com',
    pass: 'pcqynippnjefmbur'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

// Medication information
const medicationStock = 4; // Replace with your actual stock count
const minimumThreshold = 10;

// Email configuration for inventory
const mailOptions = {
  from: 'hcare.max.18@gmail.com', // sender address
  to: 'manyudhyani@gmail.com', // list of receivers
  subject: 'Medication Stock Alert', // Subject line
  text: `Medication stock is below the minimum threshold. Current stock: ${medicationStock}`
};


const inventoryAlert  = async (medicationStock, minimumThreshold) => {
// Check stock level and send email if below the threshold
if (medicationStock < minimumThreshold) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error(error);
      }
      console.log('Email sent: ' + info.response);
    });
  } else {
    console.log('Stock is sufficient. No email sent.');
  }
}

const patientStatusAlert  = async (status) => {
    // Email config for status
    const mailOptionsStatus = {
        from: 'hcare.max.18@gmail.com', // sender address
        to: 'manyudhyani@gmail.com', // list of receivers
        subject: 'Patient Status: ' + status , // Subject line
      };
    if (status === "stable" ) {
        mailOptionsStatus.text = 'Your patient is stable';
        transporter.sendMail(mailOptionsStatus, (error, info) => {
          if (error) {
            return console.error(error);
          }
          console.log('Email sent: ' + info.response);
        });
      } 
      else if (status === "critical") {
        mailOptionsStatus.text = 'Your patient is critical';
        transporter.sendMail(mailOptionsStatus, (error, info) => {
            if (error) {
              return console.error(error);
            }
            console.log('Email sent: ' + info.response);
          });
      } else if (status === "discharged") {
        mailOptionsStatus.text = 'Your patient is discharged';
        transporter.sendMail(mailOptionsStatus, (error, info) => {
            if (error) {
              return console.error(error);
            }
            console.log('Email sent: ' + info.response);
          });
      }
      else {
        console.log('No change in status. No email sent.');
      }
    }


module.exports = {
    inventoryAlert,
    patientStatusAlert,
  };