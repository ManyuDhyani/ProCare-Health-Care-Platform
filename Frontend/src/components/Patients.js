import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

export default function Patients() {
  const [rows, setRows] = React.useState([]); // Use state to store the patient data

  // Function to fetch patient data and set it in the state
  const getPatientdata = async () => {
    try {
      const response = await axios.get("http://localhost:8000/patient/");
      const patients = response.data;
      console.log(patients);
      setRows(patients);
      console.log("rows", rows);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  React.useEffect(() => {
    getPatientdata(); // Fetch patient data when the component mounts
  }, []);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}