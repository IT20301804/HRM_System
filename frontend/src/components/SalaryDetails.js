import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";


const SalaryDetails = () => {

  const { id } = useParams();
  console.log(id);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setselectedEmployee] = useState();
  useEffect(() => {
    function retrieveEmployee() {
      axios.get("http://localhost:8000/salary/" + id).then((res) => {
        setEmployees(res.data.existingSalary);
      });
    }
    retrieveEmployee();
  }, []);
  function deleteEmployee(e) {
    axios.delete("http://localhost:8000/salary/delete/" + selectedEmployee);
    window.location.reload(false);
  }

  return (
    <div>
      <button type="button" className="btn btn-primary">
        <a href={"/post/"+ id} style={{ textDecoration: "none", color: "white" }}>
          Back
        </a>
      </button>
      &nbsp;
            <button className="btn btn-success">
        <a href={"/addSalary/" + id} style={{ textDecoration: "none", color: "white" }}>
          Add Salary
        </a>
      </button>
      <p></p>
      <table className="table">
       
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Date</th>
            <th scope="col">Contractual Hours</th>
            
            <th scope="col">Overtime Hours</th>
            <th scope="col">Contractual Earnings</th>
            <th scope="col">Overtime Earnings</th>
            <th scope="col">Total Payments</th>
            <th scope="col">Action</th>
           
          </tr>
        </thead>
        <tbody>
         
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <th scope="row">{index + 1}</th>
              <td>
                {" "}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => setselectedEmployee(employee._id)}
                  />
                </div>
              </td>
              <td>
                {/* <NavLink to={`/post/${employee._id}`}
                  style={{ textDecoration: "none" }} */}
                {/* > */}
                {employee.month}
                {/* </NavLink> */}
              
              </td>
              <td>{employee.contractual_hours}</td>
              <td>{employee.overtime_hours}</td>
             
              <td>{employee.contractual_earnings}</td>
              <td>{employee.overtime_earnings}</td>
              <td>{employee.total_payments}</td>
              
              <td>
              
                <NavLink to={`/update/salary/${employee._id}`} className="btn btn-warning">
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </NavLink>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={deleteEmployee}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
    </div>
  );
}

export default SalaryDetails;