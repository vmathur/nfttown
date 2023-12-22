import { HUDlocations } from "../data/tileConstants";

export default class Spot {
    constructor(selectedZone, tileSize){
        this.tileSize=tileSize;
    }

    isHUDLocation(x,y){
        let xCord = Math.floor(x/this.tileSize)+1;
        let yCord = Math.floor(y/this.tileSize)+1;
        for(let location of HUDlocations){
            if(location[0]===xCord && location[1]===yCord){
                return true
            }
        }
    }

    draw(ctx,x,y){
        if(!this.isHUDLocation(x,y)){
            ctx.strokeStyle = '#00bf37';
            ctx.lineWidth = 2;
    
            let drawX = Math.floor(x/this.tileSize)*this.tileSize
            let drawY = Math.floor(y/this.tileSize)*this.tileSize
            ctx.strokeRect(drawX, drawY, this.tileSize, this.tileSize)
        }
    }

}