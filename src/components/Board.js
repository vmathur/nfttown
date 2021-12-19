import React, {useRef, useEffect} from 'react'
import { CharacterMovement } from "./CharacterMovement"
import { GridLines } from "./GridLines"

import locations from "../locations"
import { WallCollision } from "./utils"


let x=0;
export default function Board() {
    const canvasRef = useRef(null);

    //didmount
    useEffect(()=>{
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let { charObject } =  locations

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ctx.fillStyle = 'red';
            // ctx.fillRect(10, 10, 50, 50);
            GridLines(ctx, canvas);
            CharacterMovement(ctx, charObject);

            WallCollision(charObject, canvas);
            requestAnimationFrame(render)
        }
        render();
    },[])

    return (
        <div>
            <canvas id="canvas" ref={canvasRef} height="500px" width="800px"/>
        </div>
    )
}