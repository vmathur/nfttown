import { arrowsData } from "../data/objectData";

export default class Hud {
    constructor(tileSize){
        let image = new Image();  
        image.src = arrowsData.imgSource;
        this.image = image;

        this.width = arrowsData.width;
        this.height = arrowsData.height;

        this.scale = (Math.floor(tileSize/16))/(1.5)
        this.tileSize = tileSize; 
    }

    drawHud(ctx, showHome){
        // this.draw(ctx,4,30)
        if(showHome){
            this.draw(ctx,5,30)
        }
    }

    draw(ctx, sourceX, targetX){
        ctx.drawImage(
            this.image, // image
            sourceX*this.width, // source x
            0, // source y
            this.width, // source width
            this.height, // source height
            targetX, // target x
            10, // target y
            this.width*this.scale, // target width
            this.height*this.scale // target height
        );
    }
}