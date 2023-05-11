import { useEffect, useRef } from "react";

export function useOnDraw() {
  const isDrawingRef = useRef(false);
  const canvasRef = useRef(null);
  const prePointRef = useRef(null);

  const setCanvasRef = (ref) => {
    if (!ref) return;
    canvasRef.current = ref;
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  };

  const onDraw = (ctx, point, prePoint) => {
    drawLine(prePoint, point, ctx, '#000000', 5);
  };

  const drawLine = (start, end, ctx, color, width) =>{
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }

  const initMouseMoveListener = () => {
    const mouseMoveListener = (e) => {
      if (isDrawingRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const ctx = canvasRef.current.getContext("2d");
        if (onDraw) onDraw(ctx, point, prePointRef.current);
        prePointRef.current=point;
        console.log(point);
      }
    };
    window.addEventListener("mousemove", mouseMoveListener);
  };

  const initMouseDownListener = () => {
    if (!canvasRef.current) return;
    const listener = () => {
      isDrawingRef.current = true;
    };

    canvasRef.current.addEventListener("mousedown", listener);
  };
  const initMouseUpListener = () => {
    if (!canvasRef.current) return;
    const upListener = () => {
      isDrawingRef.current = false;
    };
    window.addEventListener("mouseup", upListener);
  };

  const computePointInCanvas = (clientX, clientY) => {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    } else return null;
  };

  return setCanvasRef;
}
