import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Button from "@mui/material/Button";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const AddMenu = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginBottom: 3, marginTop: 3, marginRight: 3 }}>
        <Grid container direction="row" justifyContent="right">
          {/* <Grid item xs={2}>
            <CardMedia
              component="img"
              image="https://www.pngitem.com/pimgs/m/264-2640106_inventory-management-system-logo-hd-png-download.png"
              alt="Inventry Management System"
            />
          </Grid> */}
          <Grid item xs={2}>
          <Link to="signin"> <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "purple",
                borderRadius: "15px 1px",
              }}
            >
              Login
              
            </Button></Link>
          </Grid>
          <Grid item xs={1}>
           <Link to="signup"><Button 
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "green",
                borderRadius: "15px 1px",
              }}
            >
              SignUp
            </Button>  </Link>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <Box sx={{ flexGrow: 1, marginBottom: 3, marginTop: 3 }}>
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={5}>
            <Paper elevation={7}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Stock
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://www.calgaryconsultant.ca/wp-content/uploads/2022/05/inventory-management-airdrie.jpeg"
                    alt="Stock"
                  />
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <Paper elevation={7}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Customer
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://getmanta.com/wp-content/uploads/2018/07/Manta_inspiration_from_customers_07_2018.jpg"
                    alt="Customer"
                  />
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={7}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Product
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://miro.medium.com/max/750/1*vaHkvQwZ_wkuwBF9ccrm2A.png"
                    alt="Product"
                  />
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>

          <Grid item xs={5}>
            <Paper elevation={7}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Buyer / Seller
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://y26uq11r8xr1zyp0d3inciqv-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/11-1-1024x600.jpg"
                    alt="Buyer / Seller"
                  />
                </CardActionArea>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Paper elevation={12}>
        <Typography sx={{ p: 4 }}>
          An inventory management system is the process by which you track your
          goods throughout your entire supply chain, from purchasing to
          production to end sales. It governs how you approach inventory
          management for your business.
        </Typography>
      </Paper>
    </div>
  );
};

export default AddMenu;