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