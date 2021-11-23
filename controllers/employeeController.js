const express = require("express");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("employee/addOrUpdate.hbs", {
    viewTitle: "ADD EMPLOYEE",
  });
  console.log("method get");
});

// add or update record
router.post("/", (req, res) => {
  if (req.body._id == "") {
    store(req, res);
  } else {
    update(req, res);
  }
});

//get list of all record
router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list.hbs", {
        viewTitle: "EMPLOYEES LIST",
        list: docs,
      });
    } else {
      console.log("error in retreving empployee list");
    }
  });
});

//get list of all record
router.get("/:id", (req, res) => {
  console.log(req.params.id);

  Employee.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.render("employee/addOrUpdate.hbs", {
        viewTitle: "EDIT EMPLOYEE",
        employee: docs,
      });
    } else {
      console.log("error in retreving empployee list");
    }
  });
});

//get list of all record
router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("error in delete empployee");
    }
  });
});

//store the employee
function store(req, res) {
  var employee = new Employee();
  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.phone = req.body.phone;
  employee.city = req.body.city;

  employee.save((err, doc) => {
    if (!err) {
      res.redirect("employee/list");
    } else {
      if (err.name == "ValidationError") {
        //manage the error
        handelValidationError(err, req.body);

        res.render("employee/addOrUpdate.hbs", {
          viewTitle: "ADD NEW EMPLOYEE",
          employee: req.body,
        });
      }
      console.log("error storing the record " + err.name);
    }
  });
}

//todo
function update(req, res) {
  var employee = new Employee();
  employee._id = req.body.id;
  employee.name = req.body.name;
  employee.email = req.body.email;
  employee.phone = req.body.phone;
  employee.city = req.body.city;

  Employee.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "ValidationError") {
          //manage the error
          handelValidationError(err, req.body);

          res.render("employee/addOrUpdate.hbs", {
            viewTitle: "EDIT EMPLOYEE",
            employee: req.body,
          });
        }
        console.log("error update the record " + err.name);
      }
    }
  );
}

//validation function
function handelValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "name":
        body["nameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
    }
  }
}

module.exports = router;
