import { shovelData } from "../data/objectData";
import { tileMap } from "../data/tileConstants";

export default class Shovel {
    constructor(){
        let image = new Image();  
        image.src = shovelData.imgSource;
        this.image = image;

        this.width = shovelData.width;
        this.height = shovelData.height;

        this.scale = (Math.floor(tileMap.tsize/16))/(1.5)
        this.tileSize = tileMap.tsize; 

        this.targetX = 1100;
    }

    draw(ctx, enableShovel){
        let sourceX=3;
        if(enableShovel){
            sourceX = 1;
        }else{
            sourceX = 0
        }
            ctx.drawImage(
                this.image, // image
                sourceX*this.width, // source x
                0, // source y
                this.width, // source width
                this.height, // source height
                this.targetX, // target x
                10, // target y
                this.width*this.scale, // target width
                this.height*this.scale // target height
            );
    }
}