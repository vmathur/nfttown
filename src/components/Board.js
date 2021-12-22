import React, {useRef, useEffect, useState} from 'react'

import  Character  from "./Character"
import { GridLines } from "./GridLines"
import { WorldMap } from "./WorldMap"
import { tileMap } from "../constants"
import WallCollision from "../utils/WallCollision"
import characterData from "../data/characterData" 

export default function Board() {
    const canvasRef = useRef(null);
    let tileImage = new Image();   // Create new img element
    tileImage.src = './assets/tiles.png'; // Set source path
    let charImg = new Image();
    charImg.src = characterData.imgSource;

    //create character object
    let character = new Character(characterData.currentLocation, charImg, 3, characterData.width, characterData.height)

    let loopIndex = 0;
    let frameCount = 0;
    let frameLoopLimit = 15;
    let maxLoopIndex = 4;

    //didmount
    useEffect(()=>{
        const render = () => {
            //get canvas
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            //draw world map
            WorldMap(ctx, tileImage);
            GridLines(ctx, canvas);

            //draw character
            character.draw(ctx, loopIndex, characterData)
            characterData.currentLocation.x+=characterData.velocity.dx;
            characterData.currentLocation.y+=characterData.velocity.dy;
            
            //check for collision
            WallCollision(characterData, canvas);

            //increment loop animation once every 15 frames
            frameCount++;
            if (frameCount < frameLoopLimit) {
                window.requestAnimationFrame(render);
                return;
            }
            frameCount = 0;

            //clear screen
            // ctx.clearRect(0, 0, canvas.width, canvas.height);

            // update the loop index
            loopIndex++;
            if(loopIndex >= maxLoopIndex){
                loopIndex = 0;
            }

            // todo 
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