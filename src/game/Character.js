export default class Character {
    constructor(characterData){

        let charImage = new Image();   // Create new img element
        charImage.src = characterData.imgSource

        this.x = characterData.currentLocation.x;
        this.y = characterData.currentLocation.y;
        this.dx = characterData.velocity.dx;
        this.dy = characterData.velocity.dy;
        this.img = charImage;
        this.scale = 3;
        this.width = characterData.width;
        this.height = characterData.height;
        this.tileSize = 64;
        this.currentLoopIndex = 0;
        this.cycleLoop = [0,1,0,2]
    }

    move(){
        this.x += this.dx;
        this.y += this.dy;
    }

    draw(ctx, loopIndex){
        let direction = this.mapVelocityToDirection(this.dx, this.dy)
        this.drawFrame(ctx, this.cycleLoop[loopIndex], direction, this.x, this.y);
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY){         
        ctx.drawImage(this.img, frameX*this.width, frameY*this.height, this.width, this.height, canvasX, canvasY, this.width*this.scale, this.height*this.scale);
    }

    mapVelocityToDirection(dx, dy){
        if(dy>0){
            //down
            return 0;
        }else{
            //up
            return 1;
        }
    }

} 