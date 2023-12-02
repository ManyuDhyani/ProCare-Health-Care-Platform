import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function InquiryData(props) {
  const [data, setData] = useState();

  let user = props.userObj;
  //   console.log("USER123", user);
  const getData = async () => {
    let inquiryData = await axios.get("http://localhost:8000/inquiry");
    let patientData = await axios.get("http://localhost:8000/patient/");
    // console.log("pati data", patientData.data);
    // console.log("INQ DATA", inquiryData.data);
    // let FilteredData = patientData.data.filter((item) =>
    //   item.newObj.StaffMembers.includes(user.userID)
    // );
    let FilteredData = patientData.data.filter((item) => {
      // Check if item.newObj is defined before accessing StaffMembers
      if (item && item.StaffMembers) {
        return item.StaffMembers.includes(user.userID);
      }
      // If item.newObj or item.newObj.StaffMembers is undefined, skip the check
      return false;
    });
    // console.log("FILT", FilteredData);
    let temp = [];

    for (let i = 0; i < inquiryData.data.length; i++) {
      for (let j = 0; j < FilteredData.length; j++) {
        if (inquiryData.data[i].patiendId == FilteredData[j]._id) {
          temp.push(inquiryData.data[i]);
        }
      }
    }
    // console.log("DAATAA", temp);
    setData(temp);
    // console.log("DAATAA111", data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      {data && data.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Serial No.</TableCell>
              <TableCell>Inquiry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((inquiry, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{inquiry.inquiryMessage}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div> No Inquiry data</div>
      )}
    </React.Fragment>
  );
}
