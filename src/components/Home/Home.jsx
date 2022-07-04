import React from 'react';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
import NavBar from './NavBar';
import { Grid } from '@mui/material';
import "./home.css"
import Main from './user/Main';

const Home = () => {
    const user = useSelector(selectUser).user;    
  return (
    <div>
      <Grid container spacing={0}>
        <SideBar></SideBar>
        <div className='mainContainer'>
        <NavBar></NavBar>
        <div className='container'>
          <Main />
        </div>
        </div>
      </Grid>
      
    </div>
  )
}

export default Home