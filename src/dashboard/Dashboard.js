import React from 'react';
import './Dashboard.css';
import CitizenSection from './CitizenSection';
import { getHealthRemaining } from '../game/utils';

function Dashboard({charactersRef, account, ownedCitizens, mint, clean, feed}) {

    const allSections = charactersRef.current.map((citizen) => {
      let canClean = getHealthRemaining( parseInt(citizen.lastFed), parseInt(citizen.maxTime)) === 0 ? true : false;
      let isOwner = ownedCitizens.includes(citizen.tokenId);
  
      return (
        <div>
          <CitizenSection 
            id={citizen.tokenId} 
            key={citizen.tokenId}
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
        {account && charactersRef.current.length<4 ? <button onClick={mint} className="mint-button button-secondary">Mint to own</button> : ''}
        <div>{allSections}</div>
      </div>
    );
  }
  
  export default Dashboard;
  