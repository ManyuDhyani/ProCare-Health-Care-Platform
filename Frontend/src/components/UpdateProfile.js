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

import "../App.css";

export default function UpdateProfile(props) {
  const [open, setOpen] = useState(false);
  const user = props.props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(props.props._id);
  const handlesubmit = () => {
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    if (!email || !phoneNumber) {
      alert("Please fill the all the fields");
    } else {
      axios.post("http://localhost:8000/user/updateProfile", {
        userID: user.userID,
        email: email,
        phoneNumber: phoneNumber,
      });
      // console.log("updateProfile Check", email, phoneNumber);
      // console.log(user);
      setOpen(false);
      alert("Profile updated successfully");
    }
    // setUs(true);
  };

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>Change Email/PhoneNumber</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update profile</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="string"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="string"
            fullWidth
            variant="standard"
            required
            inputProps={{ maxLength: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlesubmit} id="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
