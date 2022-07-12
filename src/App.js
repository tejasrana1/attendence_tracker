import React, { useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Calendar from './components/Home/Calendar';
import Register from './components/Register';
import { useLocation,Routes, Route } from 'react-router-dom';
import Main from './components/Home/user/Main';
import AdminMain from './components/Home/admin/Main';
import { Grid } from '@mui/material';
import SideBar from './components/Home/SideBar';
import NavBar from './components/Home/NavBar';
import "./components/Home/home.css"
import $ from "jquery"
import { attendence } from './store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './store/userSlice';
import { attendance, data } from './store/adminSlice';
function FourOFour(){

  return <div style={{
    width: "200vw",
    height: "100vh",
    position: "fixed",
    zIndex: "1000",
    background: "yellow",
    overflow: "hidden"
  }}> <h1>Page Not Found</h1> </div>
}
function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  let location = useLocation()
  async function hello(){
  let attd = await $.get("http://localhost:8080/time")
  let allUsers = await $.get("http://localhost:8080/user")
  await dispatch(data(allUsers))
  await dispatch(attendance(attd))
  // console.log(attd);
  // console.log(user.user);
  attd = await attd.filter(itm=> itm.eid === user.user.eid)
  console.log(attd);
  dispatch(attendence(attd))
  sessionStorage.setItem("attd", JSON.stringify(attd))
  }
  useEffect(()=>{
    hello()
    if(location.pathname === "/login" || location.pathname === "/register"){
      document.querySelector(".navbar").classList.add("noDisp")
      document.querySelector(".sidebar").classList.add("noDisp")
    }
    else{
      document.querySelector(".navbar").classList.remove("noDisp")
      document.querySelector(".sidebar").classList.remove("noDisp")
    }
  },[location])
  return (
    <div className="App">
      <Grid container spacing={0}>
        <SideBar></SideBar>
        <div className='mainContainer'>
        <div className='container'>
        <NavBar></NavBar>
        <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/admin/main" element={<AdminMain />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route path="*" element={<FourOFour />} />
        </Routes>
        </div>
        </div>
      </Grid>
      
    </div>
  );
}

export default App;
