import {behaviorLoops} from "../data/characterData" 
 

export function getHealthRemaining(lastFed, maxTime){
    let elapsedTime = getElapsedTime(lastFed);
    let hoursRemaining = Math.floor( (maxTime - elapsedTime)/3600)

    let health = Math.floor(100*(hoursRemaining/(maxTime/3600)));
    health = health > 0 ? health : 0;
    
    return health
}

export function getAgeInHours(birthDate){
    let elapsedHours = Math.floor(getElapsedTime(birthDate)/(60*60));
    return elapsedHours
}

function getElapsedTime(lastFedTime){
    let lastFed = new Date(0);
    lastFed.setUTCSeconds(lastFedTime);
    let currentDateTime = new Date();
    let elapsedTime = Math.floor((currentDateTime.getTime()-lastFed.getTime())/1000);
    return elapsedTime;
}

export function utcToDate(elapsedTime){
    var d = new Date(0);
    d.setUTCSeconds(elapsedTime)
    return d.toLocaleString()
}
  
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

export function getBehaviorLoop(currentAction){
    let behaviorLoop = behaviorLoops[currentAction].behaviorLoop
    return behaviorLoop
}