import React, {useRef, useEffect} from 'react'

import { Grid } from "./Grid"
import { WorldMap } from "./WorldMap"
import { worldMap } from "../data/tileConstants"
import getColorFromTime from './TimeOfDay';
import './World.css';

export default function World({isUpdating, setSelectedZone, setMapMode}) {
    const canvasRef = useRef(null);

    //click handler
    const canvasClickHandler=(event)=>{
        let rect = canvasRef.current.getBoundingClientRect();
        const x = Math.floor(event.clientX-rect.left)
        const y = Math.floor(event.clientY-rect.top)
        let zone = mapCoordinateToZone(x,y)
        setSelectedZone(zone)
        setMapMode('game')
    }

    //didmount
    useEffect(()=>{
        const render = () => {
            //get canvas
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // draw world map
            WorldMap(ctx);
            Grid(ctx, canvas);
        }
        render();
    })

    //get the color of the overlay
    let [color, opacity] = getColorFromTime();

    return (
        <div className='container'>
            <div id="rectangle" className="loading-rectangle" style={{left: "calc((100vw - "+worldMap.tsize*worldMap.cols+"px)/2)", width:worldMap.tsize*worldMap.cols+"px", backgroundColor : color, opacity:opacity}} height={worldMap.tsize*worldMap.rows +'px'} width={worldMap.tsize*worldMap.cols +'px'} ><div className='loading-text'>{isUpdating ? 'Loading...': ''}</div></div>
            <canvas id="canvas" ref={canvasRef} height={worldMap.tsize*worldMap.rows +'px'} width={worldMap.tsize*worldMap.cols +'px'} onClick={canvasClickHandler}/>
        </div>
    )
}

function mapCoordinateToZone(x,y){
    let zoneX = Math.floor(x/(worldMap.tsize*8))
    let zoneY = Math.floor(y/(worldMap.tsize*5))

    let coordinates = zoneX.toString()+zoneY.toString()

    switch(coordinates){
        case '11':
            return 1;
        case '21':
            return 2;
        case '22':
            return 3;
        case '12':
            return 4;
        case '02':
            return 5;
        case '01':
            return 6;
        case '00':
            return 7;
        case '10':
            return 8;
        case '20':
            return 9;
        default:
            return 0
    }
}
//clear screen
// ctx.clearRect(0, 0, canvas.width, canvas.height);