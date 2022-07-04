import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
    const [value, onChange] = useState(new Date());
    function change(v,e){
        onChange(v)
        e.target.style.backgroundColor = 'salmon';
    }
  return (
    <div> <Calendar onChange={change} value={value} /></div>
  )
}

export default CustomCalendar