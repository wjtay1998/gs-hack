import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { padding } from "@mui/system";
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, kerberos) {
  return { id, date, name, shipTo, paymentMethod, kerberos };
}

const rows = [
  createData(
    0,
    "Elvis Presley",
    "Summer Analyst",
    "Engineering",
    "Wavefront Engineering",
    "presle"
  ),
  createData(
    1,
    "Paul McCartney",
    "Analyst",
    "Engineering",
    "Wavefront Engineering",
    "mccartp"
  ),
  createData(
    2,
    "Tom Schoddddlz",
    "Associate",
    "Engineering",
    "Wavefront Engineering",
    "schoddt"
  ),
  createData(
    3,
    "Michael Jackson",
    "Vice President",
    "Engineering",
    "Wavefront Engineering",
    "jacksonm"
  ),
  createData(
    4,
    "Bruce Springsteen",
    "Managing Director",
    "Engineering",
    "Wavefront Engineering",
    "springsb"
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Enrolled Employees</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Division</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Kerberos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <a href="https://app.gsweb.site.gs.com/directory/">
                  <u>{row.date}</u>
                </a>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.kerberos}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        href="#"
        onClick={preventDefault}
        // sx={{ mt: 3 }}
        startIcon={<AddIcon />}
      >
        Enrol New Employee
      </Button>
    </React.Fragment>
  );
}
