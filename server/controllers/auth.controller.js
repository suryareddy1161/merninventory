const User = require("../models/User");
const { passwordCompare, jwtGen } = require("../utils/utils");
const signup = (req, res) => {
  console.log(req.body,"datasignup");
  const user = new User({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    address:req.body.address,
    data:[{
      name:req.body.name,
      price:req.body.price
    }],
    
  });

  user
    .save()
    .then((data) => {
      res.json({
        message: "Successfully registered",
      });
    })
    .catch((err) => {
      res.json({
        message: "User already registered",
      });
    });
};

const login = (req, res) => {
  // console.log(req);

  User.findOne({ email: req.body.email })
    .then((result) => {
      console.log(result,"resssssss")
      //we have to compare the passwords
      passwordCompare(result.password, req.body.password).then((data) => {
        //console.log("dbpassword",result.password)
        //console.log("entered password",req.body.password)
        if (result) {
          jwtGen({result })
            .then((token) => {
              console.log("token",token)
              res.json({
                message: "Login Success",
                token: token,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          res.json({
            message: "Login Failed",
          });
        }
      });
    })
    .catch((err) => {
      res.json({
        message: "No user found !!",
      });
    });
};

//By neha
const getUserData = async (req, res) => {
  console.log("get user data email:", req.params.id);
  try {
    const List = await User.findOne({ email: req.params.id });
    console.log(List);
    // res.send(List);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signup,
  login,
  getUserData,
};
