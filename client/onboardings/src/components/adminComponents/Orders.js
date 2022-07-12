import * as React from "react";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Generate Order Data
function createData(id, name, title, division, department, kerberos) {
  return { id, name, title, division, department, kerberos };
}

const rows = [
  createData(
    0,
    "Elvis Presley",
    "Summer Analyst",
    "Engineering",
    "Distributed Scheduling",
    "presle"
  ),
  createData(
    1,
    "Paul McCartney",
    "Analyst",
    "Engineering",
    "Distributed Scheduling",
    "mccartp"
  ),
  createData(
    2,
    "Tom Schoddddlz",
    "Associate",
    "Engineering",
    "Distributed Scheduling",
    "schoddt"
  ),
  createData(
    3,
    "Michael Jackson",
    "Vice President",
    "Engineering",
    "Distributed Scheduling",
    "jacksonm"
  ),
  createData(
    4,
    "Bruce Springsteen",
    "Managing Director",
    "Engineering",
    "Distributed Scheduling",
    "springsb"
  ),
];

export default function Orders() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("Benjamin Tan");
  const [kerberos, setKerberos] = React.useState("tabenj");
  const [title, setTitle] = React.useState("Managing Director");
  const [department, setDepartment] = React.useState("Distributed Scheduling");
  const [division, setDivision] = React.useState("Engineering");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddEmployee = () => {
    setOpen(false);
    rows.push(createData(5, name, title, division, department, kerberos));
  };

  return (
    <React.Fragment>
      <Title>Enrolled Employees</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Kerberos</b>
            </TableCell>
            <TableCell>
              <b>Title</b>
            </TableCell>
            <TableCell>
              <b>Department</b>
            </TableCell>
            <TableCell>
              <b>Division</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <a
                  href={`https://app.gsweb.site.gs.com/directory/${row.kerberos}`}
                >
                  <u>{row.name}</u>
                </a>
              </TableCell>
              <TableCell>{row.kerberos}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.division}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        href="#"
        onClick={handleOpen}
        // sx={{ mt: 3 }}
        startIcon={<AddIcon />}
      >
        Enrol New Employee
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enrol New Employee</DialogTitle>
        <DialogContent>
          <DialogContentText width={"500px"}>
            Please fill in the employee details here as per GSWeb. In the future
            there will be functionality to fetch the employee details using
            their kerberos.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            // fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="kerberos"
            label="Kerberos"
            // fullWidth
            variant="standard"
            defaultValue="tabenj"
            value={kerberos}
            onChange={(e) => setKerberos(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            // fullWidth
            variant="standard"
            defaultValue="Managing Director"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Department"
            // fullWidth
            variant="standard"
            defaultValue="Distributed Scheduling"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="division"
            label="Division"
            // fullWidth
            variant="standard"
            defaultValue="Engineering"
            value={division}
            onChange={(e) => setDivision(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEmployee}>Enrol Employee</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
