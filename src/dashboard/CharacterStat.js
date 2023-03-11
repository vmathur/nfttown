import React from 'react';
import {utcToDate} from './../game/utils'
import { getHealthRemaining } from './../game/utils';

function CharacterStat(props) {
    let tokenId = props.stats.tokenId;
    let health = getHealthRemaining(props.stats.lastFed, props.stats.maxTime)
    let lastFed = props.stats.lastFed

    return (
      <div className="character-stats">
        <div><b>tokenID:</b> {tokenId}</div>
        <div><b>health: </b>{health}%</div>
        <div><b>lastFed: </b>{utcToDate(lastFed)}</div>
      </div>
    );
  }
  
  export default CharacterStat;
  