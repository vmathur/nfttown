import {getNextAction, getBehaviorLoop} from './utils'
import {behaviorLoops} from '../data/characterData'
import {objectLocations} from '../data/objectData'

export default class Character {
    constructor(characterData, tileSize){

        let charImage = new Image();   // Create new img element
        charImage.src = characterData.imgSource

        let scale = Math.floor(tileSize/characterData.height)

        this.x = characterData.currentLocation.x;
        this.y = characterData.currentLocation.y;
        this.dx = 0;
        this.dy = 0;

        this.img = charImage;
        this.scale = scale;
        // this.scale = 4
        this.width = characterData.width;
        this.height = characterData.height;
        this.tileSize = 64;

        this.movingProgressRemaining = 0;
        this.currentAnimation = 'idle'
        this.animations = {
            'stand': [[0,0]],
            'idle': [[0,0],[1,0],[2,0],[3,0]],
            'walk-left': [[0,1],[1,1],[2,1],[3,1]],
            'walk-right': [[0,2],[1,2],[2,2],[3,2]],
            'walk-down': [[0,3],[1,3],[2,3],[3,3]],
            'walk-up': [[0,4],[1,4],[2,4],[3,4]],
            'eat':[[0,5],[1,5],[2,5],[3,5]],
            'getting-seated':[[0,6],[1,6],[2,6],[3,6]],
            'sit':[[3,6]],
            'getting-up':[[3,6],[2,6],[1,6],[0,6]],
            'sleep':[[0,7],[1,7],[2,7],[3,7]]
        }
        this.currentAnimationFrame = 0;
        this.animationFrameLimit = 15;
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAction = characterData.currentAction
        this.behaviorLoop = behaviorLoops[this.currentAction].behaviorLoop

        this.id = characterData.id
        this.behaviorLoopIndex = -1;

        this.lastFed = characterData.lastFed;
        this.maxTime = characterData.maxTime;
        this.hungerThreshold = 10; //set to 10 for all 
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    getId(){
        return this.id;
    }

    update(health){
        //check if it's hungry
        this.checkIfHungry(health)

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

    checkIfHungry(health){
        if(this.currentAction!== 'hungry'){
            if(health < this.hungerThreshold){
                this.currentAction = 'hungry'
                this.behaviorLoopIndex = -1;
                this.movingProgressRemaining = 0;
                this.behaviorLoop = getBehaviorLoop(this.currentAction)
            }
        }else{
            if(health >= this.hungerThreshold){
                this.currentAction = 'eat'
                this.behaviorLoopIndex = -1;
                this.movingProgressRemaining = 0;
                this.behaviorLoop = getBehaviorLoop(this.currentAction)
            }
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
        }else if(behavior.type === 'stand' || behavior.type === 'idle' || behavior.type === 'sleep' || behavior.type === 'eat' || behavior.type === 'getting-seated' || behavior.type === 'sit' || behavior.type === 'getting-up'){
            this.dx = 0;
            this.dy = 0;
        } 
        this.movingProgressRemaining = behavior.duration ? behavior.duration : 60;
        this.updateSprite(behavior);
    }

    updatePosition(){
        this.x += this.dx;
        this.y += this.dy;

        let tempX = Math.floor(this.x/64)+1;
        let tempY = Math.floor(this.y/64)+1;
        let isCollision = objectLocations[(tempY-1) * 24 + (tempX-1)]

        // if there's a collision with a game object, then move on to the next 
        if(isCollision === 1){
            this.movingProgressRemaining = 0
            return
        }

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
            this.setAnimation('idle')
        }else if (behavior.type ==='eat'){
            this.setAnimation('eat')
        }else if(behavior.type === 'getting-seated'){
            this.setAnimation('getting-seated')
        }else if(behavior.type === 'getting-up'){
            this.setAnimation('getting-up')
        }else if(behavior.type === 'sit'){
            this.setAnimation('sit')
        }else if(behavior.type === 'sleep'){
            this.setAnimation('sleep')
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