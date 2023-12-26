import { cursorData } from "../data/objectData";
import { tileMap } from "../data/tileConstants";

export default class Cursor {
    constructor(){
        let image = new Image();  
        image.src = cursorData.imgSource;
        this.image = image;

        this.width = cursorData.width;
        this.height = cursorData.height;

        this.x = cursorData.currentLocation.x
        this.y = cursorData.currentLocation.y

        this.scale = Math.floor(tileMap.tsize/16)
        this.tileSize = tileMap.tsize; 
    }

    draw(ctx,x,y){
        ctx.drawImage(
            this.image, // image
            0, // source x
            0, // source y
            this.width, // source width
            this.height, // source height
            x+8, // target x
            y-20, // target y
            this.width/(64/64), // target width
            this.height/(64/64) // target height
        );
    }
}