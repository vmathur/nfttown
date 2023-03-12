import React from 'react';
import "./CitizenSection.css"
import { getHealthRemaining, utcToDate } from '../game/utils';

function CitizenSection(props) {
    let tokenId = props.stats.tokenId;
    let health = getHealthRemaining(props.stats.lastFed, props.stats.maxTime)
    let animalId = props.stats.animalId
    let isOwner = props.isOwner
    let canClean = props.canClean
    let animalMapping = ['monkey', 'penguin', 'dog', 'turtle']
    let feedByDate = utcToDate(parseInt(props.stats.lastFed)+parseInt(props.stats.maxTime))


    return (
      <div className="citizen-section">
        <div><b>ID:</b> {tokenId}</div>
        <div><b>animal:</b> {animalMapping[animalId]}</div>
        <div><b>health: </b>{health}%</div>
        <div><b>Feed by: </b>{feedByDate}</div>

        {isOwner ? <div><i>*you own this citizen</i></div>: ''}
        {isOwner && !canClean ? <button className="feed-button button-primary"onClick={(e)=>props.feed(tokenId)}>Feed</button> : ''}
        {props.account && canClean? <button className="feed-button button-secondary" onClick={(e)=>props.clean(tokenId)}>Remove</button> : ''}
      </div>
    );
  }
  
  export default CitizenSection;
  