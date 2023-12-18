import React, {useRef, useEffect} from 'react'

// import { Grid } from "./Grid"
import { Map } from "./Map"
import { tileMap } from "../data/tileConstants"
import WallCollision from "../utils/WallCollision"

import Character  from "./Character"
import getColorFromTime from './TimeOfDay';
import { getHealthRemaining } from './utils'
import './Board.css';
import Cursor from './Cursor'
import { cursorData } from '../data/objectData'

// const fps = 2000;

export default function Board({charactersRef, ownedCitizens, initialActions, isUpdating, selectedZone, setSelectedCitizen}) {
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

    //didmount
    useEffect(()=>{
        const render = () => {
            //get canvas
            const canvas = canvasRef.current;
            if(!canvas){
                return;
            }
            const ctx = canvas.getContext('2d');

            // draw zone map
            Map(ctx, selectedZone);

            //update characters
            for(let character of characters){
                let health = getHealthRemaining(character.lastFed, character.maxTime);
                if(health<=0){
                    continue;
                }
                character.update(health)
                WallCollision(character, canvas);
                character.draw(ctx)

                if(character.id===ownedCitizens[0]){   
                    let cursor = new Cursor(cursorData, 48)
                    cursor.draw(ctx,character.x,character.y)     
                }


            }
            // let cursor = new Cursor(cursorData, 48)
            // cursor.draw(ctx,character.x,character.y)            
            // // setTimeout(() => {
            //     requestAnimationFrame(render);
            // }, 1000 / fps);

            requestAnimationFrame(render);
        }
        render();
    })

    //get the color of the overlay
    let [color, opacity] = getColorFromTime();
    if(isUpdating){
        color = 'black'
        opacity = 0.8
    }

    //render
    return (
        <div className='container'>
            <div id="rectangle" className="loading-rectangle" style={{left: "calc((100vw - "+tileMap.tsize*tileMap.cols+"px)/2)", width:tileMap.tsize*tileMap.cols+"px", backgroundColor : color, opacity:opacity}} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'} ><div className='loading-text'>{isUpdating ? 'Loading...': ''}</div></div>
            <canvas id="canvas" ref={canvasRef} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'}/>
        </div>
    )

}

//clear screen
// ctx.clearRect(0, 0, canvas.width, canvas.height);

// //click handler
// const canvasClickHandler=(event)=>{
//     let rect = canvasRef.current.getBoundingClientRect();
//     const x = Math.floor(event.clientX-rect.left)
//     const y = Math.floor(event.clientY-rect.top)
//     let citizenId = getClickedCitizen(x,y)
//     setSelectedCitizen(citizenId)
// }

// function getClickedCitizen(x,y){
//     let offset=50
//     for(const character of characters){
//         if((x>=character.x-offset&&x<=character.x+offset)&&(y>=character.y-offset&&y<=character.y+offset)){
//             return character.id
//         }
//     }
//     return ''
// }
