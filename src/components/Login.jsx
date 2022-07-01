import React, { useEffect, useState } from 'react'
import { TextField,Box,Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { passwordReGex, usernameReGex } from './reGex'
import bcrypt from "bcryptjs";


const Login = () => {
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
    useEffect(()=>{
        dispatch(login({
            name: "Tejas"
        }))
    },[])
    function handleSubmit(e){
        e.preventDefault()
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(user.password,salt)
        alert(hash)
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
          error={err.username}
          id="outlined-error-helper-text"
          label="Username"
          helperText={msg.username}
          value={user.username}
          onChange={handleChange}
          onBlur={validate}
          name="username"
        />
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
        />
        <Button disabled={err.password && err.username} variant="contained" type='submit'>Submit</Button>
      </div>
      </Box>
    </div>
  )
}

export default Login