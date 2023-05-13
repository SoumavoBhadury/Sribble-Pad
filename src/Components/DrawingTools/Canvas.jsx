import { clear } from "@testing-library/user-event/dist/clear";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

// import { useOnDraw } from "./Hooks";

export default function Canvas({ width, height}) {
  const [color, setColor] = useState('#000000');
  // const canvasRef = useOnDraw(color);

  // function useOnDraw(color) {
  //   const isDrawingRef = useRef(false);
  //   const canvasRef = useRef(null);
  //   const prePointRef = useRef(null);

  //   const setCanvasRef = (ref) => {
  //     if (!ref) return;
  //     canvasRef.current = ref;
  //     initMouseMoveListener();
  //     initMouseDownListener();
  //     initMouseUpListener();
  //   };

  //   const onDraw = (ctx, point, prePoint) => {
  //     drawLine(prePoint, point, ctx, color, 5);
  //   };

  //   const drawLine = (start, end, ctx, color, width) => {
  //     start = start ?? end;
  //     ctx.beginPath();
  //     ctx.strokeStyle = color;
  //     ctx.lineWidth = width;
  //     ctx.moveTo(start.x, start.y);
  //     ctx.lineTo(end.x, end.y);
  //     ctx.stroke();
  //     console.log(ctx.fillStyle);

  //     ctx.fillStyle=color;
  //     ctx.beginPath();
  //     ctx.arc(start.x,  start.y, 2, 0, 2*Math.PI);
  //     ctx.fill();
  //   };

  //   const initMouseMoveListener = () => {
  //     const mouseMoveListener = (e) => {
  //       if (isDrawingRef.current) {
  //         const point = computePointInCanvas(e.clientX, e.clientY);
  //         const ctx = canvasRef.current.getContext("2d");
  //         if (onDraw) onDraw(ctx, point, prePointRef.current);
  //         prePointRef.current = point;
  //         // console.log(point);
  //       }
  //     };
  //     window.addEventListener("mousemove", mouseMoveListener);
  //   };

  //   const initMouseDownListener = () => {
  //     if (!canvasRef.current) return;
  //     const listener = () => {
  //       isDrawingRef.current = true;
  //     };

  //     canvasRef.current.addEventListener("mousedown", listener);
  //   };
  //   const initMouseUpListener = () => {
  //     if (!canvasRef.current) return;
  //     const upListener = () => {
  //       isDrawingRef.current = false;
  //       prePointRef.current = null;
  //     };
  //     window.addEventListener("mouseup", upListener);
  //   };

  //   const computePointInCanvas = (clientX, clientY) => {
  //     if (canvasRef.current) {
  //       const boundingRect = canvasRef.current.getBoundingClientRect();
  //       return {
  //         x: clientX - boundingRect.left,
  //         y: clientY - boundingRect.top,
  //       };
  //     } else return null;
  //   };

  //   const clear = () => {
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  // }

  //   return setCanvasRef;
  // }
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [mouseDown,setMouseDown] = useState(false);
  const [lastPosition,setPosition] = useState({
      x:0,
      y:0
  })

  useEffect(() => {
    if(canvasRef.current){
        ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  const draw = useCallback((x,y) => {
    if(mouseDown){
        ctx.current.beginPath();
        ctx.current.strokeStyle = color;
        ctx.current.lineWidth = 5;
        ctx.current.lineJoin = 'round';
        ctx.current.moveTo(lastPosition.x, lastPosition.y);
        ctx.current.lineTo(x,y);
        ctx.current.closePath();
        ctx.current.stroke();

        setPosition({
            x,
            y
        })
    }
  },[lastPosition,mouseDown,color,setPosition])

  const onMouseDown = (e) => {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - boundingRect.left,
        y: e.clientY - boundingRect.top,
      })
      console.log(lastPosition);
      setMouseDown(true)
    }
  }
const onMouseUp = (e) => {
    setMouseDown(false)
  }
const onMouseMove = (e) => {
  if (canvasRef.current) {
    const boundingRect = canvasRef.current.getBoundingClientRect();
    draw(e.clientX- boundingRect.left,e.clientY - boundingRect.top)
}
}

const clear = () => {
  ctx.current.clearRect(0, 0, ctx.current.canvas.width, ctx.current.canvas.height)
}

const download = async () => {
  const image = canvasRef.current.toDataURL('image/png');
  const blob = await(await fetch(image)).blob();
  const blobURL = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = 'image.png';
  link.click();
}

// console.log(mouseDown,lastPosition);  

  return (
    <div>
      <div className="absolute left-20">
        
        <HexColorPicker  color={color} onChange={setColor}/>
      </div>
      <canvas
        className="border border-black m-auto mt-16 bg-white"
        width={width}
        height={height}
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        
      />
      <div className="flex w-1/2 gap-2 justify-end mx-auto mt-3 pr-7">
        <button onClick={clear} className="bg-blue-700 text-white p-1 rounded-md w-24 transition-all delay-75 hover:scale-105">Clear</button>
        <button onClick={download} className="bg-blue-700 text-white p-1 rounded-md w-24 transition-all delay-75 hover:scale-105">Save</button>
      </div>
    </div>
  );
}
