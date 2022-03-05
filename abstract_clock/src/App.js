import "./styles.css";
import React, { useState, useEffect } from "react";
import ClockControls from "./ClockControls.js";

export default function App() {
  return (
    <div className="App">
      <ClockControls debug={false} style={2}/>
    </div>
  );
}
