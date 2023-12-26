import React from 'react';
import './Dashboard.css';
import CitizenSection from './CitizenSection';
import { getHealthRemaining } from '../game/utils';
import { mint, getOwnedCitizens } from "../contract/contractFunctions"
import { maxCitizens } from "../utils/constants"
import { getOwnedCitizenZoneFromCitizens } from '../utils/zones';

function Dashboard({charactersRef, account, ownedCitizens, clickInfoHandler, setCitizens, setOwnedCitizens, setIsUpdating, setInitiatlActions, citizens, setSelectedZone}) {
    let canMint = ownedCitizens.length > 0 ? false : true;
    let renderActions = false;
    // eslint-disable-next-line array-callback-return
    charactersRef.current.map((citizen)=>{
      renderActions = renderActions || (ownedCitizens.includes(citizen.tokenId)) || getHealthRemaining( parseInt(citizen.lastFed), parseInt(citizen.maxTime)) === 0 ? true : false;
    })
    renderActions = renderActions && account;

    const allSections = charactersRef.current.map((citizen) => {
      let canClean = (getHealthRemaining( parseInt(citizen.lastFed), parseInt(citizen.maxTime)) === 0 ? true : false)&&account;
      let isOwner = ownedCitizens.includes(citizen.tokenId);
      let selected = citizen.tokenId===ownedCitizens[0];
      return (
        <div key={citizen.tokenId}>
          <CitizenSection 
            id={citizen.tokenId} 
            selected={selected}
            account={account} 
            stats={citizen}
            isOwner={isOwner}
            clickInfoHandler={clickInfoHandler}
            setIsUpdating={setIsUpdating}
            setInitiatlActions={setInitiatlActions}
            renderActions={renderActions}
            setCitizens={setCitizens}
            canClean={canClean}/>
        </div>
      )
    });

    const callMint = async () =>{
      setIsUpdating(true);
      try{
        await mint(setInitiatlActions, setCitizens, setOwnedCitizens, account)
        let owned = await getOwnedCitizens(setOwnedCitizens, account)
        let zone = getOwnedCitizenZoneFromCitizens(owned, citizens);
        setSelectedZone(zone);
      }catch(error){
        console.error(error)
      }
      setIsUpdating(false)
    }

    return (
      <div className="citizen-container">
        {!account && charactersRef.current.length<maxCitizens ? <div className="login-message"><i>Connect wallet</i></div> : ''}
        {canMint && account && charactersRef.current.length<maxCitizens ? <button onClick={callMint} className="mint-button button-primary">+ Mint a citizen</button> : ''}
        <div className="dashboard-mobile-message"><i>Open on a larger display to view the town</i></div>
        <div className="citien-section-container">{allSections}</div>
      </div>
    );
  }
  
  export default Dashboard;
  