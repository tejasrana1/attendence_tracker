import React, { useEffect, useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import {
  usernameReGex,
  nameReGex,
  phoneReGex,
  emailReGex,
} from "./reGex";
import { selectUser,login } from "../../../store/userSlice";
import { useSelector,useDispatch } from "react-redux";
import TransitionAlerts from "../../Alert";
import $ from "jquery"
// import bcrypt from "bcryptjs";
// import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch()
    const usr = useSelector(selectUser).user
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    eid: "",
    phone: "",
    role: "",
    password: "",
    id: ""
  });
    useEffect(()=>{
        if(!sessionStorage.getItem("login"))
        navigate("/login")
        async function hii(){
            const hi = await $.get(`http://localhost:8080/user/${usr.id}`)
            setUser({
                name: hi.name,
                email: hi.email,
                eid: hi.eid,
                phone: hi.phone,
                role: hi.role,
                password: hi.password,
                id: hi.id
            })
        }
        hii()
    },[])
  const [err, setErr] = useState({
    name: false,
    email: false,
    eid: false,
    phone: false,
  });
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    eid: "",
    phone: "",
  });
  const [alert,setAlert] = useState(false)
  function handleSubmit(e) {
    e.preventDefault();
    const errRes = Object.values(err);
    const infRes = Object.values(user);
    console.log(errRes);
    console.log(infRes);
    if (!infRes.includes("")) {
      if (!errRes.includes(true)) {
        window.alert("Registered Successfully");
        console.log(user);
        // $.a("http://localhost:8080/user",{
        //   name: user.name,
        //   email: user.email,
        //   eid: user.eid,
        //   phone: user.phone,
        // })
        $.ajax({
            url: `http://localhost:8080/user/${usr.id}`,
            type: 'PUT',
            data: user,
            success: (data) => {
              console.log(data);
            }
          });
        sessionStorage.removeItem("login")
        dispatch(login({}))
    return navigate("/login")

      }
    }
    setAlert(true)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const validate = (e) => {
    if (e.target.name === "eid") {
      if (!usernameReGex.test(user.eid)) {
        setErr((prev) => {
          return {
            ...prev,
            eid: true,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            eid: "Employee Id Validation Failed",
          };
        });
      } else {
        setErr((prev) => {
          return {
            ...prev,
            eid: false,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            eid: "",
          };
        });
      }
    }
    if (e.target.name === "name") {
      if (!nameReGex.test(user.name)) {
        setErr((prev) => {
          return {
            ...prev,
            name: true,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            name: "Name Validation Failed",
          };
        });
      } else {
        setErr((prev) => {
          return {
            ...prev,
            name: false,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            name: "",
          };
        });
      }
    }
    if (e.target.name === "phone") {
      if (!phoneReGex.test(user.phone)) {
        setErr((prev) => {
          return {
            ...prev,
            phone: true,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            phone: "Phone Number Validation Failed",
          };
        });
      } else {
        setErr((prev) => {
          return {
            ...prev,
            phone: false,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            phone: "",
          };
        });
      }
    }
    if (e.target.name === "email") {
      if (!emailReGex.test(user.email)) {
        setErr((prev) => {
          return {
            ...prev,
            email: true,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            email: "Email Validation Failed",
          };
        });
      } else {
        setErr((prev) => {
          return {
            ...prev,
            email: false,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            email: "",
          };
        });
      }
    }
  };
  return (
    <div className="registerContainer">
      {alert && <TransitionAlerts setAlert={setAlert} alert={alert}>Fill the form correctly.</TransitionAlerts>}
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1},
        }}
        noValidate
        autoComplete="off">
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
            required
            onFocus={()=>{(alert === true) && setAlert(false)}}
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
            required
            onFocus={()=>{(alert === true) && setAlert(false)}}
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
            required
            onFocus={()=>{(alert === true) && setAlert(false)}}
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
            required
            disabled
            onFocus={()=>{(alert === true) && setAlert(false)}}
          />
          <br />
          <Button style={{margin: "10px"}} 
          disabled={err.password && err.username} 
          variant="contained" 
          type='submit'>Update&nbsp;</Button>
        </div>
      </Box>
    </div>
  );
};

export default Profile;
