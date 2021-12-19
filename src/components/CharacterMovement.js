import React, {useRef, useEffect} from 'react'

export function CharacterMovement(ctx, charObject) {
    let data = new Character(charObject.x, charObject.y, charObject.rad)
    data.draw(ctx)
    charObject.x += charObject.dx;
    charObject.y += charObject.dy;
}

class Character {
    constructor(x,y, rad){
        this.x = x;
        this.y = y;
        this.rad = rad
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.fillStyle = 'red'
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        console.log('rendering frame')    
    }
} 