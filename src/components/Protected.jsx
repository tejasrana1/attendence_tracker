import React from 'react'
import { selectUser } from '../store/userSlice'
import { useSelector } from 'react-redux'
import {Route} from "react-router-dom"
const Protected = (props) => {
    const Component = props.element;
  return (
    <div>
        <Route exact={props.exact} to={props.to}>
            <Component />
        </Route>
    </div>
  )
}

export default Protected