import React, { Component, useContext, useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  InputLabel,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

// import { AuthContext } from "../UserContext";
// import { authO, provider, provider1 } from "../GoogleSignIn/congif";
// import { signInWithPopup } from "firebase/auth";
import google from "../Images/google.svg";
import { style } from "@mui/system";

const Registration = () => {
  const navigate = useNavigate();
  const theme = createTheme({ palette: { mode: "light" } });
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidator, setpasswordValidator] = useState("");
  const [passwordMatch, setpasswordMatch] = useState(false);
  const [passlenerror, setPasslenerror] = useState(false);
  const [phoneerror, setPhoneerror] = useState(false);
  const [emailValidator, setEmailValidator] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setpasswordMatch(false);
      setPasslenerror(false);
      setPhoneerror(false);
      setEmailValidator(false);
      setEmailExists(false);
      setRedirect(false);

      console.log(email, password, passwordValidator);

      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      if (emailRegex.test(email) === false) {
        setEmailValidator(true);
      } else if (password.length < 6) {
        setPasslenerror(true);
      }
      // password.length < 6 ? setPasslenerror(false) : setPasslenerror(true);
      else if (password !== passwordValidator) {
        setpasswordMatch(true);
        console.log("password does not match");
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        setPhoneerror(true);
      } else {
        // All validations passed
        const response = await axios.post("http://localhost:8000/register", {
          email,
          password,
          phoneNumber,
        });
        // console.log(response.data.message);
        if (response.data.message === "Registered") setRedirect(true);
        else if (response.data.message === "email already exists")
          setEmailExists(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect]);

  const paperStyle = {
    padding: "30px 20px",
    margin: "20px 20px",
    width: "350",
  };

  //   const themeStyle = {
  //     padding: "30px 20px",
  //     width: "350",
  //     margin: "20px auto",
  //   };

  return (
    <Paper elevation={20} style={paperStyle}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="login">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className="Label">
              Register
            </Typography>
            {/* {session_expired && session_expired
            ? "Your session was expired"
            : null} */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* {"10 digits"} */}
              <InputLabel sx={{ color: "black" }} htmlFor="email">
                Email{" "}
                {emailExists && emailExists
                  ? "(this emails is alredy registered)"
                  : null}
                {emailValidator && emailValidator ? "(Email required)" : null}
              </InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: {},
                  //   disableUnderline: true,
                }}
                InputLabelProps={{
                  style: { color: "red" },
                }}
              />
              <InputLabel sx={{ color: "black" }} htmlFor="phoneNumber">
                Phone Number{" "}
                {phoneerror && phoneerror ? "(10 digits required)" : null}
              </InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                value={phoneNumber}
                name="phoneNumber"
                autoComplete="tel"
                onChange={(e) => setPhoneNumber(e.target.value)}
                InputProps={{
                  style: {},
                  //   disableUnderline: true,
                }}
                InputLabelProps={{
                  style: { color: "red" },
                }}
              />
              {/* {invalidEmail && invalidEmail ? "Invalid EmailID" : null} */}
              <InputLabel sx={{ color: "black" }} htmlFor="password">
                Password{" "}
                {passlenerror && passlenerror
                  ? "(password should be more than 5 characters)"
                  : null}
              </InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={password}
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <InputLabel sx={{ color: "black" }} htmlFor="password">
                Re-enter Password
              </InputLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={passwordValidator}
                type="password"
                id="password"
                onChange={(e) => setpasswordValidator(e.target.value)}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              {passwordMatch && passwordMatch
                ? "passwords does not match"
                : null}
              {/* {auth && auth ? "wrong email or password" : null} */}
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                color="inherit"
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs={6}>
                  <Link href="/" variant="body2" className="Link">
                    Sign in?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Paper>
  );
};

export default Registration;
