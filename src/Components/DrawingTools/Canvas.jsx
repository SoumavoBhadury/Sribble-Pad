import React from 'react'
import { useOnDraw } from "./Hooks";

export default function Canvas({width, height}) {

    const setCanvasRef = useOnDraw();
    
    return (
        <canvas className='border border-black m-auto mt-16' width={width} height={height} ref={setCanvasRef}/>
    )
}
