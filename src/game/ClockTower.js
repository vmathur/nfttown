export default class ClockTower {
    constructor(clockTowerData, tileSize){
        let image = new Image();  
        image.src = clockTowerData.imgSource;
        this.image = image;

        this.width = clockTowerData.width;
        this.height = clockTowerData.height;

        this.x = clockTowerData.currentLocation.x
        this.y = clockTowerData.currentLocation.y

        this.scale = Math.floor(tileSize/16)
        this.tileSize = tileSize; 
    }

    getPositionFromTime(){
        let dt = new Date();
        dt.setTime(dt.getTime()+dt.getTimezoneOffset()*60*1000);
        let offset = -300; //Timezone offset for EST in minutes.
        let estDate = new Date(dt.getTime() + offset*60*1000);
    
        // let hour = estDate.getSeconds()
        let hour = estDate.getHours()
    
        if(hour === 0 || hour === 12){
            return 0
        }else if (hour === 1 || hour === 13){
            return 1
        }else if (hour === 2 || hour === 14){
            return 2
        }else if (hour === 3 || hour === 15){
            return 3
        }else if (hour === 4 || hour === 16){
            return 4
        }else if (hour === 5 || hour === 17){
            return 5
        }else if (hour === 6 || hour === 18){
            return 6
        }else if (hour === 7 || hour === 19){
            return 7
        }else if (hour === 8 || hour === 20){
            return 8
        }else if (hour === 9 || hour === 21){
            return 9
        }else if (hour === 10 || hour === 22){
            return 10
        }else if (hour === 11 || hour === 23){
            return 11
        }
    }

    draw(ctx){
        let frameX = this.getPositionFromTime();

        ctx.drawImage(
            this.image, // image
            frameX*this.width, // source x
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