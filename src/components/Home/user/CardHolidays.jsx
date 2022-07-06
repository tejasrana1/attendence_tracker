import React from 'react'
import { holidays } from '../holidays'


const CardHolidays = () => {
  var counter = 0;
  const mappedData = (holiday, ind) => {
    const today = new Date().toString()
    // console.log(ind);
    
    if((new Date(today)) < (new Date(holiday.date))){
      counter++;
      if(counter<4)
    return(
    <div style={{marginBottom: "20px"}}>
        <p className="cardMain" style={{display: "inline-block"}}>{holiday.date}&nbsp;</p>
        <p className="cardInfo" style={{display: "inline-block"}}>{ holiday.day}</p>
        <p className="cardInfo">{holiday.name}</p>
      </div> )}
  }
  return (
    <div className='card' style={{
      width: "300px",
      height: "280px"
    }}>
      <p className="cardHeading" style={{marginBottom: "30px"}}>Upcoming Holidays</p>
      {holidays.map(mappedData)}
    </div>
  )
}

export default CardHolidays