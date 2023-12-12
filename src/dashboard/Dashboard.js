import React from 'react';
import './Dashboard.css';
import CitizenSection from './CitizenSection';
import { getHealthRemaining } from '../game/utils';
import { mint } from "../contract/contractFunctions"

function Dashboard({charactersRef, account, ownedCitizens, selectedCitizen, clickInfoHandler, setCitizens, setOwnedCitizens, setIsUpdating, setInitiatlActions}) {
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
        console.log(error)
      }
      setIsUpdating(false)
    }

    return (
      <div className="citizen-container">
        {!account && charactersRef.current.length<4 ? <div className="login-message"><i>Connect wallet to mint and feed</i></div> : ''}
        <div className="citien-section-container">{allSections}</div>
        {account && charactersRef.current.length<4 ? <button onClick={callMint} className="mint-button button-secondary">Mint a citizen</button> : ''}
      </div>
    );
  }
  
  export default Dashboard;
  