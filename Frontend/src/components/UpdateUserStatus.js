import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
export default function UpdateUserStatus() {
  const [patientData, setPatientData] = useState([]);
  const [userData, setUserData] = useState([]);
  //   const [staffData, setStaffData] = useState([]);
  //   const [familyData, setFamilyData] = useState([]);

  const getData = async () => {
    let pData = await axios.get("http://localhost:8000/patient/");
    let uData = await axios.get("http://localhost:8000/user");
    setPatientData(pData.data);
    setUserData(uData.data);
    console.log("pData", patientData);
    console.log("uData", userData);
  };
  useEffect(() => {
    getData();
  }, []);

  return <div></div>;
}
