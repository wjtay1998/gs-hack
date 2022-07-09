import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "../userComponents/drawer";
import { useParams } from "react-router-dom";
import { createTask, getOneTask } from "../../api/index.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme({
  typography: {
      fontFamily: "Goldman Sans"
  }
});

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const toggleDrawer = () => {
    setOpen(!open);
  };

  let { id } = useParams();

  React.useEffect( () => {
    getOneTask(id).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar style={{backgroundColor:"#3E5463"}} position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              marginLeft = "20px"
              fontWeight = "medium"
              fontSize = "25px"
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              onboardinGS
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            marginTop: "30px",
          }}
        >
          <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
            <article className="space-y-8 bg-gray-100 text-gray-900">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
                  {data["title"]}
                </h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-600">
                  <div className="flex items-center md:space-x-2">
                    <img
                      src="https://source.unsplash.com/75x75/?portrait"
                      alt=""
                      className="w-4 h-4 border rounded-full bg-gray-500 border-gray-300"
                    />
                    <p className="text-sm">
                      {data["updated_by"]} • {data["updated_date"]}
                    </p>
                  </div>
                  <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                    {data["estimated_comp_mins"]} min task
                  </p>
                </div>
              </div>
              <div className="text-gray-800">
                <p>{data["desc"]}</p>
              </div>
            </article>
            <div>
              <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed border-gray-600">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="px-3 py-1 rounded-sm hover:underline bg-violet-600 text-gray-50"
                >
                  {data["tag"]}
                </a>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Task Description</h4>
                <div
                  dangerouslySetInnerHTML={{ __html: data["post_content"] }}
                />
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function TaskPage() {
  return <DashboardContent />;
}
