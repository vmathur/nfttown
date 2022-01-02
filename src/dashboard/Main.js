import React from 'react';
import BananaCount from './BananaCount'

function Main(props) {
    let characterIds = Object.keys(props.characters.current)
    const allCounts = characterIds.map((characterId) =>
      <BananaCount id={characterId} key={characterId} characters={props.characters}/>
    );
    return (
      <div className="banana-count">
        <div><h1>Bananas left</h1></div>
        {allCounts}
      </div>
    );
  }
  
  export default Main;
  