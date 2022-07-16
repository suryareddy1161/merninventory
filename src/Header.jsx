import * as React from "react";
import jwt_decode from "jwt-decode";
import LogoutIcon from '@mui/icons-material/Logout';

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";



import {  useDispatch ,} from "react-redux";
import {  incrementByAmount } from "./reducers/Dataslice";
import { useNavigate } from "react-router-dom";






export default function Header() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
const handleclick=()=>{
  //localStorage.removeItem("token")
navigate("/")
dispatch(incrementByAmount("change"))
}


  const headers = {
    token: localStorage.getItem("token"),
    
  };

   
var token = headers.token;
// var decodedHeader = jwt_decode(token, { header: true });
// console.log(decodedHeader);

var decoded = jwt_decode(token);
 var tokenData=decoded.result










  // const num = useSelector((state) => state.Data.value)
  // console.log(num)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "centre", textAlign: "centre" }}
        >
          
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 0 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <label htmlFor="">Logout</label>
              <Avatar sx={{ width: 32, height: 32 }}><LogoutIcon/></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0
              }
            }
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >

          <MenuItem>
            <Avatar />  Name: {`${tokenData.first} ${tokenData.last}`}

          </MenuItem>
          <MenuItem>
            <Avatar /> Email:{tokenData.email}
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
           Role:{tokenData.role}
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Address:{tokenData.address}
          </MenuItem>
          <MenuItem onClick={handleclick}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
           <h3 >Logout</h3> 
          </MenuItem>
        </Menu>
      </React.Fragment>
    </div>
  );
}