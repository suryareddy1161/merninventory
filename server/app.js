// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./db/connectDB");
//
// const port = process.env.PORT || 7001;
// const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://RRR:RRR@cluster0.rajfy.mongodb.net";

// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cors());

// connectDB(DATABASE_URL);

// app.use("/", web);

//////////////////////rrrrrrr

const express = require("express");
const cors = require("cors");
const app = express();
const web = require("./routes/web");
const authrouter = require("./routes/auth.routes");
const userrouter = require("./routes/user.routes");
const adminrouter = require("./routes/admin.routes");

app.use(express.json());
app.use(cors());
app.use("/", web);
app.use("/auth", authrouter);
app.use("/user", userrouter);
app.use("/admin", adminrouter);
module.exports = app;

/////////rrrrrrrr

// app.listen(port, () => {
//   console.log(`App listning at port http://localhost:${port}`);
// });
