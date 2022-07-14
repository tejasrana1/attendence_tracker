import React from 'react'
import { IconButton,Menu,MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className='navbar'>
      <p className='navbarText'>Welcome {user?.user?.name}</p>
    <div className='account'>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link style={{textDecoration: "none",color: "black"}} to="/profile">Profile</Link></MenuItem>
                <MenuItem onClick={()=>{
                  handleClose()
                  sessionStorage.removeItem("login")
                  return navigate("/login")
                }}>Logout</MenuItem>
              </Menu>
            </div>
    </div>
  )
}

export default NavBar