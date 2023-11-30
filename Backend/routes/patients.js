//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const data = require("../data");
const patientData = data.patients;
router
  .route("/")
  .get(async (req, res) => {
    //Get all the patients data
    try {
      let getall = await patientData.getAllPatients();
      res.json(getall);
    } catch (e) {
      res.status(e.statusCode).json(e.error);
    }
  })
  .post(async (req, res) => {
    //Create new patient
    try {
      console.log("Inside Post");
      let { name, dataofBirth, gender, diagnosis, medication, admissionDate } =
        req.body;
      console.log(req.body);
      const postPatient = await patientData.createPatient(
        name,
        dataofBirth,
        gender,
        diagnosis,
        medication,
        admissionDate
      );
      console.log("Ending call to function");
      res.json(postPatient);
    } catch (e) {
      res.status(e.statusCode).json(e.error);
    }
  });
router
  .route("/:patientID")
  .get(async (req, res) => {
    //Get Patient with ID
    try {
      let pId = req.params.patientID;
      const getPatient = await patientData.getPatientByID(pId);
      res.json(getPatient);
    } catch (e) {
      res.status(e.statusCode).json(e.error);
    }
  })
  .post(async (req, res) => {
    try {
      console.log("here");
      let pId = req.params.patientID;
      let { name, dataofBirth, diagnosis, medication, admissionDate, status } =
        req.body;
      console.log(
        name,
        dataofBirth,
        diagnosis,
        medication,
        admissionDate,
        status
      );
      const getUpdatedPatient = await patientData.updatePatient(
        pId,
        name,
        dataofBirth,
        diagnosis,
        medication,
        admissionDate,
        status
      );
      res.json(getUpdatedPatient);
    } catch (e) {
      res.status(e.statusCode).json(e.error);
    }
  });

router.route("/SF/:patientID").post(async (req, res) => {
  try {
    console.log("here");
    let pId = req.params.patientID;
    let {
      name,
      dataofBirth,
      diagnosis,
      medication,
      admissionDate,
      StaffMembers,
      status,
    } = req.body;
    console.log(
      name,
      dataofBirth,
      diagnosis,
      medication,
      admissionDate,
      StaffMembers,
      status
    );

    const getUpdatedPatient = await patientData.updatePatientStaff(
      pId,
      name,
      dataofBirth,
      diagnosis,
      medication,
      admissionDate,
      StaffMembers,
      status
    );
    res.json(getUpdatedPatient);
  } catch (e) {
    res.status(e.statusCode).json(e.error);
  }
});

module.exports = router;
