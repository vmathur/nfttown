import React from 'react';
import "./CitizenSection.css"
import { getHealthRemaining, utcToDate } from '../game/utils';

function CitizenSection(props) {
    let tokenId = props.stats.tokenId;
    let selected = props.selected;
    let health = getHealthRemaining(props.stats.lastFed, props.stats.maxTime)
    let animalId = props.stats.animalId
    let isOwner = props.isOwner
    let canClean = props.canClean
    let animalMapping = ['monkey', 'penguin', 'dog', 'turtle']
    let feedByDate = utcToDate(parseInt(props.stats.lastFed)+parseInt(props.stats.maxTime))
    let img = props.stats.imgSource;
    console.log(img)
    return (
      <div>
        <div className={"citizen-section " + (selected?'selected':'')}>
          <div className="citizen-section-image" alt="" style={{backgroundImage: "url("+img}}/>
          <div className="citizen-section-item">ID: {tokenId}</div>
          <div className="citizen-section-item">{health}% health</div>
          {isOwner && !canClean ? <div className="citizen-section-item"><button className="feed-button button-primary"onClick={(e)=>props.feed(tokenId)}>Feed</button></div> : ''}
          {props.account && canClean? <div className="citizen-section-item"><button className="feed-button button-secondary" onClick={(e)=>props.clean(tokenId)}>Remove</button></div> : ''}
        </div>
        {isOwner ? <div className="citizen-section-item feedby"><i>Feed by {feedByDate}</i></div> : ''}
      </div>
    );
  }
  
  export default CitizenSection;
  