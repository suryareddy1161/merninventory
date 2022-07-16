import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useSelector,useDispatch } from "react-redux";
import { ptm } from "./reducers/Dataslice";

import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

function ChildModal() {
  const dispatch=useDispatch()
  const tokenData = useSelector((state) => state.Data.token)

  const [open, setOpen] = React.useState(false);
  const [mail,setMail]=useState()
  const handleOpen = () => {

    dispatch(ptm("green"))
axios.get(`http://localhost:8080/user/email?email=${mail}&data=${tokenData.first} ${tokenData.last}`)
.then(()=>console.log("mail sent"))
.catch(()=>console.log("mailerr"))

    
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

const email=(e)=>{
setMail(e.target.value)
}
  return (
    <React.Fragment>
<h1>Name:{`${tokenData.first} ${tokenData.last}`}</h1>
<input type="email" onChange={email} />
      <Button onClick={handleOpen}>click to send mail</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title" style={{color:"Red"}}>your mail sent</h2>
          <p id="child-modal-description" style={{color:"green"}}>
            Thanks for your valuable Time "Visit again" 
          </p>
          <Button onClick={handleClose}>click here, to return</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function PaymentModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };




  return (
    <div>
      <Button onClick={handleOpen}>click to payment</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title" style={{color:"green"}}>your payment succesfull</h2>
          <p id="parent-modal-description">proceed further send mail</p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}