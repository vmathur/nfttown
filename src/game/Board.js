import React, {useRef, useEffect, useState} from 'react'

import Map from "./Map"
import { tileMap } from "../data/tileConstants"
import WallCollision from "../utils/WallCollision"
import { getGardenFromZone, dig } from '../contract/gardeningContractFunctions'
import Character  from "./Character"
import getColorFromTime from './TimeOfDay';
import { getHealthRemaining } from './utils'
import { getOwnedCitizenZoneFromCitizens } from '../utils/zones'
import './Board.css';
import Cursor from './Cursor'
import { cursorData, arrowsData } from '../data/objectData'
import GardenMap from './GardenMap'
import Hud from './Hud'
import Shovel from './Shovel'

let offScreenHudCanvas = createOffscreenCanvas(tileMap.tsize*tileMap.cols, tileMap.tsize*tileMap.rows);
let offScreenMapCanvas = createOffscreenCanvas(tileMap.tsize*tileMap.cols, tileMap.tsize*tileMap.rows);
// let offScreeGardenCanvas = createOffscreenCanvas(tileMap.tsize*tileMap.cols, tileMap.tsize*tileMap.rows);
let offScreenShovelCanvas = createOffscreenCanvas(tileMap.tsize*tileMap.cols, tileMap.tsize*tileMap.rows);

export default function Board({charactersRef, ownedCitizens, initialActions, isUpdating, setMapMode, selectedZone, setSelectedZone, citizens, garden, setGarden, account, gardenLoading, setGardenLoading}) {    
    const [enableShovel, setEnableShovel] = useState(false)
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
    const ownedCitizenZone = getOwnedCitizenZoneFromCitizens(ownedCitizens, citizens)
    let showHome = ownedCitizens.length > 0 ? true : false
    showHome = showHome && (selectedZone!==ownedCitizenZone);
    
    let cursor = new Cursor(cursorData, 48)
    
    let hud = new Hud(tileMap.tsize);
    hud.drawHud(offScreenHudCanvas.getContext('2d'), showHome);
    let map = new Map(selectedZone);
    map.draw(offScreenMapCanvas.getContext('2d'), selectedZone)
    
    let gardenMap = new GardenMap(garden);
    let offScreeGardenCanvas = createOffscreenCanvas(tileMap.tsize*tileMap.cols, tileMap.tsize*tileMap.rows);
    gardenMap.draw(offScreeGardenCanvas.getContext('2d'));

    let shovel = new Shovel(enableShovel);
    shovel.draw(offScreenShovelCanvas.getContext('2d'));

    const canvasClickHandler=(event)=>{
        let rect = canvasRef.current.getBoundingClientRect();
        const x = Math.floor(event.clientX-rect.left)
        const y = Math.floor(event.clientY-rect.top)

        let arrowId = getClickedArrow(x,y)
        let hud = getClickedHud(x,y)

        if(arrowId>0){
            let zone = arrowsData.arrowToZoneMap[selectedZone-1][arrowId-1]
            setSelectedZone(zone)
            getGardenFromZone(zone, setGarden, setGardenLoading);
        }else if(hud===1 || hud === 2 || hud === 3){
            if(hud===1){
                setMapMode('world')
            }else if(hud===2){
                let ownedCitizenZone = getOwnedCitizenZoneFromCitizens(ownedCitizens, citizens)
                setSelectedZone(ownedCitizenZone);
                getGardenFromZone(ownedCitizenZone, setGarden, setGardenLoading);
            }else if (hud===3){
                setEnableShovel(!enableShovel)
            }
        }else{
            if(account && enableShovel){
                let xCord = Math.floor(x/tileMap.tsize)+1;
                let yCord = Math.floor(y/tileMap.tsize)+1;
                dig(selectedZone, xCord, yCord, setGarden, account, setGardenLoading)
            }
        }
    }

    function getClickedArrow(x,y){
        let offset=50
        let i=1;
        for(const arrow of arrowsData.arrowLocations){
            if((x>=arrow[0]-offset&&x<=arrow[0]+offset)&&(y>=arrow[1]-offset&&y<=arrow[1]+offset)){
                return i
            }
            i++;
        }
        return 0
    }

    function getClickedHud(x,y){
        let offset=50
        if((x>=30-offset&&x<=30+offset)&&(y>=10-offset&&y<=10+offset)){
            return 1
        }
        if((x>=80-offset&&x<=80+offset)&&(y>=10-offset&&y<=10+offset)){
            return 2
        }
        if((x>=1120-offset&&x<=1120+offset)&&(y>=10-offset&&y<=10+offset)){
            return 3
        }
        return 0
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

            //clear screen
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // draw zone map
            // map.draw(ctx, selectedZone); 
            ctx.drawImage(offScreenMapCanvas,0,0);

            //draw garden
            if(!gardenLoading){
                // gardenMap.draw(ctx);
                ctx.drawImage(offScreeGardenCanvas,0,0);
            }

            //update and draw characters
            for(let character of characters){
                let health = getHealthRemaining(character.lastFed, character.maxTime);
                if(health<=0){
                    continue;
                }
                character.update(health)
                WallCollision(character, canvas);
                character.draw(ctx)

                //draw cursor
                if(character.id===ownedCitizens[0]){   
                    cursor.draw(ctx,character.x,character.y)     
                }
            }
            //draw hud
            // hud.drawHud(ctx, showHome)
            ctx.drawImage(offScreenHudCanvas,0,0);

            if(account && ownedCitizens.length>0){
                ctx.drawImage(offScreenShovelCanvas, 0,0);
            }
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
            <canvas id="canvas" ref={canvasRef} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'} onClick={canvasClickHandler}/>
        </div>
    )

}

function createOffscreenCanvas(width, height) {
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = width;
    offScreenCanvas.height = height;
    return offScreenCanvas; //return canvas element
}
