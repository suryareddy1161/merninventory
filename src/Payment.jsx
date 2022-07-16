import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import PaymentModal from "./PaymentModal";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
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

export default function Payment() {
  // const num = useSelector((state) => state.Data);
  const [rows, setRows] = useState([]);
  const [key, setKey] = useState(1);

  const pay = useSelector((state) => state.Data.pay);

  const headers = {
    token: localStorage.getItem("token"),
  };

  var token = headers.token;
  // var decodedHeader = jwt_decode(token, { header: true });
  // console.log(decodedHeader);

  var decoded = jwt_decode(token);
  var tokenData = decoded.result;

  // useEffect(() => {
  //   axios
  //     .get(`https://ramlinginventory.herokuapp.com/userOrder?email=${tokenData.email}`)
  //     .then((res) => {
  //       setRows(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //       },[]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/userOrder?email=${tokenData.email}`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });


  const Delete = (e) => {
    console.log(e._id, "daleteaa");

    axios
      .delete(`http://localhost:8080/userOrder/delete?id=${e._id}`)
      .then((res) => {
        setKey(key + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  var [grand] = useState(0);
  rows.map((ele) => (grand += ele.totalPrice));

  return (
    <div>
      <div>
        <Divider />
        <h3
          style={{
            alignItem: "center",
          }}
        >
          Payment History :{`${tokenData.first} ${tokenData.last}`}
        </h3>
        <Grid container direction="row" justifyContent="right">
          <h4>*Click on payment status for payment</h4>
        </Grid>
        {/* // Product Table */}
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
                <StyledTableCell align="center">Payment</StyledTableCell>
                <StyledTableCell align="center">Mail Send</StyledTableCell>
                <StyledTableCell align="center">Delete order</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...rows].map((row, i) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {i + 1}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {`${tokenData.first} ${tokenData.last}`}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.qty}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.totalPrice}
                  </StyledTableCell>

                 <StyledTableCell align="center">
                   {pay==="green"? <span style={{color:"green"}}>
                      Status:"sucess"
                    </span>:<span style={{color:"red"}}>
                      Status:"Pending"
                    </span>}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  {pay==="green"? <span style={{color:"green"}}>
                      Status:"sucess"
                    </span>:<span style={{color:"red"}}>
                      Status:"Pending"
                    </span>}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => Delete(row)}>delete</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Divider />
        {pay==="green"?<h1  style={{color:"green"}} >
          Grand Total =<span >{grand}</span>
        </h1> :<h1  style={{color:"red"}} >
          Grand Total =<span >{grand}</span>
        </h1>}
        {/* <Stack spacing={2} sx={{ mt: 2, ml: 42 }}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack> */}
      </div>
      <PaymentModal  />
    </div>
  );
}