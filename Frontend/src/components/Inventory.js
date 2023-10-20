import React, { useEffect, useState } from "react";
import axios from "axios";
import MedCard from "./MedCard";
import { Grid } from "@mui/material";
import "../App.css";

export default function Inventory() {
  const [data, setData] = useState(0);
  const [nullmed, setNullmed] = useState(false);
  const getdata = async () => {
    setNullmed(false);
    let inv = await axios.get("http://localhost:8000/inventory");
    console.log(inv.data);
    if (inv.data.message == "No Medicines") setNullmed(true);
    else setData(inv.data);
    return inv;
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="Invetory-Cards">
      {data &&
        data.map((e) => {
          console.log(e);
          return <MedCard props={e} className="centerd-list"></MedCard>;
        })}
    </div>
  );
}