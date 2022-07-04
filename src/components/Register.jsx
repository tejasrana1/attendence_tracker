import React, { useEffect, useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import {
  passwordReGex,
  usernameReGex,
  nameReGex,
  phoneReGex,
  emailReGex,
} from "./reGex";
import { login, selectUser } from "../store/userSlice";
import TransitionAlerts from "./Alert";
import $ from "jquery"
import bcrypt from "bcryptjs";


const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    eid: "",
    phone: "",
    password: "",
    cpass: "",
  });
  const [err, setErr] = useState({
    name: false,
    email: false,
    eid: false,
    phone: false,
    password: false,
    cpass: false,
  });
  const [msg, setMsg] = useState({
    name: "",
    email: "",
    eid: "",
    phone: "",
    password: "",
    cpass: "",
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
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(user.password,salt)
        window.alert("hi");
        console.log(user);
        return $.post("http://localhost:8080/user",{
          name: user.name,
          email: user.email,
          eid: user.eid,
          phone: user.phone,
          password: hash,
        })
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
    if (e.target.name === "password") {
      if (!passwordReGex.test(user.password)) {
        setErr((prev) => {
          return {
            ...prev,
            password: true,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            password: "Password Validation Failed",
          };
        });
      } else {
        setErr((prev) => {
          return {
            ...prev,
            password: false,
          };
        });
        setMsg((prev) => {
          return {
            ...prev,
            password: "",
          };
        });
      }
      validatecpass();
    }
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
  function validatecpass() {
    if (user.password !== user.cpass) {
      setErr((prev) => {
        return {
          ...prev,
          cpass: true,
        };
      });
      setMsg((prev) => {
        return {
          ...prev,
          cpass: "Password doesn't match",
        };
      });
    } else {
      setErr((prev) => {
        return {
          ...prev,
          cpass: false,
        };
      });
      setMsg((prev) => {
        return {
          ...prev,
          cpass: "",
        };
      });
    }
  }
  return (
    <div>
      {alert && <TransitionAlerts setAlert={setAlert} alert={alert}>Fill the form correctly.</TransitionAlerts>}
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
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
            onFocus={()=>{(alert === true) && setAlert(false)}}
          />
          <TextField
            error={err.password}
            id="outlined-error-helper-text"
            type="password"
            label="Password"
            helperText={msg.password}
            value={user.password}
            onChange={handleChange}
            onBlur={validate}
            name="password"
            required
            onFocus={()=>{(alert === true) && setAlert(false)}}
          />
          <TextField
            error={err.cpass}
            id="outlined-error-helper-text"
            type="password"
            label="Confirm Password"
            helperText={msg.cpass}
            value={user.cpass}
            onChange={handleChange}
            onBlur={validatecpass}
            name="cpass"
            required
            onFocus={()=>{(alert === true) && setAlert(false)}}
          />
          <br />
          <Button
            disabled={err.password && err.username}
            variant="contained"
            type="submit">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Register;
