export default class Character {
    constructor(location, img, scale, width, height){
        this.x = location.x;
        this.y = location.y;
        this.img = img
        this.scale = scale;
        this.width = width;
        this.height = height;
        this.tileSize = 64;
        this.currentLoopIndex = 0;
        this.direction = 0;
        this.cycleLoop = [0,1,0,2]
    }

    draw(ctx, loopIndex, characterData){
        let currentLocation = characterData.currentLocation
        let velocity = characterData.velocity
        let direction = this.mapVelocityToDirection(velocity)
        this.drawFrame(ctx, this.cycleLoop[loopIndex], direction, currentLocation.x, currentLocation.y);
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY){
        ctx.drawImage(this.img, frameX*this.width, frameY*this.height, this.width, this.height, canvasX, canvasY, this.width*this.scale, this.height*this.scale);
    }

    mapVelocityToDirection(velocity){
        if(velocity.dy>0){
            //down
            return 0;
        }else{
            //up
            return 1;
        }
    }

} 