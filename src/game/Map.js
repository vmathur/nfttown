import { tileMap, zoneMap } from "../data/tileConstants"
import { clockTowerData, welcomeBannerData, pondData, housesByZoneData } from "../data/objectData";
import ClockTower from "./ClockTower";
import WelcomeBanner from "./WelcomeBanner";
import AnimatedObject from "./AnimatedObject";

export function Map(ctx, selectedZone){
    let tileImage = new Image();   // Create new img element
    tileImage.src = './assets/tilesv3.png'; // Set source path
    let zoneTiles = new ZoneTiles();
    zoneTiles.draw(ctx, selectedZone, tileImage);

    let zoneHouses = new MapObjects('./assets/house.png', tileMap.tsize);
    for(let i=0;i<housesByZoneData[selectedZone-1].length;i++){
        zoneHouses.draw(ctx, housesByZoneData[selectedZone-1][i][0],housesByZoneData[selectedZone-1][i][1], 128,128)
    }
    
    if(selectedZone===1){
        let clockTower = new ClockTower(clockTowerData, tileMap.tsize)
        clockTower.draw(ctx)
        let welcomeBanner = new WelcomeBanner(welcomeBannerData, tileMap.tsize)
        welcomeBanner.draw(ctx)
        let townhall = new MapObjects('./assets/townhall.png',tileMap.tsize);
        townhall.draw(ctx, 18, 0, 320,192)

        let pond = new AnimatedObject(pondData, tileMap.tsize)
        pond.draw(ctx)
    }
}

class ZoneTiles {
    draw(ctx, selectedZone, img){  
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