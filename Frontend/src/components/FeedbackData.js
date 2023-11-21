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
    // let feedbackData = await axios.get("http://localhost:8000/feedback");
    // setData(feedbackData.data);
    try {
      let feedbackData = await axios.get("http://localhost:8000/feedback");
      // console.log("feedData", feedbackData);
      setData(feedbackData.data);
    } catch (error) {
      console.error("Error fetching feedback data:", error.message);
    }
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
              <TableCell>Feeback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((feedback, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{feedback.feedbackMsg}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <div>No feedback data available</div>
      )}
    </React.Fragment>
  );
}
