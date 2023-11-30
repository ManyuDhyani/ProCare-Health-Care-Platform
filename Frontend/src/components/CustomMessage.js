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

export default function CustomMessage(props) {
  console.log(props.props._id);
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
    let m = document.getElementById("message").value;
    const message = axios.post("http://localhost:8000/automation", {
      patientId: props.props._id,
      message: m,
    });
    handleClose();
  };

  return (
    <div className={styles.Addpatient}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Message
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter Message</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="message"
            type="text"
            fullWidth
            variant="standard"
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
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
