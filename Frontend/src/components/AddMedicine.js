import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function AddMedicine() {
  const [open, setOpen] = useState(false);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentmonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const maxDate = `${currentYear}-${currentmonth}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlesubmit = () => {
    const name = document.getElementById("name").value;
    const mg = document.getElementById("mg").value;
    const exp_date = document.getElementById("exp_date").value;
    const current_stock = document.getElementById("current_stock").value;
    const threshold = document.getElementById("threshold").value;
    const remark = document.getElementById("remark").value;
    const monthInput = document.getElementById("exp_date").value;
    const selectedMonth = monthInput;
    const [year, month] = selectedMonth.split("-");
    const formattedMonth = `${month}/${year}`;

    if (
      !name ||
      !mg ||
      !exp_date ||
      !current_stock ||
      !threshold ||
      !remark ||
      !monthInput ||
      !formattedMonth
    ) {
      alert("Please fill the all the fields");
    } else {
      axios.post("http://localhost:8000/inventory", {
        name,
        mg,
        exp_date,
        current_stock,
        threshold,
        remark,
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add medicine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Medicine</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter Medicine details</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="Name"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="mg"
            label="Strength (mg)"
            type="text"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="exp_date"
            label="Expiry Date MM/YYYY"
            type="month"
            fullWidth
            variant="standard"
            inputProps={{ max: maxDate }}
            required
          />
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
          <TextField
            autoFocus
            margin="dense"
            id="threshold"
            label="Threshold"
            type="number"
            fullWidth
            variant="standard"
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="remark"
            label="Remark"
            type="text"
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
