import { arrowsData } from "../data/objectData";

const zoneToArrowMap = [
    //1
    [1,2,3],
    //2
    [2,3,4],
    //3
    [3,4],
    //4
    [1,3,4],
    //5
    [1,4],
    //6
    [1,2,4],
    //7
    [1,2],
    //8
    [1,2,3],
    //9
    [2,3]
]

export default class Arrows {
    constructor(selectedZone, tileSize){
        let image = new Image();  
        image.src = arrowsData.imgSource;
        this.image = image;

        this.width = arrowsData.width;
        this.height = arrowsData.height;

        this.scale = Math.floor(tileSize/24)
        this.tileSize = tileSize; 

        this.arrowIDs = zoneToArrowMap[selectedZone-1]
    }

    drawImages(ctx){
        for(let arrowID of this.arrowIDs){
            let arrowLocation = arrowsData.arrowLocations[arrowID-1]
            this.draw(ctx, arrowID, arrowLocation)
        }
    }

    draw(ctx, arrowID, arrowLocation){
        ctx.drawImage(
            this.image, // image
            (arrowID-1)*this.width, // source x
            0, // source y
            this.width, // source width
            this.height, // source height
            arrowLocation[0], // target x
            arrowLocation[1], // target y
            this.width*this.scale, // target width
            this.height*this.scale // target height
        );
    }
}