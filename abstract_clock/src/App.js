import "./styles.css";
import React, { useState, useEffect } from "react";
import ClockControls from "./ClockControls.js";

let w = window.innerWidth;
let h = window.innerHeight;
let padding = 20;
let size; 
let isWider;

function getSize() {
  if (h>w){
    size = w - padding;
    isWider = false;
  } else{
    size = h - padding;
    isWider = true;
  }
}

getSize(); 

export default function App() {
  return (
    <div className="App">
      <ClockControls debug={false} size={size} isWider={isWider}/>
    </div>
  );
}
