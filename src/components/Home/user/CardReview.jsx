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
    function getAverageTime(times) {
      var count = times.length
      var timesInSeconds = [];
      // loop through times
      for (var i =0; i < count; i++) {
          // parse
          var pieces = times[i].split(':');
          var ampm = pieces[2].split(' ');
          var hrs = Number(pieces[0]);
          var mins = Number(pieces[1]);
          var secs = Number(ampm[0]);
          var ampm = ampm[1];
          // convert to 24 hr format (military time)
          if (ampm == 'PM') hrs = hrs + 12;   
          // find value in seconds of time
          var totalSecs = hrs * 60 * 60;
          totalSecs += mins * 60;
          totalSecs += secs;
          // add to array
          timesInSeconds[i] = totalSecs;
      }
      // find average timesInSeconds
      var total = 0;
      // console.log(timesInSeconds);
      for (var j =0; j < count; j++) {
          total = total + Number(timesInSeconds[j]);
      }
      var avg = Math.round(total / count);
      // console.log('avg secs: '+avg);
      // turn seconds back into a time
      var avgMins = Math.floor(avg/60);
      var avgSecs = avg - (60 * avgMins);
      var avgHrs = Math.floor(avgMins/60);
      // console.log('hours: '+avgHrs);
      avgMins = avgMins - (60 * avgHrs);
      // convert back to 12 hr. format
      var avgAmpm = 'AM';
      if (avgHrs > 12) {
          avgAmpm = 'PM';
          avgHrs = avgHrs - 12;
      }
      // add leading zeros for seconds, minutes
      avgSecs = ('0' + avgSecs).slice(-2);
      avgMins = ('0' + avgMins).slice(-2);
      // your answer
      return avgHrs+':'+avgMins+':'+avgSecs+' '+avgAmpm;
  }
  const inTimes = attd.map((at)=>{
    return (new Date(Number(at.signIn)).toString()).slice(16,24)
  })
  let outTimes = attd.filter((at)=>{
    if(at.signOut){
    return (new Date(Number(at.signOut)).toString()).slice(16,24)
  }
  })
  outTimes = outTimes.map((at)=>{
    if(at.signOut){
    return (new Date(Number(at.signOut)).toString()).slice(16,24)
  }
  })
  // console.log(outTimes);
  // console.log(inTimes);
  // execute
  setAsi(getAverageTime(inTimes))
  setAso(getAverageTime(outTimes))
  // console.log(new Date(23844000).toString());
    // console.log(new Date(Number(attd[0].signIn)).toString());
    // console.log(new Date(Number(attd[0].signIn%(24*60*60*1000))).toString());
    let calcawh=0,calcao=0,calcasi=0,calcaso=0
    attd.forEach((day)=>{
      // console.log(new Date(Number(day.signIn%(24*60*60*1000))).toString());

      if(day.totalHours)
      calcawh+=Number(day.totalHours)
      if(Number(day.totalHours)>8)
      calcao+=Number(day.totalHours)-8
      // console.log(new Date(Number(day.signOut)).toString());
    })
    // console.log();
    calcawh = (calcawh/((attd[attd.length-1]?.totalHours)? attd.length: attd.length-1)).toFixed(2)
    calcao = (calcao/((attd[attd.length-1]?.totalHours)? attd.length: attd.length-1)).toFixed(2)
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