import "./styles.css";
import React from "react";
import ClockControls from "./ClockControls.js";

export default function App() {
  return (
    <div className="App">
      <ClockControls debug={false} clockStyle={2}/>
    </div>
  );
}
