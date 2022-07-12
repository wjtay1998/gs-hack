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
import VideoInput from "./CreateTask/VideoInput";

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
    fontFamily: "Goldman Sans",
  },
});

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logo =
    "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";

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
        <AppBar
          style={{ backgroundColor: "#3E5463" }}
          position="absolute"
          open={open}
        >
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
            <img
              width="43"
              height="43"
              src={`data:image/jpeg;base64,${logo}`}
            ></img>
            <Typography
              marginLeft="20px"
              fontWeight="medium"
              fontSize="25px"
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Onboardin-GS
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

                  {/* <Grid item xs={12}>
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
                  </Grid> */}
                  <Grid item xs={12}>
                  <VideoInput padding="100px" width={250} height={200} />
                  </Grid>
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
                    <Button
                      style={{ backgroundColor: "#3E5463" }}
                      variant="contained"
                      onClick={onSubmitForm}
                    >
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
