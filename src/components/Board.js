import React, {useRef, useEffect} from 'react'
import { CharacterMovement } from "./CharacterMovement"
import { GridLines } from "./GridLines"
import { WorldMap } from "./WorldMap"
import { tileMap } from "../constants"


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
            WorldMap(ctx);
            CharacterMovement(ctx, charObject);
            GridLines(ctx, canvas);

            WallCollision(charObject, canvas);
            requestAnimationFrame(render)
        }
        render();
    },[])

    return (
        <div>
            <canvas id="canvas" ref={canvasRef} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'}/>
        </div>
    )
}