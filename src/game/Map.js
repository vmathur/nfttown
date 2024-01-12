import { tileMap, zoneMap } from "../data/tileConstants"
import { clockTowerData, welcomeBannerData, pondData, housesByZoneData } from "../data/objectData";
import ClockTower from "./ClockTower";
import WelcomeBanner from "./WelcomeBanner";
import AnimatedObject from "./AnimatedObject";
import Arrows from "./Arrows";

export default class Map {
    constructor(selectedZone){
        let tileImage = new Image();   // Create new img element
        tileImage.src = './assets/tilesv3.png'; // Set source path
        this.tileImage= tileImage;

        let zoneTiles = new ZoneTiles();
        this.zoneTiles=zoneTiles;

        let zoneHouses = new MapObjects('./assets/house.png', tileMap.tsize);
        this.zoneHouses=zoneHouses;

        let arrows = new Arrows(selectedZone, tileMap.tsize);
        this.arrows = arrows;
    
        let clockTower = new ClockTower(clockTowerData, tileMap.tsize)
        this.clockTower = clockTower;
    
        let welcomeBanner = new WelcomeBanner(welcomeBannerData, tileMap.tsize)
        this.welcomeBanner = welcomeBanner;

        let townhall = new MapObjects('./assets/townhall.png',tileMap.tsize);
        this.townhall = townhall;

        let pond0 = new AnimatedObject(pondData[0], tileMap.tsize)
        this.pond0=pond0;

        let pond1 = new AnimatedObject(pondData[1], tileMap.tsize)
        this.pond1=pond1;

        let pond2 = new AnimatedObject(pondData[2], tileMap.tsize)
        this.pond2=pond2;

        let pond3 = new AnimatedObject(pondData[3], tileMap.tsize)
        this.pond3=pond3;

    }
        
    draw(ctx, selectedZone){
        this.zoneTiles.draw(ctx, selectedZone, this.tileImage);

        for(let i=0;i<housesByZoneData[selectedZone-1].length;i++){
            this.zoneHouses.draw(ctx, housesByZoneData[selectedZone-1][i][0],housesByZoneData[selectedZone-1][i][1], 128,128)
        }

        if(selectedZone===1){
            this.clockTower.draw(ctx)
            this.welcomeBanner.draw(ctx)
            this.townhall.draw(ctx, 18, 0, 320,192)

            this.pond0.draw(ctx)
        }else if(selectedZone===4){
            this.pond1.draw(ctx)
        }else if(selectedZone===5){
            this.pond2.draw(ctx)
        }else if(selectedZone===6){
            this.pond3.draw(ctx)
        }

        this.arrows.drawImages(ctx);
    }
}
class ZoneTiles {
    draw(ctx, selectedZone, img){
        if(!zoneMap.zoneLayer[selectedZone-1]){
            return;
        }  
        for(let i = 0; i<zoneMap.zoneLayer[selectedZone-1].length; i++){
            for (let c = 0; c < zoneMap.cols; c++) {
                for (let r = 0; r < zoneMap.rows; r++) {
                    let tile = zoneMap.getTile(selectedZone, i, c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            img, // image
                            (tile - 1) * zoneMap.sourceTileHeight, // source x
                            0, // source y
                            64, // source width
                            64, // source height
                            c * zoneMap.tsize, // target x
                            r * zoneMap.tsize, // target y
                            zoneMap.tsize, // target width
                            zoneMap.tsize // target height
                        );
                    }
                } 
            }
        }
    }
}

class MapObjects {
    constructor(imageSource, tsize){
        let image = new Image();  
        image.src = imageSource;
        this.scale = Math.floor(tsize/16)
        this.image = image;
        this.tsize = tsize;
    }

    draw(ctx, x, y, width, height){  
        ctx.drawImage(
            this.image, // image
            0, // source x
            0, // source y
            width, // source width
            height, // source height
            x*16*this.scale, // target x
            y*16*this.scale, // target y
            width/(64/this.tsize), // target width
            height/(64/this.tsize) // target height
        );
    }
}