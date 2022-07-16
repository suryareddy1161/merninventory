import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminHistory() {
  const [rows, setRows] = useState([]);

  // const tokenData = useSelector((state) => state.Data.token);

  const headers = {
    token: localStorage.getItem("token"),
  };

  var token = headers.token;
  // var decodedHeader = jwt_decode(token, { header: true });
  // console.log(decodedHeader);

  var decoded = jwt_decode(token);
  var tokenData = decoded.result;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/order`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  
//   useEffect(() => {
//     axios
//       .get(`http://localhost:8080/userOrder?email=${tokenData.email}`)
//       .then((res) => {
//         setRows(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },[key]);

//   const statusHandler = (e) => {
//     console.log(e);
//     setPayment("Sucess");
//     alert("Payment Sucessfull");
//   };

//   const onMailsend = (e) => {
//     setMail("Sucess");
//     alert("Payment Sucessfull");
//   };

// const Delete=(e)=>{
// console.log(e._id,"daleteaa")

//   axios
//   .delete(`http://localhost:8080/userOrder/delete?id=${e._id}`)
//   .then((res) => {
//     setKey(key+1)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }


  return (
    <div>
      <div>
        <Divider />
        <h3
          style={{
            alignItem: "center",
          }}
        >
        Sold out Products  History of :{`${tokenData.first} ${tokenData.last}`}
        </h3>
        <Grid container direction="row" justifyContent="right">
        </Grid>
        <TableContainer component={Paper} mt={2} ml={3}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> Id</StyledTableCell>
                <StyledTableCell>Cust Name</StyledTableCell>
                {/* <StyledTableCell align="center">Cust Name</StyledTableCell> */}
                <StyledTableCell align="center">Products Name</StyledTableCell>
                <StyledTableCell align="center">Qty</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Total Price</StyledTableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {[...rows].map((row, i) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.custName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.qty}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.totalPrice}
                  </StyledTableCell>
                  
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
      </div>
    </div>
  );
}