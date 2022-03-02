import { useState, useEffect } from "react";
import UseCanvas from "./useCanvas.js";

function Game() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  const targetSize = window.innerWidth / 20;
  const [speed, setSpeed] = useState(3);
  let currentX = 0;
  let currentY = 0;
  let currentXV = speed;
  let currentYV = speed;

  useEffect(() => {
    console.log(speed);
  });

  const draw = (ctx, frameCount) => {
    setWidthAndHeight(ctx);
    drawBackgrond(ctx);
    checkWalls();
    drawTarget(ctx);
  };

  const setWidthAndHeight = (ctx) => {
    width = ctx.canvas.width;
    height = ctx.canvas.height;
  };

  const drawBackgrond = (ctx) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  };

  const checkWalls = () => {
    //Detect left and right walls
    if (currentX + targetSize >= width) {
      currentX = width - targetSize;
      currentXV = currentXV * -1;
    } else if (currentX <= 0) {
      currentX = 0;
      currentXV = currentXV * -1;
    }

    //Detect top and bottom walls
    if (currentY + targetSize >= height) {
      currentY = height - targetSize;
      currentYV = currentYV * -1;
    } else if (currentY <= 0) {
      currentY = 0;
      currentYV = currentYV * -1;
    }
  };

  const drawTarget = (ctx) => {
    ctx.fillStyle = "white";
    ctx.fillRect(currentX, currentY, targetSize, targetSize);
    ctx.fill();

    //update location
    currentX = currentX + currentXV;
    currentY = currentY + currentYV;
  };

  return (
    <div>
      <UseCanvas draw={draw} />
      <SpeedControl speed={speed} setSpeed={setSpeed} />
    </div>
  );
}

const SpeedControl = (props) => {
  const handleChange = (e) => {
    props.setSpeed(e.target.value);
  };

  return (
    <div>
      <p>Speed</p>
      <input
        type="number"
        name="speed"
        min="1"
        max="5"
        value={props.speed}
        onChange={handleChange}
      />
    </div>
  );
};

export default Game;
