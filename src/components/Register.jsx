import React, { useEffect, useState } from 'react'
import { TextField,Box,Button } from '@mui/material'
import { passwordReGex, usernameReGex } from './reGex'
import { login,selectUser } from '../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'


const Register = () => {
    const userData = useSelector(selectUser)
    const dispatch = useDispatch()
    const [user,setUser] = useState({
        name: "",
        email: "",
        eid: "",
        phone: ""
    })
    const [err,setErr] = useState({
        name: false,
        email: false,
        eid: false,
        phone: false
    })
    const [msg,setMsg] = useState({
        name: "",
        email: "",
        eid: "",
        phone: ""
    })
    function handleSubmit(e){
        e.preventDefault()
       alert("hi")
       console.log(user);
       dispatch(login({user}))
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
    <div>
        <button onClick={()=>{console.log(userData);}}>a</button>
         <Box
         onSubmit={handleSubmit}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <TextField
          error={err.name}
          id="outlined-error-helper-text"
          label="Name"
          helperText={msg.name}
          value={user.name}
          onChange={handleChange}
          onBlur={validate}
          name="name"
        />
        <TextField
          error={err.email}
          id="outlined-error-helper-text"
          type="email"
          label="Email"
          helperText={msg.email}
          value={user.email}
          onChange={handleChange}
          onBlur={validate}
          name="email"
        />
        <TextField
          error={err.phone}
          id="outlined-error-helper-text"
          type="tel"
          label="Phone"
          helperText={msg.phone}
          value={user.phone}
          onChange={handleChange}
          onBlur={validate}
          name="phone"
        />
        <TextField
          error={err.eid}
          id="outlined-error-helper-text"
          type="number"
          label="Employee Id"
          helperText={msg.eid}
          value={user.eid}
          onChange={handleChange}
          onBlur={validate}
          name="eid"
        />
        <Button disabled={err.password && err.username} variant="contained" type='submit'>Submit</Button>
      </div>
      </Box>
    </div>
  )
}

export default Register