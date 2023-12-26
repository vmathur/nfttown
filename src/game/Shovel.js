import { shovelData } from "../data/objectData";
import { tileMap } from "../data/tileConstants";

export default class Shovel {
    constructor(enableShovel){
        let image = new Image();  
        image.src = shovelData.imgSource;
        this.image = image;

        this.width = shovelData.width;
        this.height = shovelData.height;

        this.scale = (Math.floor(tileMap.tsize/16))/(1.5)
        this.tileSize = tileMap.tsize; 

        if(enableShovel){
            this.sourceX = 1;
        }else{
            this.sourceX = 0;
        }
        this.targetX = 1100;
    }

    draw(ctx){
            ctx.drawImage(
                this.image, // image
                this.sourceX*this.width, // source x
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