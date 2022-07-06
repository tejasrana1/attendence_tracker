import React from 'react'
import { Grid } from '@mui/material'


const Main = () => {
  return (
    <div className='main'>
         <Grid container spacing={0}>
  <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#54BAB9", color: "white"}}>
            <p className="cardHeading">Total Users</p>
        </div>
  </Grid>
      <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#53BF9D", color: "white"}}>
        <p className="cardHeading">Active Users</p>

        </div>
  </Grid>
  <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#F94C66", color: "white"}}>
        <p className="cardHeading">Inactive Users</p>
        </div>
  </Grid>
  <Grid item xs={8} md={6}>
        <div className="card" style={{background: "#839AA8", color: "white"}}>
        <p className="cardHeading">Deleted Users</p>

        </div>
  </Grid>
      </Grid>
    </div>
  )
}

export default Main