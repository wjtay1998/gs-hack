import AddTaskIcon from "@mui/icons-material/AddTask";
import { IconButton, MenuItem, Select } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import * as api from "../../api/index.js";
import Title from "./Title";

import Button from "@mui/material/Button";
export default function ModuleTaskList() {
  const [open, setOpen] = React.useState(false);
  const [taskList, setTaskList] = React.useState([]);
  const [taskDropdown, setTaskDropdown] = React.useState([]);
  const [taskDisplay, setTaskDisplay] = React.useState([]);
  const [myselect, setSelect] = React.useState("");

  const handleClose = () => {
    setSelect("");
    setOpen(false);
  };

  React.useEffect(() => {
    api.getTasks().then((x) => {
      const lst = x.data.filter((y) => {
        return "title" in y;
      });
      setTaskList(lst.sort((a, b) => a.title.localeCompare(b.title)));
      const tempArr = [];
      lst.forEach((element) => {
        tempArr.push(element.title);
        // setTaskDropdown([...taskDropdown, element.title]);
      });
      setTaskDropdown(tempArr);
    });
  }, [taskDisplay]);
  const handleClick = () => {
    if (myselect !== "") {
      const arr = [...taskDisplay];
      taskList.forEach((x) => {
        if (x.title === myselect) {
          arr.push(x);
        }
      });
      setTaskDisplay(arr);
      setOpen(true);
    }
  };
  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <React.Fragment>
      <Title>Selected Tasks</Title>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Select
          id="combo-box-demo"
          sx={{ width: 1000 }}
          value={myselect}
          onChange={handleSelect}
        >
          {taskDropdown.map((taskD, idx) => (
            <MenuItem value={taskD} key={idx}>
              {taskD}
            </MenuItem>
          ))}
        </Select>
        <IconButton size="large" color="success" onClick={handleClick}>
          <AddTaskIcon />
        </IconButton>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Task Name</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell
              style={{
                width: "150px",
              }}
            >
              <b>Date Created</b>
            </TableCell>
            <TableCell>
              <b>Estimated Time (mins)</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {taskDisplay.map((task, idx) => (
            <TableRow key={idx}>
              <TableCell
                style={{
                  // width: "50px",
                  overflow: "hidden",
                  textOverflow: "ellpisis",
                }}
              >
                <a href={`/taskdetails/${task.ID}`}>
                  <u>{task.title}</u>
                </a>
              </TableCell>
              <TableCell>{task.desc}</TableCell>
              <TableCell>{task.created_date}</TableCell>
              <TableCell>{task.estimated_comp_mins}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Task Added"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {myselect} has been added to the list of tasks for this module.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
