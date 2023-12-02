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

export default function UpdateType(props) {
  const { row, utr, setUTR } = props.props;
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(""); // Added state for health status
  const [userdata, setUserdata] = useState([]);
  const users = async () => {
    const temp = await axios.get("http://localhost:8000/user");
    let user1 = temp.data;
    // console.log(user1);
    setUserdata(user1);
    // console.log("ARRA", staff_array);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  //   console.log("HEALTH FAM", healthFamily);

  const handleSubmit = () => {
    if (!type) {
      alert("Please fill in all the fields");
    } else {
      axios.post(`http://localhost:8000/user/${props.props.row._id}`, {
        type: type,
      });
      //   console.log("JUST CHECKING", props.props);
      setUTR(true);
      setOpen(false);
      alert("Status updated successfully");
    }
  };

  useEffect(() => {
    users();
  }, []);

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>
        {props && props.props.row.type ? props.props.row.type : "assign"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update type</DialogContentText>
          <Select
            value={type}
            onChange={handleTypeChange}
            label="Type"
            fullWidth
            variant="standard"
            required
          >
            <MenuItem value="A">Admin</MenuItem>
            <MenuItem value="S">Staff</MenuItem>
            <MenuItem value="F">Family</MenuItem>
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
