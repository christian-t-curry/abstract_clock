import React, { useEffect, useState, useCallback } from "react";

export default function ClockUI(props) {
  let clockClass = "error"
  if(props.isWider) {
    clockClass = "wideClock"
  } else {
    clockClass = "tallClock"
  }

  const [clockStyle, setClockStyle] = useState(1);

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

    if(clockStyle == 1 ) {
      //This is the spinning outer ring
      drawRing(ctx);

      //Spinning dot is annoying ish
      //It Matches the spinning ring but seems excessive
      //drawSpinningDot(ctx);

      drawSecondHand(ctx);
      drawMinuteHand(ctx);
      drawHourHand(ctx);

    } else {
      drawBouncingClicks(ctx);
      drawBouncingSeconds(ctx);
      drawBouncingMins(ctx);
      drawBouncingHours(ctx);
    }

    function drawBouncingClicks(ctx) {
      let dotSize = size/20;
      let rads = (Math.PI * 2)/(1000) * (props.click%1000) - 0.5 * Math.PI;
      let dotY = (Math.sin(rads) * (size / 2 - dotSize) ) + size/2 ;
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, dotSize * 2, size);
      ctx.fillStyle = "white";
      ctx.arc(dotSize, dotY , dotSize, 0, 6.2);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.strokeRect(0,0,8*dotSize,size);
    }

    function drawBouncingSeconds(ctx) {
      let dotSize = size/20;
      let rads = (Math.PI * 2)/(60*1000) * (props.click%(60*1000)) - 0.5 * Math.PI;
      let dotY = (Math.sin(rads) * (size / 2 - dotSize) ) + size/2 ;
      for(var i = 0; i <=30; i++) {
        let edgeAdjust = 0;
        let sinAdjust = Math.sin((Math.PI * 2)/30 * i -  Math.PI) * ((size - dotSize  )/30);
        if(i === 0) {
          edgeAdjust = 1;
        } else if (i ===30) {
          edgeAdjust = -1;
        }
        ctx.moveTo(2*dotSize, i*((size - 2 * dotSize)/30)+edgeAdjust+sinAdjust + dotSize);
        ctx.lineTo(6*dotSize, i*((size - 2 * dotSize)/30)+edgeAdjust+sinAdjust + dotSize);
        ctx.stroke();
      }
      if (rads < .5 *Math.PI) {
        ctx.fillStyle="white";
        ctx.fillRect(2*dotSize, dotY, 2*dotSize, size-dotY - 1);
        ctx.fillStyle="black";
      } else {
        ctx.fillStyle="white";
        ctx.fillRect(2*dotSize, 1, 2*dotSize, dotY);
        ctx.fillStyle="black";
      }
      ctx.beginPath();
      ctx.arc(dotSize + 2*dotSize, dotY , dotSize, 0, 6.2);
      ctx.fill();
    }

    function drawBouncingMins(ctx) {
      let dotSize = size/20;
      let rads = (Math.PI * 2)/(60*60*1000) * (props.click%(60*60*1000)) - 0.5 * Math.PI;;
      let dotY = (Math.sin(rads) * (size / 2 - dotSize) ) + size/2 ;
      if (rads < .5 *Math.PI) {
        ctx.fillStyle="white";
        ctx.fillRect(4*dotSize, dotY, 2*dotSize, size-dotY - 1);
        ctx.fillStyle="black";
      } else {
        ctx.fillStyle="white";
        ctx.fillRect(4*dotSize, 1, 2*dotSize, dotY);
        ctx.fillStyle="black";
      }
      ctx.beginPath();
      ctx.arc(dotSize + 4*dotSize, dotY , dotSize, 0, 6.2);
      ctx.fill();
      
    }

    function drawBouncingHours(ctx) {
      let dotSize = size/20;
      let rads = (Math.PI * 2)/(24) * (props.hour) - 0.5 * Math.PI;
      let dotY = (Math.sin(rads) * (size / 2 - dotSize) ) + size/2 ;
      for(var i = 0; i <=12; i++) {
        let edgeAdjust = 0;
        let sinAdjust = Math.sin((Math.PI * 2)/12 * i -  Math.PI) * (size/12);
        if(i === 0) {
          edgeAdjust = 1;
        } else if (i === 12) {
          edgeAdjust = -1;
        }
        ctx.moveTo(6*dotSize, i*((size - 2 * dotSize)/12)+edgeAdjust+sinAdjust+dotSize);
        ctx.lineTo(8*dotSize, i*((size - 2 * dotSize)/12)+edgeAdjust+sinAdjust+dotSize);
        ctx.stroke();
        
      }
      if (rads < .5 *Math.PI) {
        ctx.fillStyle="white";
        ctx.fillRect(6*dotSize, dotY, 2*dotSize, size-dotY);
        ctx.fillStyle="black";
      } else {
        ctx.fillStyle="white";
        ctx.fillRect(6*dotSize, 0, 2*dotSize, dotY);
        ctx.fillStyle="black";
      }
      ctx.beginPath();
      ctx.arc(dotSize + 6*dotSize, dotY , dotSize, 0, 6.2);
      ctx.fill();
     
    }

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

    /* 
    // Deprecating for now 

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

    */

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
  }, [props.click, props.hour, clockStyle, props.size]);

  useEffect(() => {
    draw();
  }, [draw]);

  function handleStyleChange(e){
    setClockStyle(e.target.value);
  }

  return (
    <div id="mainInterface" >
      <select name="Clock Style" onChange={handleStyleChange}>
        <option value="1">Abstract</option>
        <option value="2">Bouncing</option>
      </select>
      <div id="clockWrapper">
        <canvas className={clockClass} id="clock" > </canvas>
      </div>
    </div>

  );
  
  
}
