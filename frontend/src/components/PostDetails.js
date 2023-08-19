import React, { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function AddEmployee()  {


  const {id} = useParams();
  console.log(id)
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/employee/${id}`).then((result ) => {
      console.log(result);
      setEmployee(result.data.employee);
    })
  }, [id])

  function deleteEmployee(e) {
    axios.delete("http://localhost:8000/employee/delete/" + id);
    alert("Employee Deleted")
    navigate("/");
  }

    return (
      <div >
        <dl class="row">
  <dt class="col-sm-3">Name</dt>
  <dd class="col-sm-9">{employee.name}</dd>
   <dt class="col-sm-3">NIC</dt>
  <dd class="col-sm-9">{employee.nic}</dd>
 <dt class="col-sm-3">Age</dt>
  <dd class="col-sm-9">{employee.age}</dd>
 <dt class="col-sm-3">Gender</dt>
  <dd class="col-sm-9">{employee.gender}</dd>
 <dt class="col-sm-3">Address</dt>
  <dd class="col-sm-9">{employee.address}</dd>
 <dt class="col-sm-3">Email</dt>
  <dd class="col-sm-9">{employee.email}</dd>
</dl>
 <NavLink to={`/edit/${employee._id}`} className="btn btn-warning">
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </NavLink>
        &nbsp;
                <a className="btn btn-danger" href="#" onClick={deleteEmployee} >
                  <i className="far fa-trash-alt"></i>&nbsp;Delete 
                </a>
                &nbsp;
 <NavLink to={`/salarydetails/${employee._id}`} className="btn btn-success">
                  <i className="fas fa-edit"></i>&nbsp;Salary Details
                </NavLink>
        &nbsp;
                
      </div>
    );
  }


