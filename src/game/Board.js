import React, {useRef, useEffect, useState} from 'react'

import { GridLines } from "./GridLines"
import { WorldMap } from "./WorldMap"
import { tileMap } from "../data/tileConstants"
import WallCollision from "../utils/WallCollision"
import characterData from "../data/characterData" 
import  Character  from "./Character"

export default function Board() {
    const canvasRef = useRef(null);

    //initialize characters
    let characters = []
    for(let data of characterData){
        let character = new Character(data)
        characters.push(character)
    }

    //indices
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
            WorldMap(ctx);
            GridLines(ctx, canvas);

            //move characters
            for(let character of characters){
                character.move()
                WallCollision(character, canvas);
                character.draw(ctx, loopIndex)
            }

            //increment loop animation once every 15 frames
            frameCount++;
            if (frameCount < frameLoopLimit) {
                window.requestAnimationFrame(render);
                return;
            }
            frameCount = 0;

            // increment the loop index
            loopIndex++;
            if(loopIndex >= maxLoopIndex){
                loopIndex = 0;
            }

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

//clear screen
// ctx.clearRect(0, 0, canvas.width, canvas.height);