import { Button } from '@mui/material';
import React, { useState,useEffect, useCallback } from 'react'
import $ from "jquery"


const JoinSession = () => {

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
      if(res[0]?.signOut){
        setShiftOver(true)
        return alert("Today's shift is already over")
      }
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
      signIn: Date.now(),
      date: date,
      status: "W",
    })
    }
    else{
      var itm = await $.get("http://localhost:8080/time/1")
      itm.signOut = await Date.now()
      console.log((itm.signOut-itm.signIn)/(1000*3600));
      itm.totalHours = Math.floor((itm.signOut-itm.signIn)/(1000*60*60))
      itm.status = (itm.totalHours>=8) ? "P" : "A";
      $.ajax({
        url: "http://localhost:8080/time/1",
        type: 'PUT',
        data: itm,
        success: (data) => {
          alert('Load was performed.');
        }
      });
      setShiftOver(true)
    }
  }
  return (<>
    { !shiftOver ? <div className='card'>
      {date} <br />
      {day} <br /> <br />
      {hours} : {minutes} : {seconds} <br />
      <Button onClick={async()=>{await setIsActive(!isActive); hii() }}>{!isActive ?  "Sign In": "Sign Out"}</Button>
    </div> : 
  <div className='card'>
  <h1>shiftOver</h1></div>}</>
  )
}

export default JoinSession