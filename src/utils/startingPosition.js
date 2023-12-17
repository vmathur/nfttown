export function startingPosition(){
    let xRange = [500,1000]
    let yRange = [300,800]

    let x = Math.floor(Math.random() * (xRange[1] - xRange[0] + 1)) + xRange[0];
    let y = Math.floor(Math.random() * (yRange[1] - yRange[0] + 1)) + yRange[0];
    return {x:x, y:y}
}