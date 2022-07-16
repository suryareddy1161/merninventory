const User = require("../models/User");

const getUSerdata1 = (req, res) => {
  User.find().then((data) => {
    console.log(data);
    res.json({
      data: data,
    });
  });

  //will be querying the data
};

module.exports = {
  getUSerdata1,
};
