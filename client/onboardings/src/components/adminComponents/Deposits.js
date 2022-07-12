import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Next Expected Batch</Title>
      <Typography component="p" variant="h4">
        154
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Incoming NAPAs <br /> on 25th July, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all details
        </Link>
      </div>
    </React.Fragment>
  );
}
