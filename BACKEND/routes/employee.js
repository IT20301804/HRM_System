const express = require("express");
const employee = require("../models/employee");
const Employee = require("../models/employee");
const router = express.Router();

//add employee
router.post("/employee/add", (req, res) => {
  let newEmployee = new Employee(req.body);

  newEmployee.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Employee saved successfully",
    });
  });
});

//fetch employees
router.get("/employee", (req, res) => {
  Employee.find().exec((err, employee) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingEmployee: employee,
    });
  });
});
// fetch a specific employee
router.get("/employee/:id", (req, res) => {
  let employeeId = req.params.id;

  Employee.findById(employeeId, (err, employee) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  });
});

//update employee

router.put("/employee/update/:id", async (req, res) => {
  let eid = req.params.id;

  const { name, nic, age, gender, address, email } = req.body;
  const updateEmployee = { name, nic, age, gender, address, email };
  await Employee.findByIdAndUpdate(eid, updateEmployee)
    .then(() => {
      res.status(200).send({ status: "Successfully Added" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "unsuccessful" });
    });
});

//delete
router.delete("/employee/delete/:id", (req, res) => {
  Employee.findByIdAndRemove(req.params.id).exec((err, deletedEmplpoyee) => {
    if (err)
      return res.status(400).json({
        message: "Remove Unsucceful",
        err,
      });

    return res.json({
      message: "Delete Successful",
      deletedEmplpoyee,
    });
  });
});

module.exports = router;
