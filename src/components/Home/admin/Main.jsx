import React from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectData,selectAttendance } from '../../../store/adminSlice'
import { useEffect } from 'react'
import { useState } from 'react'


const Main = () => {
      const data = useSelector(selectData)
      const attendance = useSelector(selectAttendance)
      let [activeUsers, setActiveUsers] = useState(0)
      let [inactiveUsers, setInactiveUsers] = useState(0)
      let [users, setUsers] = useState(0)
      let [deletedUsers, setDeletedUsers] = useState(0)
      useEffect(()=>{
            console.log("hii");
            let du=0,au=0
                  data.forEach((dt)=>{
                        if(dt.status === "deleted"){
                        du++
                        console.log(dt);}
                        else{
                              console.log(dt);
                              au++
                        }
                  })
                  setDeletedUsers(du)
                  setUsers(au)
                  let today = new Date()
                  let todayAt =  attendance.filter((at)=> (new Date(at.date)).toString().slice(4,15) === today.toString().slice(4,15))
                  setActiveUsers(todayAt.length)
                  console.log(users+""+activeUsers);
                  setInactiveUsers(au-todayAt.length)
      },data)
  return (
    <div className='main'>
      <button onClick={()=>{
            console.log(data);
            console.log(attendance)
      }}>{users}</button>
         <Grid container spacing={0}>
  <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#54BAB9", color: "white"}}>
            <p className="cardHeading">Total Users: {users}</p>
        </div>
  </Grid>
      <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#53BF9D", color: "white"}}>
        <p className="cardHeading">Active Users: {activeUsers}</p>

        </div>
  </Grid>
  <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#F94C66", color: "white"}}>
        <p className="cardHeading">Inactive Users: {inactiveUsers}</p>
        </div>
  </Grid>
  <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#839AA8", color: "white"}}>
        <p className="cardHeading">Deleted Users: {deletedUsers}</p>

        </div>
  </Grid>
      </Grid>
    </div>
  )
}

export default Main