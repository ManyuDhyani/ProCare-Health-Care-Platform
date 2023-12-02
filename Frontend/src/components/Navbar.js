import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import AddMedicine from "./AddMedicine";
import Addpatient from "./Addpatient";
import UpdateProfile from "./UpdateProfile";

export default function Navbar() {
  const location = useLocation();
  const name = location.state && location.state.user.email;
  let uname = name && name.split("@")[0];
  const inventory_flag = location.state && location.state.user.type;

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          Hello {uname}
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        {(inventory_flag === "S" || inventory_flag === "F") && (
          <UpdateProfile props={location.state.user} />
        )}
        {(inventory_flag === "S" || inventory_flag === "A") && <AddMedicine />}
        {inventory_flag === "A" && <Addpatient />}
        {uname !== null && (
          <Button href="/" color="inherit" onClick={handleLogout}>
            LOGOUT
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
