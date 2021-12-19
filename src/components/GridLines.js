import React, {useRef, useEffect} from 'react'

export function GridLines(ctx, canvas){
    let grid = new Grid(50)
    grid.draw(ctx, canvas.height, canvas.width)
}

class Grid {
    constructor(tileSize){
        this.tileSize = tileSize
    }

    draw(ctx, height, width){
        ctx.strokeStyle = 'black';
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