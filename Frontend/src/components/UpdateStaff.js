import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import styles from "../css/Addmedicine.module.css";

import "../App.css";

export default function UpdateStatus(props) {
  const [open, setOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState(""); // Added state for health status

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = (event) => {
    setHealthStatus(event.target.value);
  };

  const handleSubmit = () => {
    if (!healthStatus) {
      alert("Please fill in all the fields");
    } else {
      axios.post(`http://localhost:8000/patient/${props.props._id}`, {
        name: props.props.name,
        dataofBirth: props.props.dataofBirth,
        diagnosis: props.props.diagnosis,
        medication: props.props.medication,
        admissionDate: props.props.admissionDate,
        status: healthStatus,
      });
      console.log(props.props);

      setOpen(false);
      alert("Status updated successfully");
    }
  };

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>{props.props.status}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update status</DialogContentText>
          <Select
            value={healthStatus}
            onChange={handleStatusChange}
            label="Health Status"
            fullWidth
            variant="standard"
            required
          >
            <MenuItem value="Healthy">Healthy</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Critical">Critical</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} id="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
