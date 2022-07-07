import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAttendance } from '../../../store/userSlice'
const CardReview = () => {
  const attd = useSelector(selectAttendance)
  const [awh,setAwh] = useState(0)
  const [ao,setAo] = useState(0);
  const [asi,setAsi] = useState("")
  const [aso,setAso] = useState("")
  useEffect(()=>{
    let calcawh=0,calcao=0,calcasi=0,calcaso=0
    attd.forEach((day)=>{
      calcasi+=Number(day.signIn)
      calcaso+=Number(day.signOut)
      calcawh+=Number(day.totalHours)
      if(Number(day.totalHours)>8)
      calcao+=Number(day.totalHours)-8
      console.log(new Date(Number(day.signOut)).toString());
    })
    console.log(calcasi);
    calcasi = new Date(Math.floor(calcasi/attd.length)).toString()
    calcaso = new Date(Math.floor(calcaso/attd.length)).toString()
    setAsi(calcasi.slice(15,21))
    setAso(calcaso.slice(15,21))
    calcawh = (calcawh/attd.length).toFixed(2)
    calcao = (calcao/attd.length).toFixed(2)
    setAwh(calcawh)
    setAo(calcao)
    
  },[])
  return (
    <div className='card' style={{
      width: "300px",
      height: "200px"
    }}>
      <p className="cardHeading">Statistics</p><div>
      <p className="cardMain" style={{display: "inline-block"}}>Average work hours: </p>
      <p className="cardInfo" style={{display: "inline-block"}}>&nbsp;&nbsp;{awh} hours</p></div>
      <div>
      <p className="cardMain" style={{display: "inline-block"}}>Average Sign In time: </p>
      <p className="cardInfo" style={{display: "inline-block"}}>&nbsp;&nbsp;{asi}</p></div>
      <div>
      <p className="cardMain" style={{display: "inline-block"}}>Average Sign Out time: </p>
      <p className="cardInfo" style={{display: "inline-block"}}>&nbsp;&nbsp;{aso}</p></div>
      <div>
      <p className="cardMain" style={{display: "inline-block"}}>Average Overtime: </p>
      <p className="cardInfo" style={{display: "inline-block"}}>&nbsp;&nbsp;{ao} hours</p></div>
    </div>
    
  )
}

export default CardReview