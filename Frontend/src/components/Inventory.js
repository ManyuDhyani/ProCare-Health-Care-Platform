import React, { useEffect, useState } from "react";
import axios from "axios";
import MedCard from "./MedCard";
import { Grid } from "@mui/material";
import "../App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Inventory(props) {
  const [data, setData] = useState(0);
  const [nullmed, setNullmed] = useState(false);
  console.log(props.props.user_type);
  const getdata = async () => {
    setNullmed(false);
    let inv = await axios.get("http://localhost:8000/inventory");
    // console.log(inv.data);
    if (props.props.user_type !== "A") inv.data = inv.data.slice(0, 5);
    if (inv.data.message == "No Medicines") setNullmed(true);
    else setData(inv.data);
    return inv;
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
  
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>mg</TableCell>
            <TableCell>exp_date</TableCell>
            <TableCell>Current stock</TableCell>
            <TableCell>remark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.mg}</TableCell>
                <TableCell>{row.exp_date}</TableCell>
                <TableCell>{row.current_stock}</TableCell>
                <TableCell>{row.remark}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}