const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
 
    employeeId: {
        type: String,
        required: true,
    },

    month: {
        type: String,
        required: true,
    },

    contractual_hours: {
    type: Number,
    required: true,
  },
  
   overtime_hours: {
    type: Number,
    required: true,
  },
   contractual_earnings: {
    type: Number,
    required: true,
  },
   overtime_earnings: {
    type: Number,
    required: true,
  },
   total_payments: {
    type: Number,
    required: true,
  },
  
  
});

module.exports = mongoose.model("salary", salarySchema);
