import { Button } from "@mui/material";
import React from "react";
import axios from "axios";

export default function DeleteMedicine(props) {
  console.log(props.props);
  const handleDelete = () => {
    axios.delete("http://localhost:8000/inventory", {
      data: { id: props.props },
    });
  };
  return (
    <div>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
