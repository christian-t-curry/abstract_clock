import "./styles.css";
import React, { useState, useEffect } from "react";
import Clock from "./Clock.js";

var time = new Date();
var milSecond = time.getMilliseconds();
var second = time.getSeconds() * 60;
var min = time.getMinutes() * 60 * 60;
var hour = time.getHours();
var startTime = milSecond + second + min;

export default function App() {
  return (
    <div className="App">
      <Sim debug={false} startTime={startTime} />
    </div>
  );
}

function Sim(props) {
  const [click, setClick] = useState(props.startTime);
  const [hour, setHour] = useState(0);
  const [hourMod, setHourMod] = useState(0);

  function getTime() {
    var time = new Date();
    var milSecond = time.getMilliseconds();
    var second = time.getSeconds() * 1000;
    var min = time.getMinutes() * 60 * 1000;
    var startTime = milSecond + second + min;
    setClick(startTime);
    setHour(time.getHours() + hourMod);
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      getTime();
    }, 1000 / 60);
    return () => {
      clearTimeout(timer);
    };
  }, [click]);

  if (props.debug) {
    return (
      <div>
        <div>
          <h1>Seconds {new Date().getSeconds()}</h1>
          <h2>Hour {hour % 12}</h2>
        </div>
        <div>
          <Clock click={0} hour={0} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Clock click={click} hour={hour} />
        </div>
      </div>
    );
  }
}
