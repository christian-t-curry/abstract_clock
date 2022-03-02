import "./styles.css";
import React, { useState, useEffect } from "react";
import ClockControls from "./ClockControls.js";

var time = new Date();
var milSecond = time.getMilliseconds();
var second = time.getSeconds() * 60;
var min = time.getMinutes() * 60 * 60;
var hour = time.getHours();
var startTime = milSecond + second + min;

export default function App() {
  return (
    <div className="App">
      <ClockControls debug={false} startTime={startTime} />
    </div>
  );
}
