import { tileMap } from "../data/tileConstants" 

export function GridLines(ctx, canvas){
    let grid = new Grid(tileMap.tsize)
    grid.draw(ctx, canvas.height, canvas.width)
}

class Grid {
    constructor(tileSize){
        this.tileSize = tileSize
    }

    draw(ctx, height, width){
        ctx.strokeStyle = '#00bf37';
        let x = 0;
        let y = 0;
        for(let i = 0; i < height; i++) {    
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
            y +=this.tileSize;
        }
        for(let j = 0; j < width; j+=this.tileSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
            x +=this.tileSize;
        } 
    }
}