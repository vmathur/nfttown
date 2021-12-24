export default class Character {
    constructor(characterData, tileSize){

        let charImage = new Image();   // Create new img element
        charImage.src = characterData.imgSource

        let scale = Math.floor(tileSize/characterData.height)

        this.x = characterData.currentLocation.x;
        this.y = characterData.currentLocation.y;
        this.dx = characterData.velocity.dx;
        this.dy = characterData.velocity.dy;

        this.img = charImage;
        this.scale = scale;
        this.width = characterData.width;
        this.height = characterData.height;
        this.tileSize = 64;

        this.currentAnimation = 'walk-down'
        this.animations = {
            'walk-down': [[0,0],[1,0],[0,0],[2,0]],
            'walk-up': [[0,1],[1,1],[0,1],[2,1]],
            'idle': [0,0]
        }
        this.currentAnimationFrame = 0;
        this.animationFrameLimit = 15;
        this.animationFrameProgress = this.animationFrameLimit;
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    update(){
        this.updatePosition();
        this.updateSprite();
    }

    updatePosition(){
        this.x += this.dx;
        this.y += this.dy;
    }

    updateSprite(){
        if(this.dy>0){
            this.setAnimation('walk-down')
        }else{
            this.setAnimation('walk-up')
        }
    }
    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit
        }
    }

    updateAnimationProgress(){
        if(this.animationFrameProgress>0){
            this.animationFrameProgress -=1;
            return
        }
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame+=1
        if(this.frame === undefined){
            this.currentAnimationFrame=0;
        }
    }

    draw(ctx){
        this.updateSprite()
        const [frameX, frameY] = this.frame
        this.drawFrame(ctx, frameX, frameY , this.x, this.y);
        this.updateAnimationProgress();
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY){         
        ctx.drawImage(this.img, frameX*this.width, frameY*this.height, this.width, this.height, canvasX, canvasY, this.width*this.scale, this.height*this.scale);
    }
} 