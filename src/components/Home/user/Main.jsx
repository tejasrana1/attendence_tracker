import React, {useEffect} from 'react'
import Calendar from "../Calendar"
import CardMain from './CardMain'
import CardReview from './CardReview'
import CardHolidays from './CardHolidays'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const Main = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!sessionStorage.getItem("login"))
        navigate("/login")
  },[])
  return (
    <div className='main'>
      <Grid container spacing={0}>
  <Grid item xs={8} md={6} lg={4}>
        <CardReview />
  </Grid>
      <Grid item xs={8} md={6} lg={4}>
        <CardMain />
  </Grid>
  <Grid item xs={8} md={6} lg={4}>
        <CardHolidays />
  </Grid>
      </Grid>
    </div>
  )
}

export default Main