export default class AnimatedObject {
    constructor(objectData, tileSize){
        let image = new Image();  
        image.src = objectData.imgSource;
        this.image = image;

        this.currentAnimationFrame = 0;
        this.totalAnimationFrames = objectData.totalAnimationFrames;
        this.animationFrameLimit = 15;
        this.animationFrameProgress = this.animationFrameLimit;

        this.width = objectData.width;
        this.height = objectData.height;

        this.tileSize = tileSize
        this.scale = Math.floor(tileSize/16)

        this.x = objectData.currentLocation.x
        this.y = objectData.currentLocation.y
    }

    updateAnimationProgress(){
        if(this.animationFrameProgress>0){
            this.animationFrameProgress -=1;
            return
        }
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame+=1
        if(this.currentAnimationFrame>=this.totalAnimationFrames){
            this.currentAnimationFrame=0;
        }
    }

    draw(ctx){
        ctx.drawImage(
            this.image, // image
            this.currentAnimationFrame*this.width, // source x
            0, // source y
            this.width, // source width
            this.height, // source height
            this.x*(16*this.scale), // target x
            this.y*(16*this.scale), // target y
            this.width/(64/this.tileSize), // target width
            this.height/(64/this.tileSize) // target height
        );
        this.updateAnimationProgress();
    }
}