export function WallCollision(charObject, canvas){
    if(charObject.y - charObject.rad <= 0 || charObject.y + charObject.rad >= canvas.height){
        charObject.dy *=-1
    }

    if(charObject.x + charObject.rad >= canvas.width || charObject.x - charObject.rad <=0){
        charObject.dx *=-1
    }
}