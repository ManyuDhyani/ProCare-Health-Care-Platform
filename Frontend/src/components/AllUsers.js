import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import styles from "../css/Addmedicine.module.css";
import UpdateStatus from "./UpdateStatus";
import UpdateStaff from "./UpdateStaff";
import CustomMessage from "./CustomMessage";
import UpdateFamily from "./UpdateFamily";
import UpdateType from "./UpdateType";

export default function AllUsers(props) {
  const [rows, setRows] = useState([]); // Use state to store the patient data
  const [utr, setUTR] = useState(false);
  // Function to fetch patient data and set it in the state
  const getUserdata = async () => {
    try {
      setUTR(false);
      let user = props.userObj;
      const response = await axios.get("http://localhost:8000/user");
      const users = response.data;
      // console.log("Printing patients");
      //   console.log("AllUSERS", users);
      // console.log("Id to be checked");
      // console.log(user.userID);
      // console.log("Type of the user");
      // console.log(user.type);
      setRows(users);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    getUserdata(); // Fetch users data when the component mounts
  }, [utr]);

  return (
    <React.Fragment>
      {rows && rows.length !== 0 ? (
        <div className={styles.patient}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>
                    {/* {row.type} */}
                    <UpdateType props={{ row, utr, setUTR }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className={styles.patient}>No user data available</div>
      )}
    </React.Fragment>
  );
}
