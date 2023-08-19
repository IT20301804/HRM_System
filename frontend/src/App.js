import React, {Component} from 'react';
// import {BrowserRouter,Route} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from'./components/CreatePost';
import EditPost from'./components/EditPost';
import Home from'./components/Home';
import NavBar from'./components/NavBar';
import PostDetails from'./components/PostDetails';
import SalaryDetails from "./components/SalaryDetails";
import AddSalaryDetails from "./components/AddSalaryDetails";
import EditSalary from './components/EditSalary';
// import image10 from './image10.jpeg'

export default class App extends Component {
  render() {
    return (
      <Router>
       <div className="container">
         <NavBar/>
         <Routes>
         <Route path="/" exact element={<Home/>}/>
         <Route path="/add" element={<CreatePost/>}/>
         <Route path="/edit/:id" element={<EditPost/>}/>
         <Route path="/post/:id" element={<PostDetails/>}/>
         <Route path="/salarydetails/:id" exact element={<SalaryDetails/>}/>
         <Route path="/addSalary/:id" exact element={<AddSalaryDetails/>}/>
         <Route path="/update/salary/:id" exact element={<EditSalary/>}/>
         </Routes>

         </div>
        
         </Router>
    
// style={{ backgroundImage: `url(${image10})`}
    
    )
  }
}


