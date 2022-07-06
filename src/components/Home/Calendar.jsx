import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./calendar.css";
import { selectAttendance,selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';


const CustomCalendar = () => {
  const attd = useSelector(selectAttendance)
  const user = useSelector(selectUser)
  useEffect(()=>{
    console.log(attd);
    const doc = document.querySelectorAll("abbr")
    doc.forEach((itm)=>{
      attd.forEach(arrd=>{
        console.log(user.user);
        console.log(arrd);
        if(user.user.eid === arrd.eid)
        if(String( new Date(itm.getAttribute("aria-label"))) === String(new Date(arrd.date))){
          if(arrd.status === "P")
          itm.classList.add("present")
          if(arrd.status === "A")
          itm.classList.add("absent")
          if(arrd.status === "L")
          itm.classList.add("leave")
          // console.log(true);
        }
      })
      
    })
    // console.log(doc[8].getAttribute("aria-label"));
  },[])
    const [date, setDate] = useState(new Date());
  return (
    <div className='card'> <Calendar onClickDay={(v,e)=>{console.log(e.target);}} onChange={setDate} value={date} /></div>
  )
}

export default CustomCalendar