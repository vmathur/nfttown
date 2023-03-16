import { tileMap } from "../data/tileConstants"

export function Map(ctx){
    let mapTiles = new MapTiles();
    let tileImage = new Image();   // Create new img element
    tileImage.src = './assets/tiles.png'; // Set source path
    mapTiles.draw(ctx, tileMap, tileImage)

    let house1 = new MapObjects('./assets/house.png', tileMap.tsize);
    let house2 = new MapObjects('./assets/house.png', tileMap.tsize);
    let house3 = new MapObjects('./assets/house.png', tileMap.tsize);
    let house4 = new MapObjects('./assets/house.png', tileMap.tsize);

    house1.draw(ctx, 2,1, 128,128)
    house2.draw(ctx, 5,1, 128,128)
    house3.draw(ctx, 15,12, 128,128) //house3.draw(ctx, 15,13, 128,128)
    house4.draw(ctx, 18,12, 128,128) //house4.draw(ctx, 18,13, 128,128)


    let townhall = new MapObjects('./assets/townhall.png',tileMap.tsize);
    townhall.draw(ctx, 18, 0, 320,192)
}

class MapTiles {
    draw(ctx, tileMap, img){  
        for(let i = 0; i<tileMap.tiles.length; i++){
            for (let c = 0; c < tileMap.cols; c++) {
                for (let r = 0; r < tileMap.rows; r++) {
                    let tile = tileMap.getTile(i, c, r);
                    // let tile = tileMap.getTile(c, r);
                    if (tile !== 0) { // 0 => empty tile
                        ctx.drawImage(
                            img, // image
                            (tile - 1) * tileMap.sourceTileHeight, // source x
                            0, // source y
                            64, // source width
                            64, // source height
                            c * tileMap.tsize, // target x
                            r * tileMap.tsize, // target y
                            tileMap.tsize, // target width
                            tileMap.tsize // target height
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