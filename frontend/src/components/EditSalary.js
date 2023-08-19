import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function EditSalary(){
    const {id} = useParams();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/salary/"+id).then((result ) => {
      console.log(result);
      // setMonth(result.data.employee.month);
      setChrs(result.data.contractual_hours);
      setOhrs(result.data.overtime_hours);
      setCearnings(result.data.contractual_earnings);
      setOearnings(result.data.overtime_earnings);
      setTpay(result.data.total_payments);
    })
  }, [id])
  

  // const [month,setMonth]=useState(employee.month);
  const [contractual_hours,setChrs]=useState(employee.contractual_hours);
  const [overtime_hours,setOhrs]=useState(employee.overtime_hours);
  const [contractual_earnings,setCearnings]=useState(employee.contractual_earnings);
  const [overtime_earnings,setOearnings]=useState(employee.overtime_earnings);
  const [total_payments,setTpay]=useState(employee.total_payments);


  function updateSalary(e){
    e.preventDefault();
  

    const newSalary ={
    contractual_hours,
    overtime_hours,
    contractual_earnings,
    overtime_earnings,
    total_payments
    }

    axios.put("http://localhost:8000/salary/update/"+id,newSalary)
    .then(()=>{
      alert("Salary Updated")
      
    }).catch((err)=>{
      alert(err)
    });
  }

    return (
    <div className="container">
      AddSalary
          <form onSubmit={updateSalary}></form>
      <form >
        
        <div className="mb-3 mt-3">
          <label for="chrs" class="form-label">
            Contractual Hours:
          </label>
          <input
            type="text"
            class="form-control"
            id="chrs"
            placeholder=""
            name="chrs"
            value={contractual_hours}
            onChange={(e)=>{
                setChrs(e.target.value);
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
            id="ohours"
            placeholder=""
            name="ohrs"
            value={overtime_hours}
             onChange={(e)=>{
                setOhrs(e.target.value);
               }}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="cear" class="form-label">
            Contractual Earnings:
          </label>
          <input
            type="number"
            class="form-control"
            id="cear"
            placeholder=""
            name="cear"
            value={contractual_earnings}
             onChange={(e)=>{
                setCearnings(e.target.value)}}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="oear" class="form-label">
            Overtime Earnings:
          </label>
          <input
            type="number"
            class="form-control"
            id="oear"
            placeholder=""
            name="oear"
            value={overtime_earnings}
             onChange={(e)=>{
                setOearnings(e.target.value)}}
          />
        </div>
        <div class="mb-3 mt-3">
          <label for="tpay" class="form-label">
            Total Payments:
          </label>
          <input
            type="number"
            class="form-control"
            id="tpay"
            placeholder=""
            name="tpay"
            value={total_payments}
             onChange={(e)=>{
                setTpay(e.target.value)}}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );



}

export default EditSalary;