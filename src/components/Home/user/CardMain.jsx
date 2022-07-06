import { Button } from '@mui/material';
import React, { useState,useEffect, useCallback } from 'react'
import $ from "jquery"
import { selectUser } from '../../../store/userSlice';
import { useSelector } from 'react-redux';


const JoinSession = () => {
  const user = useSelector(selectUser)
  let [seconds,setSeconds] = useState("00")
  let [minutes,setMinutes] = useState("00")
  let [hours,setHours] = useState("00")
  let [counter,setCounter] = useState(0)
  let [isActive, setIsActive] = useState(false)
  let time = Date.now()
  const [shiftOver,setShiftOver] = useState(false)
  useEffect(()=>{
    console.log(Date(time).toString());
    $.get("http://localhost:8080/time",(res,err)=>{
      if(String(new Date(res[0].date).toString().slice(4,15)) === String(new Date().toString().slice(4,15)))
      if(res[0]?.signOut){
        setShiftOver(true)
        return console.log("dndndn");
      }
      if(String(new Date(res[0].date).toString().slice(4,15)) === String(new Date().toString().slice(4,15)))
      if(res[0]?.signIn){
      setCounter((time-res[0].signIn)/1000);
      setIsActive(true)
      }
    })
  },[])
  const d = new Date();
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = weekday[d.getDay()];
  let date = d.toUTCString().slice(5, 16);
  
  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = Math.round(counter % 60);
        const minuteCounter = (counter>3600) ? (Math.floor(counter / 60)%(60* Math.floor(counter/3600))) : (Math.floor(counter/60)) ;
        const hourCounter = Math.floor(counter/3600)

        const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
        const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
        const computedHour = String(hourCounter).length === 1 ? `0${hourCounter}`: hourCounter;

        setSeconds(computedSecond);
        setMinutes(computedMinute);
        setHours(computedHour)

        setCounter(counter => counter + 1);
      }, 1000)
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter])


  
  async function hii(){
    if(!isActive){
      console.log("hi");
      $.post("http://localhost:8080/time", {
      eid: user.user.eid,
      signIn: Date.now(),
      date: date,
      status: "W",
    },(res,err)=>{
      console.log(res);
    })
    }
    else{
      var itms = await $.get("http://localhost:8080/time/")
      itms = await itms.filter(itm=> itm.eid === user.user.eid)
      var itm = await itms.filter((itm) => {
        console.log(String(new Date(itm.date)));
        console.log(String(new Date().toString()));
        return (String(new Date(itm.date)).slice(4,15)) === String(new Date().toString()).slice(4,15)
      })
      itm = itm[0]
      console.log(itms);
      console.log(itm);
      itm.signOut = await Date.now()
      console.log((itm.signOut-itm.signIn)/(1000*3600));
      itm.totalHours = Math.floor((itm.signOut-itm.signIn)/(1000*60*60))
      itm.status = (itm.totalHours>=8) ? "P" : "A";
      $.ajax({
        url: "http://localhost:8080/time/1",
        type: 'PUT',
        data: itm,
        success: (data) => {
          console.log(data);
        }
      });
      setShiftOver(true)
    }
  }
  return (<>
    { !shiftOver ? <div className='card' style={{
      width: "300px",
      height: "200px"
    }}>
      <p className='cardHeading'>
      {date}
      </p>
      <p className='cardInfo'>{day}</p>
      <p className='cardMain'>{hours} : {minutes} : {seconds} </p>
      <Button variant="contained" style={{width: "110px",marginLeft: "100%",marginTop: "15px", transform: "translateX(-120%)"}} onClick={async()=>{await setIsActive(!isActive); hii() }}>{!isActive ?  "Sign In": "Sign Out"}</Button>
    </div> : 
  <div className='card'>
  <h1>shiftOver</h1></div>}</>
  )
}

export default JoinSession