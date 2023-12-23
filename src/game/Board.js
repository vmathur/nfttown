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
import Spot from './Spot'


export default function Board({charactersRef, ownedCitizens, initialActions, isUpdating, setMapMode, selectedZone, setSelectedZone, citizens, garden, setGarden, account, gardenLoading, setGardenLoading}) {
    // eslint-disable-next-line
    const [mousePosition, setMousePosition] = useState({
        left: -100,
        top: -100
    })
    
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
    let cursor = new Cursor(cursorData, 48)
    let hud = new Hud(tileMap.tsize);
    let map = new Map(selectedZone);
    // eslint-disable-next-line
    let spot = new Spot(selectedZone, tileMap.tsize);
    let gardenMap = new GardenMap(garden);
    
    const ownedCitizenZone = getOwnedCitizenZoneFromCitizens(ownedCitizens, citizens)


    let showHome = ownedCitizens.length > 0 ? true : false
    showHome = showHome && (selectedZone!==ownedCitizenZone);

    // eslint-disable-next-line
    function handleMouseMove(e) { 
        const canvas = canvasRef.current;
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop-50;
        
        setMousePosition({left: x, top: y}); 
        //todo hide square if out of bounds
    }

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
        }else if(hud===1 || hud === 2){
            if(hud===1){
                setMapMode('world')
            }else if(hud===2){
                let ownedCitizenZone = getOwnedCitizenZoneFromCitizens(ownedCitizens, citizens)
                setSelectedZone(ownedCitizenZone);
                getGardenFromZone(ownedCitizenZone, setGarden, setGardenLoading);
            }
        }else{
            if(account){
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
        return 0
    }

    
    if(gardenLoading){console.log('loading')};
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
            map.draw(ctx, selectedZone)
            if(!gardenLoading){
                gardenMap.draw(ctx);
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

                if(character.id===ownedCitizens[0]){   
                    cursor.draw(ctx,character.x,character.y)     
                }
            }
            hud.drawHud(ctx, showHome)
            if(account && ownedCitizens.length>0){
                // spot.draw(ctx, mousePosition.left, mousePosition.top);
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
            {/* <canvas id="canvas" ref={canvasRef} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'} onClick={canvasClickHandler} onMouseMove={(ev)=> handleMouseMove(ev)}/> */}
            <canvas id="canvas" ref={canvasRef} height={tileMap.tsize*tileMap.rows +'px'} width={tileMap.tsize*tileMap.cols +'px'} onClick={canvasClickHandler}/>
        </div>
    )

}