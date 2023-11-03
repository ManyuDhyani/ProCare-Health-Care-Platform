import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import styles from "../css/Addmedicine.module.css";

export default function Addpatient() {
  const [open, setOpen] = useState(false);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentmonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currDate = (currentDate.getDate() + 1).toString().padStart(2, "0");
  const maxDate = `${currentYear}-${currDate}-${currentmonth}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlesubmit = (e) => {
    const name = document.getElementById("name").value;
    const dateofBirth = document.getElementById("dateofBirth").value;
    const gender = document.getElementById("gender").value;
    const diagnosis = document.getElementById("diagnosis").value;
    const medication = document.getElementById("medication").value;
    const admissionDate = document.getElementById("admissionDate").value;
    const selectedbday = admissionDate;
    const [yearb, monthb, dateb] = selectedbday.split("-");
    const selecteddob = dateofBirth;
    const [year, month, date] = selecteddob.split("-");
    const formattedbday = `${monthb}/${dateb}/${yearb}`;
    const formatteddob = `${month}/${date}/${year}`;

    if (
      !name ||
      !dateofBirth ||
      !gender ||
      !medication ||
      !admissionDate ||
      !formattedbday ||
      !formatteddob
    ) {
      alert("Please fill the all the fields");
    } else {
      axios.post("http://localhost:8000/patient", {
        name,
        dateofBirth,
        gender,
        diagnosis,
        medication,
        admissionDate,
      });
      setOpen(false);
      alert("Patient added successfully");
    }
  };

  return (
    <div className={styles.Addpatient}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add patient
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Patient Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter Medicine details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="Name"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="dateofBirth"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="standard"
            inputProps={{
              max: maxDate,
              style: {
                marginLeft: "130px",
              },
            }}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="gender"
            label="gender"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="diagnosis"
            label="diagnosis"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="medication"
            label="medication"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="admissionDate"
            label="Admission Date"
            type="date"
            fullWidth
            variant="standard"
            inputProps={{
              max: maxDate,
              shrink: true,
              style: {
                marginLeft: "130px",
              },
            }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handlesubmit(e);
            }}
            id="submit"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
