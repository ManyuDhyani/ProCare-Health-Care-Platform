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

export default function UpdateFamily(props) {
  const { row, ufr, setUFR } = props.props;
  const [open, setOpen] = useState(false);
  const [healthFamily, setHealthFamily] = useState(""); // Added state for health status
  const [family, setFamily] = useState([]);
  const family_members = async () => {
    const temp = await axios.get("http://localhost:8000/user");
    let family_array = [];
    for (let i = 0; i < temp.data.length; i++) {
      if (temp.data[i].type === "F") {
        family_array.push(temp.data[i]);
      }
    }
    // console.log("ARRA", staff_array);
    setFamily(family_array);
  };

  // console.log("Family", family);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFamilyChange = (event) => {
    setHealthFamily(event.target.value);
  };
  // console.log("HEALTH FAM", healthFamily);

  const handleSubmit = async () => {
    if (!healthFamily) {
      alert("Please fill in all the fields");
    } else {
      await axios.post(
        `http://localhost:8000/patient/F/${props.props.row._id}`,
        {
          name: props.props.row.name,
          dataofBirth: props.props.row.dataofBirth,
          diagnosis: props.props.row.diagnosis,
          medication: props.props.row.medication,
          admissionDate: props.props.row.admissionDate,
          familyMembers: healthFamily,
          status: props.props.row.status,
        }
      );

      setUFR(true);
      setOpen(false);
      alert("Family updated successfully");
    }
  };

  useEffect(() => {
    family_members();
  }, []);

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>
        {props && props.props.row.familyMembers[0]
          ? props.props.row.familyMembers[0]
          : "assign"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update Family</DialogContentText>
          <Select
            value={healthFamily}
            onChange={handleFamilyChange}
            label="Health Family"
            fullWidth
            variant="standard"
            required
          >
            {family.map((option, index) => (
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
