import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function FeedbackData() {
  const [data, setData] = useState();

  const getData = async () => {
    let feedbackData = await axios.get("http://localhost:8000/feedback");
    setData(feedbackData.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell>Feeback</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((feedback, index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{feedback.feedbackMsg}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
