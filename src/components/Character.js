export default class Character {
    constructor(location, img, scale, width, height){
        this.x = location.x;
        this.y = location.y;
        this.img = img
        this.scale = scale;
        this.imgx = width;
        this.imgy = height;
        this.tileSize = 64;
        this.currentLoopIndex = 0;
        this.direction = 0;
        this.cycleLoop = [0,1,0,2]
    }

    draw(ctx, loopIndex, currentLocation){
        this.drawFrame(ctx, this.cycleLoop[loopIndex], 0, currentLocation.x, currentLocation.y);
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY){
        ctx.drawImage(this.img, frameX*this.imgx, frameY*this.imgy, this.imgx, this.imgy, canvasX, canvasY, this.imgx*this.scale, this.imgy*this.scale);
    }

} 