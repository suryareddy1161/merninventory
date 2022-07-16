import * as React from "react";
import AdminHome from "./AdminHome"
import AdminHistory from "./AdminHistory"
import { Routes, Route } from "react-router-dom";

import {  useDispatch } from "react-redux";
import { decrement, } from "./reducers/Dataslice";
import jwt_decode from "jwt-decode";
import { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import AddOrder from "./AddOrder";
import Inventory from "./Inventory";
import HomePage from "./HomePage";
import Payment from "./Payment";
import BuyerSupplier from "./BuyerSupplier";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Header from "./Header";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SvgIcon from "@mui/material/SvgIcon";

import { pink } from "@mui/material/colors";
const drawerWidth = 240;

function HomeIcon(props) {
  return (
    <SvgIcon  {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Header1() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  ///////////////////////rrrrrrrrrr
  const headers = {
    token: localStorage.getItem("token"),
  };

  var token = headers.token;

  var decoded = jwt_decode(token);
  var tokenData = decoded.result;
  const dispatch = useDispatch();
  const [state, setState] = useState();

  useEffect(() => {
    setState(tokenData.role);
    dispatch(decrement(tokenData));
    // eslint-disable-next-line
  },[]);

  if (state === "admin") {
    // if(state == "admin"){
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
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Header />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Link to="/home">
                  <HomeIcon sx={{ color: pink[500] }} />
                  Admin Home
                </Link>
              </ListItemIcon>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Link to="/inventory">
                  <InboxIcon />
                  Stock
                </Link>
              </ListItemIcon>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Link to="/buyerSupplier">
                  <InboxIcon />
                  Buyer/Supplier
                </Link>
              </ListItemIcon>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Link to="/payment">
                  <MailIcon />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  History
                </Link>
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            {/*if(localStorage.getItem("admin")&&(state!=='admin')){*/}
            <Route path="/inventory" element={<Inventory />} />

            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/Order" element={<AddOrder />} />

            <Route path="/home" element={<AdminHome />} />
            <Route path="/buyerSupplier" element={<BuyerSupplier />} />
            <Route path="/payment" element={<AdminHistory />} />
          </Routes>
        </Box>
      </Box>
    );
  } else {
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
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Header />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Link to="/home">
                  <HomeIcon sx={{ color: pink[500] }} />
                  Home
                </Link>
              </ListItemIcon>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Link to="/Order">
                  <InboxIcon />
                  Orders
                </Link>
              </ListItemIcon>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Link to="/payment">
                  {" "}
                  <MailIcon />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  PaymentMail
                </Link>
              </ListItemIcon>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path="/Order" element={<AddOrder />} />

            <Route path="/home" element={<HomePage />} />
            <Route path="/buyerSupplier" element={<BuyerSupplier />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </Box>
      </Box>
    );
  }
}