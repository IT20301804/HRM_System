const express = require("express");
const employee = require("../models/employee");
const Employee = require("../models/employee");
const salary = require("../models/salary");
const Salary = require("../models/salary");
const router = express.Router();

//add salary
router.post("/salary/add", (req, res) => {
  let newSalary = new Salary(req.body);
  console.log(newSalary);

  newSalary.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Salary Added successfully",
    });
  });
});

//fetch salaries
router.get("/salary/:id", (req, res) => {
    
    let id = req.params.id;
  Salary.find({ employeeId: id }).exec((err, salary) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingSalary: salary,
    });
  });
});
// fetch a specific employee's salary


// router.get("/employee/:id", (req, res) => {
//   let employeeId = req.params.id;

//   Employee.findById(employeeId, (err, employee) => {
//     if (err) {
//       return res.status(400).json({ success: false, err });
//     }

//     return res.status(200).json({
//       success: true,
//       employee,
//     });
//   });
// });

//update employee

router.put("/salary/update/:id", async (req, res) => {
  let eid = req.params.id;

  const { contractual_hours,overtime_hours,contractual_earnings,overtime_earnings,total_payment } = req.body;
  const updateSalary = { contractual_hours,overtime_hours,contractual_earnings,overtime_earnings,total_payment };
  await Salary.findByIdAndUpdate(eid, updateSalary)
    .then(() => {
      res.status(200).send({ status: "Successfully Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Unsuccessful" });
    });
});

//delete
router.delete("/salary/delete/:id", (req, res) => {
  Salary.findByIdAndRemove(req.params.id).exec((err, deletedSalary) => {
    if (err)
      return res.status(400).json({
        message: "Remove Unsucceful",
        err,
      });

    return res.json({
      message: "Delete Successful",
      deletedSalary,
    });
  });
});

module.exports = router;


