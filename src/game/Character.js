import {getNextAction} from './utils'

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

        this.movingProgressRemaining = 0;
        this.currentAnimation = 'walk-down'
        this.animations = {
            'walk-down': [[0,0],[1,0],[0,0],[2,0]],
            'walk-up': [[0,1],[1,1],[0,1],[2,1]],
            'walk-left': [[0,2],[1,2],[0,2],[2,2]],
            'walk-right': [[0,3],[1,3],[0,3],[2,3]],
            'stand': [[0,0]],
            'idle': [[0,0]]
        }
        this.currentAnimationFrame = 0;
        this.animationFrameLimit = 15;
        this.animationFrameProgress = this.animationFrameLimit;
        this.behaviorLoop = characterData.behaviorLoop

        this.id = null
        this.behaviorLoopIndex = -1;

        this.currentAction = characterData.currentAction
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    update(){
        if(this.movingProgressRemaining > 0){
            this.updatePosition();            
        }else{
            this.behaviorLoopIndex += 1;
            if (this.behaviorLoopIndex === this.behaviorLoop.length) {
                this.behaviorLoopIndex = 0;
                let [nextActionId, nextAction]  = getNextAction(this.currentAction)
                this.currentAction = nextActionId
                this.behaviorLoop = nextAction.behaviorLoop
            } 
            let behavior = this.behaviorLoop[this.behaviorLoopIndex]
            this.startBehavior(behavior)
        }
    }

    startBehavior(behavior){
        //set character direction to whatever the behavior is
        if(behavior.type === 'walk'){
            if(behavior.direction === 'up'){
                this.dx = 0;
                this.dy = -2;
            }else if(behavior.direction === 'right'){
                this.dx = 2;
                this.dy = 0;
            }else if(behavior.direction === 'down'){
                this.dx = 0;
                this.dy = 2;
            }else if (behavior.direction === 'left'){
                this.dx = -2;
                this.dy = 0;
            }
    
            //todo check for collisions
        }else if(behavior.type === 'stand' || behavior.type === 'idle'){
            this.dx = 0;
            this.dy = 0;
        } 
        this.movingProgressRemaining = behavior.duration ? behavior.duration : 60;
        
        this.updateSprite(behavior);
    }

    updatePosition(){
        this.x += this.dx;
        this.y += this.dy;
        this.movingProgressRemaining -= 1;
        if (this.movingProgressRemaining === 0) {
            //todo emit event that it's finished
        }
    }

    updateSprite(behavior){
        if(!behavior){
            return
        }
        if(behavior.type === 'stand'){
            this.setAnimation('stand')
        }else if(behavior.type === 'walk'){
            if(behavior.direction === 'up'){
                this.setAnimation('walk-up')
            }else if(behavior.direction === 'right'){
                this.setAnimation('walk-right')
            }else if(behavior.direction === 'down'){
                this.setAnimation('walk-down')
            }else if (behavior.direction === 'left'){
                this.setAnimation('walk-left')
            }
        }else if(behavior.type==='idle'){
            this.setAnimation('walk-down')
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
        const [frameX, frameY] = this.frame
        this.drawFrame(ctx, frameX, frameY , this.x, this.y);
        this.updateAnimationProgress();
    }

    drawFrame(ctx, frameX, frameY, canvasX, canvasY){         
        ctx.drawImage(this.img, frameX*this.width, frameY*this.height, this.width, this.height, canvasX, canvasY, this.width*this.scale, this.height*this.scale);
    }
} 