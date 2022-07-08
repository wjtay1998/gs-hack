import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
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
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "../userComponents/drawer";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTask } from "../../api/index.js";
import { RichTextEditor } from "@mantine/rte";

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
    fontFamily: "Roboto",
  },
});

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [title, setTitle] = React.useState();
  const [tag, setTag] = React.useState();
  const [desc, setDesc] = React.useState();
  const [video, setVideo] = React.useState();
  const [convertedDetails, setConvertedDetails] = React.useState();
  const [isRequired, setIsRequired] = React.useState();
  const [estCompletion, setEstCompletion] = React.useState();
  const [editor, onEditorChange] = React.useState(
    "<p>Your initial <b>html value</b> or any fancy details</p>"
  );

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTagChange = (e) => setTag(e.target.value);
  const onDescChange = (e) => setDesc(e.target.value);
  const onVideoChange = (e) => setVideo(e.target.value);
  const onConvertedDetailsChange = (e) => setConvertedDetails(e.target.value);
  const onIsRequiredChange = (e) => {
    setIsRequired(e.target.checked);
    console.log(e.target.checked);
  };
  const onEstCompletion = (e) => setEstCompletion(e.target.value);

  const onSubmitForm = (e) => {
    e.preventDefault();
    var payload = {};
    payload["title"] = title;
    payload["tag"] = tag;
    payload["desc"] = desc;
    payload["video_link"] = video;
    payload["post_content"] = editor;
    payload["if_required"] = isRequired;
    payload["estimated_comp_mins"] = estCompletion;
    let today = new Date().toISOString().slice(0, 10);
    payload["created_date"] = today;
    payload["updated_date"] = today;
    payload["created_by"] = "user123456";
    payload["updated_by"] = "user123456";

    console.log(payload);
    createTask(payload);
    console.log("finish");
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
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
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
            {secondaryListItems}
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
          <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
            <Paper
              justifyContent="center"
              variant="outlined"
              sx={{
                my: { xs: 1, md: 6 },
                p: { xs: 2, md: 3 },
                borderRadius: "15px",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
            >
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Create Task
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Title"
                      name="Title"
                      label="Title"
                      fullWidth
                      autoComplete="Task Title"
                      variant="standard"
                      value={title}
                      onChange={onTitleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="Tag"
                      name="Tag"
                      label="Tag"
                      fullWidth
                      autoComplete="java"
                      variant="standard"
                      value={tag}
                      onChange={onTagChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="EstCompletion"
                      name="EstCompletion"
                      label="Estimated Completion (mins)"
                      fullWidth
                      autoComplete="60"
                      variant="standard"
                      value={estCompletion}
                      onChange={onEstCompletion}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Description"
                      name="Description"
                      label="Description"
                      fullWidth
                      autoComplete="description"
                      variant="standard"
                      value={desc}
                      onChange={onDescChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      id="Video"
                      name="Video"
                      label="Video URL"
                      fullWidth
                      autoComplete="video-url"
                      variant="standard"
                      value={video}
                      onChange={onVideoChange}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                  <TextField
                    required
                    id="Details"
                    name="Details"
                    label="Details"
                    fullWidth
                    autoComplete="details"
                    variant="standard"
                    value={convertedDetails}
                    onChange={onConvertedDetailsChange}
                  />
                </Grid> */}

                  <Grid item xs={12}>
                    <Typography variant="p" gutterBottom>
                      Task Details
                    </Typography>
                    <RichTextEditor value={editor} onChange={onEditorChange} />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={onIsRequiredChange}
                          defaultChecked
                        />
                      }
                      label="Required"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" onClick={onSubmitForm}>
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function AdminCreateTask() {
  return <DashboardContent />;
}
