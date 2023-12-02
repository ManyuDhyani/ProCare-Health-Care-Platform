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

export default function UpdateStaff(props) {
  const { row, usr, setUSR } = props.props;
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

  // console.log("Staff", staff);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStaffChange = (event) => {
    setHealthStaff(event.target.value);
  };
  // console.log("HEALTH STAFF", healthStaff);

  const handleSubmit = async () => {
    if (!healthStaff) {
      alert("Please fill in all the fields");
    } else {
      await axios.post(
        `http://localhost:8000/patient/SF/${props.props.row._id}`,
        {
          name: props.props.row.name,
          dataofBirth: props.props.row.dataofBirth,
          diagnosis: props.props.row.diagnosis,
          medication: props.props.row.medication,
          admissionDate: props.props.row.admissionDate,
          StaffMembers: healthStaff,
          status: props.props.row.status,
        }
      );
      //   console.log(props.props);
      await setUSR(true);
      setOpen(false);
      alert("Staff updated successfully");
    }
  };

  useEffect(() => {
    staff_members();
  }, []);

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>
        {props && props.props.row.StaffMembers[0]
          ? props.props.row.StaffMembers[0]
          : "assign"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update Staff</DialogContentText>
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
