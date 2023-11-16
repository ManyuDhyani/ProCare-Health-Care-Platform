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
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import "../App.css";

export default function UpdateMedicine(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(props.props._id);
  const handlesubmit = () => {
    const current_stock = document.getElementById("current_stock").value;

    if (!current_stock) {
      alert("Please fill the all the fields");
    } else {
      axios.post("http://localhost:8000/update", {
        current_stock,
        threshold: props.props.threshold,
        _id: props.props._id,
      });
      setOpen(false);
      alert("Stock updated successfully");
    }
  };

  return (
    <div className={styles.Addmedicine}>
      <Button onClick={handleClickOpen}>{props.props.current_stock}</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update stock</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="current_stock"
            label="Current Stock"
            type="number"
            fullWidth
            variant="standard"
            required
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
