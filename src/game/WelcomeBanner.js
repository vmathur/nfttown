export default class WelcomeBanner {
    constructor(data, tileSize){
        let image = new Image();  
        image.src = data.imgSource;
        this.image = image;

        this.width = data.width;
        this.height = data.height;

        this.x = data.currentLocation.x
        this.y = data.currentLocation.y

        this.scale = Math.floor(tileSize/16)
        this.tileSize = tileSize; 
    }

    draw(ctx){
        ctx.drawImage(
            this.image, // image
            0, // source x
            0, // source y
            this.width, // source width
            this.height, // source height
            this.x*(16*this.scale), // target x
            this.y*(16*this.scale), // target y
            this.width/(64/this.tileSize), // target width
            this.height/(64/this.tileSize) // target height
        );
    }
}