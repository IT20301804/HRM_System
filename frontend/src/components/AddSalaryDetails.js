import React, { useCallback, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { NavLink, useParams } from "react-router-dom";

export default function AddSalaryDetails()  {

    const { id } = useParams();

  const [month,setMonth]=useState("");
  const [contractual_hours,setcontractual_hours]=useState("");
  const [overtime_hours,setovertime_hours]=useState("");
  const [overtime_hours_rate,setovertime_hours_rate]=useState("");
  const [contractual_hours_rate,setcontractual_hours_rate]=useState("");


  function addSalary(e){
    e.preventDefault()

    console.log(id);
    
    let overtime_earnings = (parseInt(overtime_hours) * parseInt(overtime_hours_rate));
    let contractual_earnings = (parseInt(contractual_hours) * parseInt(contractual_hours_rate));
    let total_payments = overtime_earnings + contractual_earnings;
    let employeeId = id;

  const newSalary = {
    employeeId,
    month,
    contractual_hours,
    overtime_hours,
    contractual_earnings,
    overtime_earnings,
    total_payments
  }

  axios.post("http://localhost:8000/salary/add", newSalary)
  .then(()=>{
    swal({
            title: "Success!",
            text: "Salary added Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
        });
  }).catch((err)=>{
    alert(err)
  })
 
  }
  
    return (
      <div>
        <button type="button" className="btn btn-primary">
        <a href={"/salarydetails/"+ id} style={{ textDecoration: "none", color: "white" }}>
          Back
        </a>
      </button>
        <div className="col-lg-9 mt-2 mb-2">
            <h2>Add Salary</h2>
          </div>
        <form onSubmit={addSalary}>
          <div className="mb-3 mt-3">
            <label for="month" class="form-label">
              Date:
            </label>
            <input
              type="date"
              class="form-control"
              id="month"
              placeholder="DD/MM/YY"
              name="month"
              onChange={(e)=>{
                setMonth(e.target.value); 
              }}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="chrs" class="form-label">
              Contractual Hours:
            </label>
            <input
              type="number"
              class="form-control"
              id="contractual_hours"
              placeholder=""
              name="contractual_hours"
               onChange={(e)=>{
                setcontractual_hours(e.target.value.toUpperCase());
               }}
            />
            </div>
            <div class="mb-3 mt-3">
            <label for="crate" class="form-label">
              Contractual Rate:
            </label>
            <input
              type="number"
              class="form-control"
              id="contractual_rate"
              placeholder=""
              name="contractual_rate"
               onChange={(e)=>{
                setcontractual_hours_rate(e.target.value.toUpperCase());
               }}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="ohrs" class="form-label">
              Overtime Hours:
            </label>
            <input
              type="number"
              class="form-control"
              id="overtime_hours"
              placeholder=""
              name="overtime_hours"
                onChange={(e)=>{
                setovertime_hours(e.target.value);}}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="orate" class="form-label">
              Overtime Rate:
            </label>
            <input
              type="number"
              class="form-control"
              id="contractual_rate"
              placeholder=""
              name="contractual_rate"
               onChange={(e)=>{
                setovertime_hours_rate(e.target.value.toUpperCase());
               }}
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }

