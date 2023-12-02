import { Button } from "@mui/material";
import React from "react";
import axios from "axios";

export default function DeleteMedicine(props) {
  // console.log(props.props);
  const { row, ud, setUd } = props.props;
  const handleDelete = () => {
    axios.delete("http://localhost:8000/inventory", {
      data: { id: props.props.row._id },
    });
    setUd(true);
  };
  return (
    <div>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
