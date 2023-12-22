export function getOwnedCitizenZoneFromCitizens(ownedCitizen, citizens){
    let zone = 1;
    let tokenId = ownedCitizen[0]
    for(let i=0;i<citizens.length;i++){
      if(citizens[i].tokenId===tokenId){
        zone=Math.floor(i/4)+1
      }
    }
    return zone;
}

export function map1Dto2DArray(arr, row, col){
  let grid = makeArray(row,col);
  let k = 0;
  for(let i= 0; i<row;i++){
    for(let j=0;j<col;j++){
      grid[i][j]=(arr[k]).toNumber()
      k++
    }
  }
  return grid;
}

function makeArray(d1, d2) {
  var arr = [];
  for(let i = 0; i < d1; i++) {
      arr.push(new Array(d2));
  }
  return arr;
}