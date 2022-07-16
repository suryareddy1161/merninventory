import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import AddModal from "./AddModal";
import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from '@mui/icons-material/Add';
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import AddStockEdit from "./AddStockEdit";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider } from "@mui/material";

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

export default function Inventory() {
  const num = useSelector((state) => state.Data.value)

  const [rows, setRows] = useState([]);
  const [key, setKey] = useState();
  const [sort, setSort] = useState(1);
  const [del,setDel]=useState(1);
  // //pagination
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  // const emptyRows =
  //   rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const onDeleteHandle = async (i) => {
    
    await axios
      .delete(`http://localhost:8080/delete/${i}`)
      .then((res) => {
        setDel(del+1)
        alert("Record Deleted Sucesfully.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[num,del]);
  
  // useEffect(() => {
  //   axios
  //     .get("https://ramlinginventory.herokuapp.com")
  //     .then((res) => {
  //       setRows(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },[del]);

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
      .get(`http://localhost:8080/sort/${key}`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: 3, marginTop: 3, marginRight: 3 }}>
        <AddModal />
      </Box>
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
                Name
              </StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">catagory</StyledTableCell>
              <StyledTableCell align="center">company</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "black",
                          }
                        : { color: "black" }
                    }
                    component="th"
                    scope="row"
                  >
                    {i + 1}
                  </StyledTableCell>

                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "black",
                          }
                        : { color: "black" }
                    }
                    align="center"
                  >
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "red",
                          }
                        : { color: "black" }
                    }
                    align="center"
                  >
                    {row.qty}
                  </StyledTableCell>
                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "black",
                          }
                        : { color: "black" }
                    }
                    align="center"
                  >
                    {row.price}
                  </StyledTableCell>
                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "black",
                          }
                        : { color: "black" }
                    }
                    align="center"
                  >
                    {row.catagory}
                  </StyledTableCell>
                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "black",
                          }
                        : { color: "black" }
                    }
                    align="center"
                  >
                    {row.company}
                  </StyledTableCell>
                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "black",
                          }
                        : { color: "black" }
                    }
                    align="center"
                  >
                    <AddStockEdit id={row} />
                  </StyledTableCell>
                  <StyledTableCell
                    style={
                      row.qty === 0
                        ? {
                            border: "2px solid red",
                            color: "black",
                          }
                        : { color: "black" }
                    }
                    align="center"
                  >
                    <DeleteIcon onClick={() => onDeleteHandle(row._id)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        /> */}
      </TableContainer>
    </div>
  );
}