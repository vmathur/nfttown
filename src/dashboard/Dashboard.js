import React from 'react';
import CharacterStat from './CharacterStat';

function Dashboard({charactersRef}) {
    const allStats = charactersRef.current.map((data) => 
      <div>
        <CharacterStat id={data.tokenId} key={data.tokenId} stats={data}/>
        <button>Feed</button> 
      </div>
    );
    //todo add magic integration


    return (
      <div className="character-stat-container">
        <h1>Citizens</h1>
        <div>{allStats}</div>
      </div>
    );
  }
  
  export default Dashboard;
  