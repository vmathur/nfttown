import React, {useRef, useEffect} from 'react'
import { CharacterMovement } from "./CharacterMovement"
import { GridLines } from "./GridLines"
import { WorldMap } from "./WorldMap"
import { tileMap } from "../constants"
import { WallCollision } from "./utils"

import locations from "../locations"

export default function Board() {
    const canvasRef = useRef(null);
    let tileImage = new Image();   // Create new img element
    tileImage.src = './assets/tiles.png'; // Set source path

    //didmount
    useEffect(()=>{
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            let { charObject } =  locations

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // ctx.fillStyle = 'red';
            // ctx.fillRect(10, 10, 50, 50);
            WorldMap(ctx, tileImage);
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