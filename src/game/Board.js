import React, {useRef, useEffect, useState} from 'react'

import { Grid } from "./Grid"
import { Map } from "./Map"
import { tileMap } from "../data/tileConstants"
import WallCollision from "../utils/WallCollision"
import {initialCharacterParams} from "../data/characterData" 
import  Character  from "./Character"

export default function Board() {
    const canvasRef = useRef(null);

    //initialize characters
    let characters = []
    for(let data of initialCharacterParams){
        let character = new Character(data, tileMap.tsize)
        characters.push(character)
    }

    //didmount
    useEffect(()=>{
        const render = () => {
            //get canvas
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            //draw world map
            Map(ctx);
            Grid(ctx, canvas);

            //update characters
            for(let character of characters){
                character.update()
                WallCollision(character, canvas);
                character.draw(ctx)
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