export function removeDepartedCitizens(citizens){
    let filteredCitizens = []
    for(let citizen of citizens){
        if(getHealthRemaining(citizen.lastFed, citizen.maxTime)>0){
            filteredCitizens.push(citizen);
        }
    }
    return filteredCitizens
}


export function getHealthRemaining(lastFed, maxTime){
    let elapsedTime = getElapsedTime(lastFed);
    let hoursRemaining = Math.floor( (maxTime - elapsedTime)/3600)

    let health = Math.floor(100*(hoursRemaining/(maxTime/3600)));
    health = health > 0 ? health : 0; //if health is less than 0, it should be 0
    health = health > 94 ? 100 : health; //if health is greater than 95s, it should be 100
    
    return health
}

function getElapsedTime(lastFedTime){
    let lastFed = new Date(0);
    lastFed.setUTCSeconds(lastFedTime);
    let currentDateTime = new Date();
    let elapsedTime = Math.floor((currentDateTime.getTime()-lastFed.getTime())/1000);
    return elapsedTime;
}
