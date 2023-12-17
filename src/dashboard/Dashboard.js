import React from 'react';
import './Dashboard.css';
import CitizenSection from './CitizenSection';
import { getHealthRemaining } from '../game/utils';
import { mint } from "../contract/contractFunctions"
import { maxCitizens } from "../utils/constants"

function Dashboard({charactersRef, account, ownedCitizens, selectedCitizen, clickInfoHandler, setCitizens, setOwnedCitizens, setIsUpdating, setInitiatlActions}) {
    let canMint = ownedCitizens.length > 0 ? false : true;
    let renderActions = false;
    // eslint-disable-next-line array-callback-return
    charactersRef.current.map((citizen)=>{
      renderActions = renderActions || (ownedCitizens.includes(citizen.tokenId)) || getHealthRemaining( parseInt(citizen.lastFed), parseInt(citizen.maxTime)) === 0 ? true : false;
    })

    const allSections = charactersRef.current.map((citizen) => {
      let canClean = getHealthRemaining( parseInt(citizen.lastFed), parseInt(citizen.maxTime)) === 0 ? true : false;
      let isOwner = ownedCitizens.includes(citizen.tokenId);
      let selected = citizen.tokenId===String(selectedCitizen)?true:false
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
      }catch(error){
        console.error(error)
      }
      setIsUpdating(false)
    }

    return (
      <div className="citizen-container">
        {!account && charactersRef.current.length<maxCitizens ? <div className="login-message"><i>Connect wallet to mint and feed</i></div> : ''}
        {canMint && account && charactersRef.current.length<maxCitizens ? <button onClick={callMint} className="mint-button button-secondary">+ Mint a citizen</button> : ''}
        <div className="citien-section-container">{allSections}</div>
      </div>
    );
  }
  
  export default Dashboard;
  