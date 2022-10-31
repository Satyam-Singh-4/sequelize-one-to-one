const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

require("./Models/dbconfig");

require("dotenv").config();
const router=require('./Router/router')

const app = express();
app.use(cors());
// To read JSON data in URL body
app.use(bodyParser.json());
app.use("/", router);
// To read log URLs
app.use(bodyParser.urlencoded({ extended: true }));

//server code
app.listen(process.env.PORT, () => {
  console.log(`server is running on port no:${process.env.PORT}`);
});
