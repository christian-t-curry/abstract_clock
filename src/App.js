import "./styles.css";
import React, { useState, useEffect, useCallback } from "react";
import Game from "./game.js";
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

function Clock(props) {
  const draw = useCallback(() => {
    let size = 1800;

    let secondHandSize = size / 30;
    let secondHandDistance = size - secondHandSize;

    let minuteHandSize = secondHandSize * 2;
    let minuteHandDistance = size - secondHandSize * 2 - minuteHandSize;

    let hourHandSize = minuteHandSize * (Math.PI / 2);
    let hourHandDistance = size / 2 - secondHandSize * 2 - minuteHandSize;

    let can = document.getElementById("clock");
    let ctx = can.getContext("2d");
    ctx.canvas.width = size;
    ctx.canvas.height = size;

    //This is the spinning outer ring
    drawRing(ctx);

    //Spinning dot is annoying ish
    //It Matches the spinning ring but seems excessive
    //drawSpinningDot(ctx);

    drawSecondHand(ctx);
    drawMinuteHand(ctx);
    drawHourHand(ctx);

    function drawRing(ctx) {
      let lead =
        ((360 / 1000) * (props.click % 1000) * Math.PI) / 180 +
        100 -
        0.5 * Math.PI;
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(
        size / 2,
        size / 2,
        size / 2 - 1,
        lead,
        ((360 / 1000) * (props.click % 1000) * Math.PI) / 180 - 0.5 * Math.PI
      );
      ctx.stroke();
    }

    function drawSpinningDot(ctx) {
      let xClick =
        (size / 2 - size / 10) *
          Math.cos(
            ((360 / 1000) * (props.click % 1000) * Math.PI) / 180 -
              0.5 * Math.PI
          ) +
        size / 2;
      let yClick =
        (size / 2 - size / 10) *
          Math.sin(
            ((360 / 1000) * (props.click % 1000) * Math.PI) / 180 -
              0.5 * Math.PI
          ) +
        size / 2;
      ctx.beginPath();
      ctx.arc(xClick, yClick, size / 20, 0, 2 * Math.PI * (size / 10));
      ctx.fill();
    }

    function drawSecondHand(ctx) {
      let xSec =
        (size / 2 - secondHandDistance) *
          Math.cos(
            ((360 / 1000) * (props.click / 60) * Math.PI) / 180 + 0.5 * Math.PI
          ) +
        size / 2;
      let ySec =
        (size / 2 - secondHandDistance) *
          Math.sin(
            ((360 / 1000) * (props.click / 60) * Math.PI) / 180 + 0.5 * Math.PI
          ) +
        size / 2;

      ctx.beginPath();
      ctx.arc(xSec, ySec, secondHandSize, 0, 2 * Math.PI * secondHandSize);
      ctx.fill();
    }

    function drawMinuteHand(ctx) {
      let xMin =
        (size / 2 - minuteHandDistance) *
          Math.cos(
            ((360 / 1000) * (props.click / 3600) * Math.PI) / 180 +
              0.5 * Math.PI
          ) +
        size / 2;
      let yMin =
        (size / 2 - minuteHandDistance) *
          Math.sin(
            ((360 / 1000) * (props.click / 3600) * Math.PI) / 180 +
              +0.5 * Math.PI
          ) +
        size / 2;

      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(xMin, yMin, minuteHandSize, 0, 2 * Math.PI * minuteHandSize);
      ctx.fill();
      ctx.fillStyle = "black";
    }

    function drawHourHand(ctx) {
      let hourClick = props.hour % 12;
      let hourRads = ((hourClick + props.click / 3600000) * 30 * Math.PI) / 180;
      let xHour =
        size / 2 +
        Math.cos(hourRads - Math.PI * 0.5) * hourHandDistance -
        hourHandSize / 2;
      let yHour =
        size / 2 +
        Math.sin(hourRads - Math.PI * 0.5) * hourHandDistance -
        hourHandSize / 2;

      ctx.beginPath();
      var hourDotCenterX = xHour + hourHandSize / 2;
      var hourDotCenterY = yHour + hourHandSize / 2;
      ctx.translate(hourDotCenterX, hourDotCenterY);
      ctx.rotate(hourRads + (45 * Math.PI) / 180);
      ctx.translate(-hourDotCenterX, -hourDotCenterY);
      ctx.fillRect(
        xHour + hourHandSize / 2,
        yHour + hourHandSize / 2,
        hourHandSize,
        hourHandSize
      );
    }
  }, [props.click, props.hour]);

  useEffect(() => {
    draw();
  }, [draw]);

  /*
  function draw() {
    let can = document.getElementById("clock");
    let ctx = can.getContext("2d");
    ctx.canvas.width = size;
    ctx.canvas.height = size;

    //This is the spinning outer ring
    drawRing(ctx);

    //Spinning dot is annoying ish
    //It Matches the spinning ring but seems excessive
    //drawSpinningDot(ctx);

    //This is the second hand dot that goes 360 every minute
    drawSecondHand(ctx);

    drawMinuteHand(ctx);

    drawHourHand(ctx);
  }

  */

  return (
    <div>
      <canvas id="clock"> </canvas>
    </div>
  );
}
