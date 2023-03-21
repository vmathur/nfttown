import React, {useRef, useEffect} from 'react'

// import { Grid } from "./Grid"
import { Map } from "./Map"
import { tileMap } from "../data/tileConstants"
import WallCollision from "../utils/WallCollision"
import {initialObjectParams} from "../data/objectData" 
import {clockTowerData} from "../data/objectData" 

import Character  from "./Character"
import Object from "./Object"
import ClockTower from "./ClockTower"
import UpdateTimeOfDay from './TimeOfDay';
import { getHealthRemaining } from './utils'
import './Board.css';

const checkIntervalMinutes = 5;

export default function Board({charactersRef, initialActions, setSelectedCitizen}) {
    const canvasRef = useRef(null);
    //initialize characters
    let characters = []
    for(let data of charactersRef.current){
        if (initialActions && initialActions.tokenId===data.tokenId){
            data.currentAction = initialActions.currentAction
        }
        let character = new Character(data, tileMap.tsize)
        characters.push(character)
    }

    //initialize objects
    let objects = []
    for(let data of initialObjectParams){
        let object = new Object(data, tileMap.tsize)
        objects.push(object)
    }

    let clockTower = new ClockTower(clockTowerData, tileMap.tsize)

    //click handler
    const canvasClickHandler=(event)=>{
        // let rect = canvasRef.current.getBoundingClientRect();
        // const x = Math.floor(event.clientX-rect.left)
        // const y = Math.floor(event.clientY-rect.top)
        // let citizenId = getClickedCitizen(x,y)
        // setSelectedCitizen(citizenId)
    }

    function getClickedCitizen(x,y){
        let offset=50
        for(const character of characters){
            if((x>=character.x-offset&&x<=character.x+offset)&&(y>=character.y-offset&&y<=character.y+offset)){
                return character.id
            }
        }
        return ''
    }

    //didmount
    useEffect(()=>{
        checkTimeOfDay();
    })

    //didmount
    useEffect(()=>{
        const render = () => {
            //get canvas
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // draw world map
            Map(ctx);
            // Grid(ctx, canvas);
            clockTower.draw(ctx)

            //update objects
            for(let object of objects){
                object.draw(ctx)
            }

            //update characters
            for(let character of characters){
                let health = getHealthRemaining(character.lastFed, character.maxTime);
                if(health<=0){
                    continue;
                }
                character.update(health)
                WallCollision(character, canvas);
                character.draw(ctx)
            }
            
            requestAnimationFrame(render)
        }
        render();
    })

    function checkTimeOfDay(){
        UpdateTimeOfDay()
        setTimeout(checkTimeOfDay, checkIntervalMinutes*1000*60);
    }
    return (
        <div className='container'>
            <div id="rectangle" style={{left: "calc((100vw - "+tileMap.tsize*tileMap.cols+"px)/2)", width:tileMap.tsize*tileMap.cols+"px"}} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'} ></div>
        <canvas id="canvas" ref={canvasRef} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'} onClick={canvasClickHandler}/>
        </div>
    )
}

//clear screen
// ctx.clearRect(0, 0, canvas.width, canvas.height);