require("./models/db.js");
const express = require("express");
const path = require("path");
const employeeController = require("./controllers/employeeController");
// import package
const expHbs = require("express-handlebars");
// used to allow Insecure Prototype Access
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
// import package parser
const bodyParser = require("body-parser");

var app = express();

//add parameteres to req with bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//init layouts
app.set("views", path.join(__dirname + "/views/"));
app.engine(
  "hbs",
  expHbs({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir: __dirname + "/views/layouts/",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set(" views engine", "hbs");

//port of server
app.listen(3011, () => {
  console.log("server started");
});

//call controller
app.use("/employee", employeeController);
