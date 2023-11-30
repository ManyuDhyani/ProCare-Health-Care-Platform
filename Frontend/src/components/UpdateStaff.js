import React, { useEffect, useState } from "react";
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
  const [healthStaff, setHealthStaff] = useState(""); // Added state for health status
  const [staff, setStaff] = useState([]);
  const staff_members = async () => {
    const temp = await axios.get("http://localhost:8000/user");
    let staff_array = [];
    for (let i = 0; i < temp.data.length; i++) {
      if (temp.data[i].type === "S") {
        staff_array.push(temp.data[i]);
      }
    }
    // console.log("ARRA", staff_array);
    setStaff(staff_array);
  };

  console.log("Staff", staff);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStaffChange = (event) => {
    setHealthStaff(event.target.value);
  };
  console.log("HEALTH STAFF", healthStaff);

  const handleSubmit = () => {
    if (!healthStaff) {
      alert("Please fill in all the fields");
    } else {
      axios.post(`http://localhost:8000/patient/SF/${props.props._id}`, {
        name: props.props.name,
        dataofBirth: props.props.dataofBirth,
        diagnosis: props.props.diagnosis,
        medication: props.props.medication,
        admissionDate: props.props.admissionDate,
        StaffMembers: healthStaff,
        status: props.props.status,
      });
      //   console.log(props.props);

      setOpen(false);
      alert("Status updated successfully");
    }
  };

  useEffect(() => {
    staff_members();
  }, []);

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>{props.props.StaffMembers[0]}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update status</DialogContentText>
          <Select
            value={healthStaff}
            onChange={handleStaffChange}
            label="Health Staff"
            fullWidth
            variant="standard"
            required
          >
            {staff.map((option, index) => (
              <MenuItem key={index} value={option._id}>
                {option.email}
              </MenuItem>
            ))}
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
