import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LayersIcon from "@mui/icons-material/Layers";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/user">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Task Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/viewModule">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Modules" />
    </ListItemButton>
  </React.Fragment>
);
