import React from "react";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div className="countdownTime">
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <div className="countdownName">
        <span>days</span>
        <span>hours</span>
        <span>mins</span>
        <span>secs</span>
      </div>
    </div>
  );
}

export default function App() {
  var d1 = new Date("December 25, 2022");
  var time = new Date();
  const remainingDayTime = d1.getTime() - time.getTime();
  const seconds = Math.floor(remainingDayTime / 1000);
  // 
  time.setSeconds(time.getSeconds() + seconds);
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
