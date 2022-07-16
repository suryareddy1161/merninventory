import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Form, } from "antd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import {ptm } from "./reducers/Dataslice";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

import Divider from "@mui/material/Divider";

// import { styled } from "@mui/material/styles";

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
const AddOrder = () => {
  const [state, setState] = useState(1);
  const [name] = useState("");
  const [rows, setRows] = useState([]);
  const [flag, setFlag] = useState(false);
  const [key, setKey] = useState();
  const [sort, setSort] = useState(1);
  // const location = useLocation();
  // const userEmail = location.state;
  // console.log("User Email", userEmail);

  // console.log("user Email", location.state);

  useEffect(() => {
    axios
      .get(`http://localhost:8080`)
      .then((res) => {
        setRows(res.data);
        setFlag(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);


  //qty textbox
  const onQtyChange = (e) => {
    setState(e.target.value);
  };
  const dispatch = useDispatch();

  const tokenData = useSelector((state) => state.Data.token);

  console.log("tokenData.first", tokenData.first);
  const OnbuybtnHandle = async (e) => {

    dispatch(ptm("Red"))
    console.log(e, state, name);

    if (e.qty < 1) {
      alert("Out of stock....");
    } else if (state > e.qty) {
      alert(`Only ${e.qty} are left in stock ... order bellow ${e.qty}`);
    } else {
      let data = {

        order: e,
        orderQty: state,
        email: tokenData.email,
        total: state * e.price,
      };
      console.log("data", data);
      await axios
        .post("http://localhost:8080/order", data)
        .then((res) => {
          alert("Order Placed");
         
          console.log("post", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //search
  const onSerachHandle = (e) => {
    setKey(e.target.value);
    console.log(key);
    axios
      .get(`http://localhost:8080/search/${key}`)
      .then((res) => {
        setRows(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //sort
  //name sort
  const sortHandle = async () => {
    if (sort === 1) {
      setSort(-1);
    } else {
      setSort(1);
    }
    await axios
      .get(`http://localhost:8080/sort/?num=${sort}`)
      .then((res) => {
        setRows(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: 1, marginTop: 1, marginRight: 3 }}>
        <Grid container direction="row" justifyContent="right">
          <Form.Item name="qty" label={tokenData.email}></Form.Item>
        </Grid>
      </Box>
      <Divider />
      <Box sx={{ flexGrow: 1, marginBottom: 1, marginTop: 1, marginRight: 3 }}>
        <Grid container direction="row" justifyContent="right">
          <TextField
            label="Search Here"
            onChange={onSerachHandle}
            color="secondary"
          />
        </Grid>
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1, marginBottom: 1, marginTop: 1, marginRight: 3 }}>
        <Grid container direction="row" justifyContent="left">
          <p>* Click on name for filtering</p>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr.No</StyledTableCell>
              <StyledTableCell onClick={sortHandle} align="center">
                Product Name
              </StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
              <StyledTableCell align="center">Company</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {i + 1}
                </StyledTableCell>
                {/* <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell> */}
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.qty}</StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    name="orderQty"
                    onChange={onQtyChange}
                    color="secondary"
                    style={{ width: "45px" }}
                    focused
                  />
                  {/* <IconButton
                    aria-label="decrement"
                    onClick={() => decrements(row)}
                  >
                    <RemoveSharpIcon />
                  </IconButton>
                  <span>{state}</span>
                  <IconButton
                    aria-label="increment"
                    onClick={() => increments(row)}
                  >
                    <AddBoxSharpIcon />
                  </IconButton> */}
                </StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {state * row.price}
                </StyledTableCell>
                <StyledTableCell align="center">{row.company}</StyledTableCell>
                <StyledTableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      onClick={() => OnbuybtnHandle(row)}
                    >
                      Buy
                    </Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* // Product Table */}

      <Stack spacing={2} sx={{ mt: 2, ml: 42 }}>
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Stack>
    </div>
  );
};

export default AddOrder;