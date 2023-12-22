import { gardenData } from "../data/objectData";
import { tileMap } from "../data/tileConstants"

export default class GardenMap{
    constructor(garden){
        let gardenTiles = new Tiles();
        this.gardenData=gardenData
        let tileImage = new Image();   // Create new img element
        tileImage.src = gardenData.imgSource; // Set source path
        this.tileImage=tileImage;
        this.garden=garden;
        this.tileSize = tileMap.tsize;
        this.gardenTiles = gardenTiles;
    }

    draw(ctx){
        if(this.garden.length>0){
            this.gardenTiles.draw(ctx, this.garden, this.tileImage, this.tileSize);
        }
    }
}

class Tiles {
    draw(ctx, garden, img, tileSize){  
            for (let r = 0; r < 14; r++) {
                for (let c = 0; c < 24; c++) {
                    let tile = garden[r][c];
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            img, // image
                            (tile - 1) * 16, // source x
                            0, // source y
                            16, // source width
                            16, // source height
                            (c) * tileSize, // target x
                            (r) * tileSize, // target y
                            tileSize, // target width
                            tileSize // target height
                        );
                    }
                } 
            }
    }
}