const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/employeeDB",
  { useNewUrlParser: true },
  (err) => {
    !err
      ? console.log("mongoDB connection is succeful")
      : console.log("mongoDb connection is faild: " + err);
  }
);

require("./employee.model");
