const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  name: { type: String, required: "this field is required" },
  email: { type: String },
  phone: { type: String },
  city: { type: String },
});

// custom an owner validation methode
employeeSchema.path("email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Please type a valid email");

mongoose.model("Employee", employeeSchema);
