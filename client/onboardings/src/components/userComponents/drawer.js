import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/user">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Task Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/createTask">
      <ListItemIcon>
        <AddCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Create Task" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewModule">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Modules" />
    </ListItemButton>
  </React.Fragment>
);
