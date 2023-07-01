import { Grid } from "@mui/material";
import "./JobBox.css";

import React from "react";

interface JobBoxProps {
  BoxIcon: React.ElementType;
  title: string;
  children?: React.ReactNode;
}

const JobBox = ({ BoxIcon, title, children }: JobBoxProps) => {
  return (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={2}>
        <BoxIcon />
      </Grid>
      <Grid item xs={10}>
        <div className="box-content">
          <b>{title}</b>
          {children}
        </div>
      </Grid>
    </Grid>
  );
};

export default JobBox;
