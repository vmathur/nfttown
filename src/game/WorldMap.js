import { worldMap } from "../data/tileConstants"

export function WorldMap(ctx){
    let mapTiles = new Tiles();
    let tileImage = new Image();   // Create new img element
    tileImage.src = './assets/tilesv2.png'; // Set source path
    mapTiles.draw(ctx, worldMap, tileImage)
}

class Tiles {
    draw(ctx, tileMap, img){  
        for(let i = 0; i<tileMap.tiles.length; i++){
            for (let c = 0; c < tileMap.cols; c++) {
                for (let r = 0; r < tileMap.rows; r++) {
                    let tile = tileMap.getTile(i, c, r);
                    // let tile = tileMap.getTile(c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            img, // image
                            (tile - 1) * tileMap.sourceTileHeight, // source x
                            0, // source y
                            64, // source width
                            64, // source height
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