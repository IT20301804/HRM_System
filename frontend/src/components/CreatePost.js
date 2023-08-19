import React, { useCallback, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';


export default function AddEmployee()  {

  const [name,setName]=useState("");
  const [nic,setNic]=useState("");
  const [age,setAge]=useState("");
  const [gender,setGender]=useState("");
  const [address,setAddress]=useState("");
  const [email,setEmail]=useState("");


  function addEmployee(e){
    e.preventDefault()

    // if (name.length == 0) {
    //   swal("Please add a name");
    //   return;
    // }  
    // if (address.length == 0) {
    //   swal("Please add an address");
    //   return;
    // }  
    // if (nic.length <10) {
    //   swal("Invalid NIC No");
    //   return;
    // }  

  const newEmployee ={
    name,
    nic,
    age,
    gender,
    address,
    email

  }

  axios.post("http://localhost:8000/employee/add",newEmployee)
  .then(()=>{
    swal({
            title: "Success!",
            text: "Employee added Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
        });
  });
  window.location.reload(false);






  }
  
    return (
      <div>
        AddEmployee
        <form onSubmit={addEmployee}>
          <div className="mb-3 mt-3">
            <label for="name" class="form-label">
              Name:
            </label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Enter Name"
              name="name"
              onChange={(e)=>{
                setName(e.target.value);
              }}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="nic" class="form-label">
              NIC:
            </label>
            <input
              type="text"
              class="form-control"
              id="nic"
              placeholder="Enter NIC"
              name="nic"
               onChange={(e)=>{
                setNic(e.target.value.toUpperCase());
               }}
            />
          </div>
        
          <div class="mb-3 mt-3">
            <label for="age" class="form-label">
              Age:
            </label>
            <input
              type="number"
              class="form-control"
              id="age"
              placeholder="Enter Age"
              name="age"
               onChange={(e)=>{
                setAge(e.target.value);}}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="gender" class="form-label">
              Gender:
            </label>
            <input
              type="text"
              class="form-control"
              id="gender"
              placeholder="Female/Male"
              name="gender"
               onChange={(e)=>{
                setGender(e.target.value);
               }}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="adress" class="form-label">
              Address:
            </label>
            <input
              type="text"
              class="form-control"
              id="adress"
              placeholder="Enter Address"
              name="address"
              onChange={(e)=>{
                setAddress(e.target.value);
               }}
            />
          </div>
          <div class="mb-3 mt-3">
            <label for="email" class="form-label">
              Email:
            </label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={(e)=>{
                setEmail(e.target.value);
               }}
            />
          </div>

       {/* <NavLink to={`/edit/${employee._id}`} className="btn btn-warning">
                  <i className="fas fa-edit"></i>&nbsp;Edit
                </NavLink> */}
          <button type="submit" class="btn btn-primary">
             {/* <a href={"/post/"+ id} style={{ textDecoration: "none", color: "white" }}></a> */}
            Submit
          </button>
        </form>
      </div>
    );

            }