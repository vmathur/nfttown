export default class Object {
    constructor(objectData, tileSize){
        let image = new Image();  
        image.src = objectData.imgSource;
        this.image = image;

        this.currentAnimationFrame = 0;
        this.totalAnimationFrames = 12;
        this.animationFrameLimit = 15;
        this.animationFrameProgress = this.animationFrameLimit;

        this.width = objectData.width;
        this.height = objectData.height;

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
            this.x * 64, // target x
            this.y * 64, // target y
            this.width, // target width
            this.height // target height
        );
        this.updateAnimationProgress();
    }
}