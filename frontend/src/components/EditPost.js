import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

export default function Edit()  {

  const {id} = useParams();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/employee/${id}`).then((result ) => {
      console.log(result);
      setEmployee(result.data.employee);
      setName(result.data.employee.name);
      setNic(result.data.employee.nic);
      setAge(result.data.employee.age);
      setGender(result.data.employee.gender);
      setAddress(result.data.employee.address);
      setEmail(result.data.employee.email);
    })
  }, [id])
  

  const [name,setName]=useState(employee.name);
  const [nic,setNic]=useState(employee.nic);
  const [age,setAge]=useState(employee.age);
  const [gender,setGender]=useState(employee.gender);
  const [address,setAddress]=useState(employee.address);
  const [email,setEmail]=useState(employee.email);


  function updateEmployee(e){
    e.preventDefault();
  

    const newEmployee ={
      name,
      nic,
      age,
      gender,
      address,
      email
    }

    axios.put(`http://localhost:8000/employee/update/${id}`,newEmployee)
    .then(()=>{
      swal({
            title: "Success!",
            text: "Employee Updated Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
        });
      
    }).catch((err)=>{
      alert(err)
    });
  }

  return (
    <div className="container">
      Update Employee
      <form onSubmit={updateEmployee}>
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
            value={name}
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
            type="number"
            class="form-control"
            id="nic"
            placeholder="Enter NIC"
            name="nic"
            value={nic}
             onChange={(e)=>{
                setNic(e.target.value);
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
            value={age}
             onChange={(e)=>{
                setAge(e.target.value)}}
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
            placeholder="Enter Gender"
            name="gender"
            value={gender}
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
            value={address}
            onChange={(e)=>{
                setAddress(e.target.value)}}
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
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value);
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

