import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import styles from "../css/Addmedicine.module.css";

export default function Patients(props) {
  const [rows, setRows] = React.useState([]); // Use state to store the patient data

  // Function to fetch patient data and set it in the state
  const getPatientdata = async () => {
    try {
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
          item.newObj.familyMembers.includes(user.userID)
        );
      } else if (user.type === "S") {
        FilteredData = patients.filter((item) =>
          item.newObj.StaffMembers.includes(user.userID)
        );
      } else if (user.type === "A") {
        FilteredData = patients;
      }

      // console.log("Printing Filtered Data");
      // console.log(FilteredData);
      // console.log(patients);
      setRows(FilteredData);
      // console.log("rowsData", rows);
      // console.log("rows", rows);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  React.useEffect(() => {
    getPatientdata(); // Fetch patient data when the component mounts
  }, []);

  return (
    <React.Fragment>
      {rows && rows.length == 0 ? (
        <div className={styles.patient}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Diagnosis</TableCell>
                <TableCell>Medications</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.newObj.name}</TableCell>
                  <TableCell>{row.newObj.diagnosis}</TableCell>
                  <TableCell>{row.newObj.medication}</TableCell>
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
