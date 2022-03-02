import React, { useRef, useEffect } from "react";

const UseCanvas = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);
  let frameCount = 0;
  let animationFrameId;
  const heightRatio = 0.6;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * heightRatio;

    //Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  return <canvas ref={canvasRef} />;
};

export default UseCanvas;
