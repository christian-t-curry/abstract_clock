import React, { useEffect, useCallback } from "react";

export default function ClockUI(props) {
  //clock style 1

  const draw = useCallback(() => {
    let size = props.size * 2;

    let outerLineWidth = size / 180;
    let outerLineLength = 80;

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
        ((360 / 1000) * ((props.click % 1000) + outerLineLength) * Math.PI) /
          180 -
        0.5 * Math.PI;
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.lineWidth = outerLineWidth;
      ctx.arc(
        size / 2,
        size / 2,
        size / 2 - outerLineWidth / 2,
        ((360 / 1000) * (props.click % 1000) * Math.PI) / 180 - 0.5 * Math.PI,
        lead
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
  if (props.isWider) {
    return (
      <div id="clockWrapper">
        <canvas class="wideClock" id="clock" > </canvas>
      </div>
    );
  } else {
    return (
      <div id="clockWrapper">
        <canvas class="tallClock" id="clock" > </canvas>
      </div>
    );
  }
  
}
