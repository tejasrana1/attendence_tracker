import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./calendar.css";
import { selectAttendance,selectUser } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CustomCalendar = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!sessionStorage.getItem("login"))
        navigate("/login")
  },[])
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
        console.log();
        console.log()
        console.log();
        if(new Date(itm.getAttribute("aria-label")).toString().slice(4,16)<(new Date().toString()).slice(4,16))
        itm.classList.add("absent")
        // if(user.user.eid === arrd.eid)
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
      // console.log();
      // console.log();
      const color = new Date(v).toString().slice(4,16)>(new Date().toString()).slice(4,16);
      if(color)
      setInfo({
        signIn: "Not Yet Available",
        signOut: "Not Yet Available",
        totalHours: "Not Yet Available"
      })
      else
      setInfo({
        signIn: "Absent",
        signOut: "Absent",
        totalHours: "Absent"
      })
      attd.forEach((at)=>{
        // console.log(new Date(at.date));
        // console.log(new Date(v));
        if(new Date(at.date).toString() === new Date(v).toString()){
          // console.log(true);
          setInfo({
            signIn: (at.signIn) ? new Date(Number(at.signIn)).toString().slice(16,24) : "-",
            signOut: (at.signOut) ? new Date(Number(at.signOut)).toString().slice(16,24) : "-",
            totalHours: (at.totalHours) ? at.totalHours : "-"
          })
          return console.log(info);
        }
      })
    }
  return (
    <div> 
    <Calendar onClickDay={setInfoDiv} onChange={setDate} value={date} />
    <div className="calendarInfo">
      <p style={{marginLeft: "20px"}} className='cardMain'>Sign In: <p style={{display: "inline-block",margin: "3px"}}>{info.signIn}</p></p>
      <p style={{marginLeft: "20px"}} className='cardMain'>Sign Out: <p style={{display: "inline-block",margin: "3px"}}>{info.signOut}</p></p>
      <p style={{marginLeft: "20px"}} className='cardMain'>Total Hours: <p style={{display: "inline-block",margin: "3px"}}>{info.totalHours}</p></p>
    </div>
    </div>
  )
}

export default CustomCalendar