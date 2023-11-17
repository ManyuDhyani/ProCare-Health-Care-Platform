import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useLocation } from "react-router-dom";
import Inventory from "./Inventory";
import Patients from "./Patients";
import Feedback from "./Feedback";
import FeedbackData from "./FeedbackData";
import Inquiry from "./Inquiry";
import InquiryData from "./InquiryData";
const defaultTheme = createTheme();

function preventDefault(event) {
  event.preventDefault();
}

export default function Dashboard() {
  const location = useLocation();
  let user = location.state && location.state.user;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <h1>{user.type == "A" && "All "}Patients</h1>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    overflow: "auto",
                  }}
                >
                  <Patients userObj={user} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              {user.type == "F" && (
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                      overflow: "auto",
                    }}
                  >
                    {/* <Inventory /> */}
                    <Feedback UID={user.userID} />
                  </Paper>
                </Grid>
              )}

              {/* Recent Orders */}
              {(user.type == "S" || user.type == "A") && (
                <Grid item xs={12}>
                  <h1>{user.type == "A" && "All "}Inventory</h1>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 230,
                      overflow: "auto",
                    }}
                  >
                    <Inventory props={{ user_type: user.type }} />
                    {/* {user.type == "S" ||
                        (user.type == "A" && (
                          <Link href="/inventory">Go to Inventory</Link>
                        ))} */}
                  </Paper>
                </Grid>
              )}
              {user.type == "A" && (
                <Grid item xs={12}>
                  <h1>{user.type == "A" && "All "}Feedback</h1>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 230,
                      overflow: "auto",
                    }}
                  >
                    <FeedbackData></FeedbackData>
                  </Paper>
                </Grid>
              )}
              {user.type == "F" && (
                <Grid item xs={12}>
                  <h1>Inquiry</h1>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 230,
                      width: 300,
                      overflow: "auto",
                    }}
                  >
                    <Inquiry userObj={user}></Inquiry>
                  </Paper>
                </Grid>
              )}
              {user.type == "S" && (
                <Grid item xs={12}>
                  <h1>Inquiry</h1>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 230,
                      overflow: "auto",
                    }}
                  >
                    <InquiryData userObj={user}></InquiryData>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
