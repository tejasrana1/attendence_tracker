import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./calendar.css";
import { selectAttendance,selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';


const CustomCalendar = () => {
  const [info,setInfo] = useState({
    signIn: "-",
    signOut: "-",
    totalHours: "-"
  })
  const attd = useSelector(selectAttendance)
  const user = useSelector(selectUser)
  useEffect(()=>{
    // console.log(attd);
    
    const doc = document.querySelectorAll("abbr")
    doc.forEach((itm)=>{
      // itm.onclick =  (v,e)=>{
      //   console.log(v);
      // }
      // function hii(e)
      // console.log(itm);
      attd.forEach(arrd=>{
        // console.log(user.user);
        // console.log(arrd);
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
    const setInfoDiv = (v)=>{
      attd.forEach((at)=>{
        console.log(new Date(at.date));
        console.log(new Date(v));
        if(new Date(at.date).toString() === new Date(v).toString()){
          // console.log(true);
          setInfo({
            signIn: (at.signIn) ? new Date(Number(at.signIn)).toString().slice(16,24) : "-",
            signOut: (at.signOut) ? new Date(Number(at.signOut)).toString().slice(16,24) : "-",
            totalHours: (at.totalHours) ? at.totalHours : "-"
          })
          console.log(info);
        }
      })
    }
  return (
    <div> 
    <Calendar onClickDay={setInfoDiv} onChange={setDate} value={date} />
    <div className="calendarInfo">
      
      <p>{info.signIn}</p>
      <p>{info.signOut}</p>
      <p>{info.totalHours}</p>
    </div>
    </div>
  )
}

export default CustomCalendar