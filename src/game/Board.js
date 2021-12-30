import React, {useRef, useEffect} from 'react'

import { Grid } from "./Grid"
import { Map } from "./Map"
import { tileMap } from "../data/tileConstants"
import WallCollision from "../utils/WallCollision"
import {initialCharacterParams} from "../data/characterData" 
import {initialObjectParams} from "../data/objectData" 

import Character  from "./Character"
import Object from "./Object"
import UpdateTimeOfDay from './TimeOfDay';
import './Board.css';

const checkIntervalMinutes = 5;

export default function Board() {
    const canvasRef = useRef(null);

    //initialize characters
    let characters = []
    for(let data of initialCharacterParams){
        let character = new Character(data, tileMap.tsize)
        characters.push(character)
    }

    //initialize objects
    let objects = []
    for(let data of initialObjectParams){
        let object = new Object(data, tileMap.tsize)
        objects.push(object)
    }
    //didmount
    useEffect(()=>{
        checkTimeOfDay();
    },[])

    //didmount
    useEffect(()=>{
        const render = () => {
            //get canvas
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // draw world map
            Map(ctx);
            // Grid(ctx, canvas);

            //update objects
            for(let object of objects){
                object.draw(ctx)
            }

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

    function checkTimeOfDay(){
        UpdateTimeOfDay()
        setTimeout(checkTimeOfDay, checkIntervalMinutes*1000*60);
    }

    return (
        <div className='container'>
            <div id="rectangle"></div>
            <canvas id="canvas" ref={canvasRef} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'}/>
        </div>
    )
}

//clear screen
// ctx.clearRect(0, 0, canvas.width, canvas.height);