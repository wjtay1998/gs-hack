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
import * as api from "../../api/index.js";
// Generate Order Data
function createData(id, name, title, division, department, kerberos) {
  return { id, name, title, division, department, kerberos };
}

export default function AllModules() {
  const [open, setOpen] = React.useState(false);
  const [moduleList, setModuleList] = React.useState([]);
  const [moduleTitle, setModuleTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAddModule = () => {
    setOpen(false);
    api.createModule({
      title: moduleTitle,
      desc: description,
      tasklist: [],
      assignee: [],
      sugg_schedule: [],
    });
  };

  React.useEffect(() => {
    api
      .getAllModules()
      .then((x) =>
        setModuleList(
          x.data.sort((a, b) => a.moduleTitle.localeCompare(b.moduleTitle))
        )
      );
  }, [moduleList]);

  return (
    <React.Fragment>
      <Title>All Modules</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 200 }}>
              <b>Module Title</b>
            </TableCell>
            <TableCell style={{ width: 800 }}>
              <b>Description</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {moduleList.map((row) => (
            <TableRow key={row.ID}>
              <TableCell>
                <a href="https://app.gsweb.site.gs.com/directory/">
                  <u>{row.title}</u>
                </a>
              </TableCell>
              <TableCell>{row.desc}</TableCell>
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
        Create a new module
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Module</DialogTitle>
        <DialogContent>
          <DialogContentText width={"500px"}>
            Fill in the details below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="moduletitle"
            label="Module Title"
            fullWidth
            variant="standard"
            placeholder="e.g. JSI SDLC Onboarding"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="kerberos"
            label="Description"
            fullWidth
            variant="standard"
            defaultValue="tabenj"
            placeholder="e.g. Introduction to JSI: How to use JSIView, creating modules and deploying changes."
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddModule}>Add Module</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
