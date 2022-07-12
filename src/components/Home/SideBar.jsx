import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="sidebar">
        <NavLink activeClassName="active" to="/"><p>Main</p></NavLink>
        <NavLink activeClassName="active" to="/calendar"><p>Calendar</p></NavLink>
    </div>
  )
}

export default SideBar