import React, {useRef, useEffect} from 'react'
import { tileMap, tileImage } from "../constants"

export function WorldMap(ctx, img){
    let map = new Map();
    map.draw(ctx, tileMap, img)
}

class Map {
    constructor(){

    }
    
    draw(ctx, tileMap, img){  
        for(let i = 0; i<tileMap.tiles.length; i++){
            for (let c = 0; c < tileMap.cols; c++) {
                for (let r = 0; r < tileMap.rows; r++) {
                    let tile = tileMap.getTile(i, c, r);
                    // let tile = tileMap.getTile(c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            img, // image
                            (tile - 1) * tileMap.tsize, // source x
                            0, // source y
                            tileMap.tsize, // source width
                            tileMap.tsize, // source height
                            c * tileMap.tsize, // target x
                            r * tileMap.tsize, // target y
                            tileMap.tsize, // target width
                            tileMap.tsize // target height
                        );
                    }
                }
            }
        }
    }
}