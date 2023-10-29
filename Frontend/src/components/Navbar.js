import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Navbar() {
  const location = useLocation();
  const name = location.state && location.state.user.email;
  let uname = name && name.split("@")[0];
  const inventory_flag = location.state && location.state.user.type;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div">
          Hello {uname}
        </Typography>
        <div style={{ flexGrow: 1 }}></div>
        {inventory_flag === "staff" && (
          <Link href="/inventory" color="inherit">
            Inventory
          </Link>
        )}
        {uname !== null && (
          <Button href="/" color="inherit">
            LOGOUT
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
