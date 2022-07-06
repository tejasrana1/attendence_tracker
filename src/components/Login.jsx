import React, { useEffect, useState } from 'react'
import { TextField,Box,Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { passwordReGex, usernameReGex } from './reGex'
import bcrypt from "bcryptjs";
import $ from "jquery"
import TransitionAlerts from "./Alert";
import { Link,useNavigate } from 'react-router-dom'



const Login = () => {
    const navigate = useNavigate();
  const [alert,setAlert] = useState(false)
    const [user,setUser] = useState({
        username: "",
        password: ""
    })
    const [err,setErr] = useState({
        username: false,
        password: false
    })
    const [msg,setMsg] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch();
    async function handleSubmit(e){
        e.preventDefault()
        const usr = await $.get("http://localhost:8080/user/")
        const selectedUser = await usr.filter(emp=> emp.eid === user.username)
        if(selectedUser[0].eid === user.username){
            if(bcrypt.compareSync(user.password,selectedUser[0].password)){
                dispatch(login({
                    name: selectedUser[0].name,
                    eid: selectedUser[0].eid,
                    phone: selectedUser[0].phone,
                    email: selectedUser[0].email
                }))
                sessionStorage.setItem("login", JSON.stringify({
                    name: selectedUser[0].name,
                    eid: selectedUser[0].eid,
                    phone: selectedUser[0].phone,
                    email: selectedUser[0].email
                }))
                return navigate("/");
            }
        }
        setAlert(true)
    }
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUser(prev=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }
    const validate = (e)=>{
        if(e.target.name === "password"){
        if(!passwordReGex.test(user.password)){
            setErr(prev=>{
                return{
                    ...prev,
                    password: true
                }
            })
            setMsg(prev=>{
                return{
                    ...prev,
                    password: "Password Validation Failed"
                }
            })
        }
        else{
            setErr(prev=>{
                return{
                    ...prev,
                    password: false
                }
            })
            setMsg(prev=>{
                return{
                    ...prev,
                    password: ""
                }
            })
        }
    }
        if(e.target.name === "username"){
        if(!usernameReGex.test(user.username)){
            setErr(prev=>{
                return{
                    ...prev,
                    username: true
                }
            })
            setMsg(prev=>{
                return{
                    ...prev,
                    username: "Username Validation Failed"
                }
            })
        }
        else{
            setErr(prev=>{
                return{
                    ...prev,
                    username: false
                }
            })
            setMsg(prev=>{
                return{
                    ...prev,
                    username: ""
                }
            })
        }
    }
    }
  return (
      <>
    <div className='loginContainer'>
      {alert && <TransitionAlerts setAlert={setAlert} alert={alert}>Incorrect Username or Password</TransitionAlerts>}
         <Box
         onSubmit={handleSubmit}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          error={err.username}
          id="outlined-error-helper-text"
          label="Employee Id"
          helperText={msg.username}
          value={user.username}
          onChange={handleChange}
          onBlur={validate}
          name="username"
          onFocus={()=>{(alert === true) && setAlert(false)}}
        /> <br />
        <TextField
          error={err.password}
          type="password"
          id="outlined-error-helper-text"
          label="Password"
          helperText={msg.password}
          value={user.password}
          onChange={handleChange}
          onBlur={validate}
          name="password"
          onFocus={()=>{(alert === true) && setAlert(false)}}
        /> <br />
        <Button style={{margin: "10px"}} disabled={err.password && err.username} variant="contained" type='submit'>Sign In&nbsp;</Button>
        <Link style={{textDecoration: "none"}} to="/register">
        <Button style={{margin: "10px"}} variant="outlined" type='button'>Sign Up</Button>
        </Link>
      </div>
      </Box>
    </div>
    </>
  )
}

export default Login