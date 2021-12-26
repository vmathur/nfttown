import {behaviorLoops} from "../data/characterData" 
 

export function WallCollision(charObject, canvas){
    if(charObject.y - charObject.rad <= 0 || charObject.y + charObject.rad >= canvas.height){
        charObject.dy *=-1
    }

    if(charObject.x + charObject.rad >= canvas.width || charObject.x - charObject.rad <=0){
        charObject.dx *=-1
    }
}

export function getNextAction(currentAction){
    let sumWeights = 0;
    for(let state of behaviorLoops[currentAction].next){
        sumWeights+=state.weight
    }
    let selectionIndex = Math.random()*sumWeights;

    sumWeights = 0;
    for(let state of behaviorLoops[currentAction].next){
        sumWeights+=state.weight

        if(sumWeights>=selectionIndex){
            return [state.id, behaviorLoops[state.id]]
        }
    }
}