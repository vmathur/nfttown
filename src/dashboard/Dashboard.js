import React from 'react';
import './Dashboard.css';
import CitizenSection from './CitizenSection';
import { getHealthRemaining } from '../game/utils';

function Dashboard({charactersRef, account, ownedCitizens, selectedCitizen, mint, clean, feed}) {
    const allSections = charactersRef.current.map((citizen) => {
      let canClean = getHealthRemaining( parseInt(citizen.lastFed), parseInt(citizen.maxTime)) === 0 ? true : false;
      let isOwner = ownedCitizens.includes(citizen.tokenId);
      let selected = citizen.tokenId===String(selectedCitizen)?true:false
  
      return (
        <div>
          <CitizenSection 
            id={citizen.tokenId} 
            key={citizen.tokenId}
            selected={selected}
            account={account} 
            stats={citizen}
            isOwner={isOwner}
            canClean={canClean}
            clean={clean}
            feed={feed}/>
        </div>
      )
    });

    return (
      <div className="citizen-container">
        {!account && charactersRef.current.length<4 ? <i>Login to mint and feed</i> : ''}
        <div className="citien-section-container">{allSections}</div>
        {account && charactersRef.current.length<4 ? <button onClick={mint} className="mint-button button-secondary">Mint new NFTZen</button> : ''}
      </div>
    );
  }
  
  export default Dashboard;
  