import "./styles.css";
import React from "react";
import ClockControls from "./components/ClockControls.js";
import MoonProto from "./components/MoonProto";

export default function App() {
  return (
    <div className="App">
      <MoonProto />
      <ClockControls debug={false} clockStyle={2}/>
    </div>
  );
}
