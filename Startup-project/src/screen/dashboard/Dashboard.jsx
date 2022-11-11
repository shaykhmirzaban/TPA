import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { user_is_signin } from "../../config/FirebaseMethods";
import { Outlet, useNavigate } from "react-router-dom";

// style
import "../../style/dashboard.scss";

const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let [flag, setFlag] = React.useState();
  let navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    user_is_signin()
      .then((_) => {
        if (_.email === "admin@admin.com") {
          setFlag(true);
        }
      })
      .catch((_) => console.log(_));
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {flag ? "Welcome to Admin Panel" : "Welcome to User Profile"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {[
            {
              name: "Home",
              icons: "fa-solid fa-house-chimney",
              routeName: "/",
            },
            {
              name: "Dashboard",
              icons: "fa-solid fa-house-chimney",
              routeName: "/dashboard",
            },
          ].map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => navigate(text.routeName)}>
                <ListItemIcon>
                  {text.icons && <i className={text.icons}></i>}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {flag
            ? [
                {
                  name: "Create Quiz",
                  routeName: "create-quiz",
                  icons: "fa-solid fa-clipboard",
                },
                {
                  name: "Create Course",
                  routeName: "create-course",
                  icons: "fa-solid fa-book",
                },
                {
                  name: "Create Result",
                  routeName: "create-result",
                  icons: "fa-solid fa-square-poll-vertical",
                },
                {
                  name: "Add Countries",
                  routeName: "add-countries",
                  icons: "fa-solid fa-earth-americas",
                },
                {
                  name: "Add Cities",
                  routeName: "add-cities",
                  icons: "fa-solid fa-city",
                },
                {
                  name: "course and sec control",
                  routeName: "student-registration-form-course-and-sec-control",
                  icons: "fa-solid fa-gamepad",
                },
              ].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => navigate(text.routeName)}>
                    <ListItemIcon>
                      {text.icons && <i className={text.icons}></i>}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))
            : null}
        </List>

        <Divider />
        <List>
          {flag
            ? [
                {
                  name: "Course List",
                  routeName: "course-list",
                  icons: "fa-solid fa-list-ul",
                },
                {
                  name: "Student Registration List",
                  routeName: "student-registration-list",
                  icons: "fa-solid fa-list-ul",
                },
                {
                  name: "Trainer Registration List",
                  routeName: "trainer-registration-list",
                  icons: "fa-solid fa-list-ul",
                },

                {
                  name: "Show Result",
                  routeName: "show-result",
                  icons: "fa-solid fa-square-poll-horizontal",
                },
                {
                  name: "enrolled student",
                  routeName: "enrolled-student",
                  icons: "fa-solid fa-user",
                },
                {
                  name: "Branch",
                  routeName: "branch",
                  icons: "fa-solid fa-code-branch",
                },
              ].map((text, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton onClick={() => navigate(text.routeName)}>
                    <ListItemIcon>
                      {text.icons && <i className={text.icons}></i>}
                    </ListItemIcon>
                    <ListItemText primary={text.name} />
                  </ListItemButton>
                </ListItem>
              ))
            : ["Detail", "Quiz Result"].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
        </List>
      </Drawer>

      <Box sx={{ padding: "5rem 0 0 2rem" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
