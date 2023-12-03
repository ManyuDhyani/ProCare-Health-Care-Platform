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

export default function Patients(props) {
  const [rows, setRows] = useState([]); // Use state to store the patient data
  const [usr, setUSR] = useState(false);
  const [ufr, setUFR] = useState(false);
  const [ustatusr, setUstatusR] = useState(false);
  // Function to fetch patient data and set it in the state
  const getPatientdata = async () => {
    try {
      setUSR(false);
      setUFR(false);
      setUstatusR(false);
      let user = props.userObj;
      const response = await axios.get("http://localhost:8000/patient/");
      const patients = response.data;
      // console.log("Printing patients");
      // console.log(patients);
      // console.log("Id to be checked");
      // console.log(user.userID);
      // console.log("Type of the user");
      // console.log(user.type);

      //Check the type of the User
      let FilteredData;
      if (user.type === "F") {
        FilteredData = patients.filter((item) =>
          item.familyMembers.includes(user.userID)
        );
      } else if (user.type === "S") {
        FilteredData = patients.filter((item) =>
          item.StaffMembers.includes(user.userID)
        );
      } else if (user.type === "A") {
        FilteredData = patients;
      }

      // console.log("Printing Filtered Data");
      // console.log(FilteredData);
      // console.log(Array.isArray(FilteredData));
      // console.log(patients);
      setRows(FilteredData);
      // console.log("FData", FilteredData);
      // console.log("rowsData", rows);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    getPatientdata(); // Fetch patient data when the component mounts
    console.log("USE EFFECT", usr);
  }, [usr, ufr, ustatusr]);

  return (
    <React.Fragment>
      {rows && rows.length !== 0 ? (
        <div className={styles.patient}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Medications</TableCell>
                {(props.userObj && props.userObj.type == "A") ||
                props.userObj.type == "F" ? (
                  <TableCell>Staff ID</TableCell>
                ) : (
                  <TableCell>My ID</TableCell>
                )}
                <TableCell>Status</TableCell>
                {props.userObj.type === "S" && <TableCell>Message</TableCell>}
                {props.userObj && props.userObj.type == "A" ? (
                  <TableCell>Family ID</TableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.diagnosis}</TableCell>
                  <TableCell>{row.medication}</TableCell>
                  {props.userObj.type === "A" ? (
                    // Render status directly for user type "F"
                    // Render UpdateStatus component for user types "S" and "A"
                    <TableCell>
                      <UpdateStaff props={{ row, usr, setUSR }}></UpdateStaff>
                    </TableCell>
                  ) : (
                    <TableCell>{row.StaffMembers[0]}</TableCell>
                  )}

                  {props.userObj.type === "F" ? (
                    // Render status directly for user type "F"
                    <TableCell>{row.status}</TableCell>
                  ) : (
                    // Render UpdateStatus component for user types "S" and "A"
                    <TableCell>
                      <UpdateStatus
                        props={{ row, ustatusr, setUstatusR }}
                      ></UpdateStatus>
                    </TableCell>
                  )}
                  {props.userObj.type === "S" && (
                    <TableCell>
                      <CustomMessage props={row}></CustomMessage>
                    </TableCell>
                  )}
                  {props.userObj.type === "A" ? (
                    // Render status directly for user type "F"
                    <React.Fragment>
                      <UpdateFamily props={{ row, ufr, setUFR }}></UpdateFamily>
                    </React.Fragment>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className={styles.patient}>No patient data available</div>
      )}
    </React.Fragment>
  );
}
