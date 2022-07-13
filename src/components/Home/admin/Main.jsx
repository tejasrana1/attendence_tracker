import React from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectData,selectAttendance } from '../../../store/adminSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import ProfileCard from './ProfileCard'


const Main = () => {
      const data = useSelector(selectData)
      const attendance = useSelector(selectAttendance)
      let [activeUsers, setActiveUsers] = useState(0)
      let [inactiveUsers, setInactiveUsers] = useState(0)
      let [users, setUsers] = useState(0)
      let [deletedUsers, setDeletedUsers] = useState(0)
      const [profiles,setProfiles] = useState([])
      useEffect(()=>{
            // console.log("hii");
            let du=0,au=0
                  data.forEach((dt)=>{
                        if(dt.status === "deleted"){
                        du++
                        // console.log(dt);
                  }
                        else{
                              // console.log(dt);
                              au++
                        }
                  })
                  setDeletedUsers(du)
                  setUsers(au)
                  let today = new Date()
                  let todayAt =  attendance.filter((at)=> (new Date(at.date)).toString().slice(4,15) === today.toString().slice(4,15))
                  setActiveUsers(todayAt.length)
                  // console.log(users+""+activeUsers);
                  setInactiveUsers(au-todayAt.length)
      },data)
      function totalUsers(){
                        let dt = data.filter(dt=> dt.status!=="deleted")
            setProfiles(dt)
            console.log(profiles);
      }
      function usersActive(){
            let today = new Date()
                  let todayAt =  attendance.filter((at)=> (new Date(at.date)).toString().slice(4,15) === today.toString().slice(4,15))
                  let dt = []
                  todayAt.forEach((td)=>{
                        data.forEach((d)=>{
                              if(d.eid === td.eid && d.status!=="deleted")
                              dt.push(d)
                        })
                  })
                  setProfiles(dt)
      }
      function usersInactive(){
            let today = new Date()
                  let todayAt =  attendance.filter((at)=> (new Date(at.date)).toString().slice(4,15) === today.toString().slice(4,15))
                  let dt = []
                  todayAt.forEach((td)=>{
                        data.forEach((d)=>{
                              if(d.eid !== td.eid && d.status!=="deleted")
                              dt.push(d)
                        })
                  })
                  setProfiles(dt)
      }
      function usersDeleted(){
            let dt = data.filter(dt=> dt.status==="deleted")
            setProfiles(dt)
            console.log(profiles);
      }
      function mapped(elm){
            return <div className='profileCard'>
                  <p>{elm.eid}</p>
            <p>{elm.name}</p>
            <p>{elm.phone}</p>
            <p>{elm.email}</p>
    
        </div>
      }
  return (
    <div className='main'>
         <Grid container spacing={0}>
  <Grid item xs={8} md={3}>
        <div onClick={totalUsers} name="total" className="card admin" style={{background: "#54BAB9", color: "white"}}>
            <p className="cardHeading">Total Users: {users}</p>
        </div>
  </Grid>
      <Grid item xs={8} md={3}>
        <div onClick={usersActive} className="card admin" style={{background: "#53BF9D", color: "white"}}>
        <p className="cardHeading">Active Users: {activeUsers}</p>

        </div>
  </Grid>
  <Grid item xs={8} md={3}>
        <div onClick={usersInactive} className="card admin" style={{background: "#F94C66", color: "white"}}>
        <p className="cardHeading">Inactive Users: {inactiveUsers}</p>
        </div>
  </Grid>
  <Grid item xs={8} md={3}>
        <div onClick={usersDeleted} className="card admin" style={{background: "#839AA8", color: "white"}}>
        <p className="cardHeading">Deleted Users: {deletedUsers}</p>

        </div>
  </Grid>
      </Grid>
      <div className="adminData">
            {profiles.map(mapped)}
      </div>
    </div>
  )
}

export default Main