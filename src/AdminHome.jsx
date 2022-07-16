import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Divider from "@mui/material/Divider";

// import { styled } from "@mui/material/styles";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary
// }));

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
const AdminHome = () => {
  const [rows, setRows] = useState([]);
 
  // for orders

  const headers = {
    token: localStorage.getItem("token"),
  };

  var token = headers.token;
  // var decodedHeader = jwt_decode(token, { header: true });
  // console.log(decodedHeader);

  var decoded = jwt_decode(token);
  var tokenData = decoded.result;

  console.log();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/order`)
      .then((res) => {
        // console.log(res,"ttttttt")
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  // const shoppingHandler = () => {
  //   console.log("use Email =", tokenData.email);
  //   navigate("/Order", { state: tokenData.email });
  // };

  return (
    <div>
      <h3>Admin Logged In {`${tokenData.first} ${tokenData.last}`} , Welcome ....</h3>
      <Stack direction="row" spacing={4}>
        <Card sx={{ maxWidth: 250 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="160"
              image="https://www.pngkey.com/png/detail/138-1388270_transparent-user-png-icon.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Name:{`${tokenData.first} ${tokenData.last}`}
              </Typography>
              <Divider />
              <Typography
                sx={{ mt: 1, mb: 1, ml: 1 }}
                variant="body2"
                color="text.secondary"
              >
                Email :{tokenData.email}
              </Typography>
              <Divider />
              <Typography
                sx={{ mt: 2, mb: 1, ml: 1 }}
                variant="body2"
                color="text.secondary"
              >
                Address :{tokenData.address}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 600 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="360"
              image="https://ibwc.in/wp-content/uploads/2021/06/log.png"
              alt="green iguana"
            />
          </CardActionArea>
        </Card>
      </Stack>
      <div>
        <h3
          style={{
            alignItem: "center",
          }}
        >
          Previous Orders :
        </h3>

        <Divider />
        {/* // Product Table */}
        <TableContainer component={Paper} mt={2} ml={3}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell> Id</StyledTableCell>
                <StyledTableCell>Cust Email-Id</StyledTableCell>
                {/* <StyledTableCell align="center">Cust Name</StyledTableCell> */}
                <StyledTableCell align="center">Products Name</StyledTableCell>
                <StyledTableCell align="center">Qty</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Total Price</StyledTableCell>
                <StyledTableCell align="center">Payment</StyledTableCell>
                <StyledTableCell align="center">Mail Send</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
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
                  <StyledTableCell align="center" style={{ color: "green" }}>
                    Status:Sucess
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ color: "green" }}>
                    Status:Sucess
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Stack spacing={2} sx={{ mt: 2, ml: 42 }}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack> */}
      </div>
    </div>
  );
};

export default AdminHome;