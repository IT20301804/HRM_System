import React, { Component } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import swal from 'sweetalert';


const genPDF = employee => {
    const doc = new jsPDF();
    const tableColumn = ["Name", "NIC", "Age", "Gender", "Address","Email"];
    const tableRows = [];
  
    employee.map(employee => {
      const employeedata = [
       
       employee.name,
       employee.nic,
      employee.age,
      employee.gender,
       employee.address,
       employee.email,
   ];
      tableRows.push(employeedata);
    })
    doc.text("Devine Destiny", 70,8).setFontSize(13);
    doc.text("Employee Details", 14, 16).setFontSize(13); 
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.save("Employees Report.pdf");
  }

export default class Home extends Component {
constructor(props){
  super(props);

  this.state={
    employee:[]
  };

}


componentDidMount(){
  this.retriveveEmployee();

}

retriveveEmployee(){
  axios.get("http://localhost:8000/employee").then(res =>{
    if(res.data.success){
      this.setState({
        employee:res.data.existingEmployee
      });

      console.log(this.state.employee)
    }


  });
}

//delete function

onDelete = (id) =>{

  axios.delete("http://localhost:8000/employee/delete/"+id).then((res) =>{
    // alert("Deleted Successfully");
   swal({
            title: "Success!",
            text: "Employee Deleted Successfully",
            icon: 'success',
            timer: 2000,
            button: false,
        });
    this.
    retriveveEmployee();
  })
}

//Search employee

filterData(employee,searchKey){

  const result = employee.filter((employee) =>
  employee.name.toLowerCase().includes(searchKey)
  // employee.supplier.toLowerCase().includes(searchKey)
)

this.setState({employee:result})
}


handleSearchArea = (e) =>{

  const searchKey = e.currentTarget.value;

  axios.get("http://localhost:8000/employee").then(res =>{
    if(res.data.success){
     
       this.filterData(res.data.existingEmployee,searchKey)
      
    }
  });

}
  render() {
    return (
     

      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h2>All Employee</h2>
          </div>
          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="search"
            name="searchQuery"
            onChange={this.handleSearchArea}>

            </input>
          </div>
        </div>
       <table className="table table-hover" style={{marginTop:'40px'}} id="content">
         <thead>
           <tr>
           <th scope="col">No</th>
           <th scope="col">Name</th>
           <th scope="col">NIC</th>
           <th scope="col">Age</th>
           <th scope="col">Gender</th>
           <th scope="col">Address</th>
            <th scope="col">Email</th>
           </tr>
         </thead>
         <tbody>
           {this.state.employee.map((employee,index) =>(
             <tr key={index}>

               <th scope="row">{index+1}</th>
               <td>
                   <a href={`/post/${employee._id}`} style={{textDecoration:'none'}}>
                   {employee.name}
                   </a>
                   </td>

               <td>{employee.nic}</td>
               <td>{employee.age}</td>
               <td>{employee.gender}</td>
               <td>{employee.address}</td>
               <td>{employee.email}</td>
               
               <td>
                 <a className="btn btn-warning" href={`/edit/${employee._id}`}>
                   <i className="fas fa-edit"></i>&nbsp;Edit
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(employee._id)}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </a>

               </td>
              </tr>

           ))} 
           
         </tbody>

       </table>
       

       <button className="btn btn-success"><a href="/add" style={{textDecoration:'none',color:'white'}}>Add New Employee</a></button>
       &nbsp;

       
       <button type="button" className="btn btn-danger" style={{width:'250px',position:"absolute",

right:"150px"}}><a href="#" onClick={() =>genPDF(this.state.employee)} style={{textDecoration:'none', color:'white'}}> GENERATE REPORT</a></button>
    

      </div>
      

    )
  }
}
