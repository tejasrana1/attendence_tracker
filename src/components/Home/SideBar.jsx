import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userSlice'


const SideBar = () => {
  const user = useSelector(selectUser).user
  console.log(user);
  return (
    <div className="sidebar">
        {(user.role==="admin")&&<NavLink activeClassName="active" to="/admin/main"><p>Dashboard</p></NavLink>}
        <NavLink activeClassName="active" to="/"><p>Main</p></NavLink>
        <NavLink activeClassName="active" to="/calendar"><p>Calendar</p></NavLink>
    </div>
  )
}

export default SideBar