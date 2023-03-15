import React from 'react';
import "./CitizenSection.css"
import { getHealthRemaining, getAgeInHours } from '../game/utils';
import ProgressBar from "@ramonak/react-progress-bar";

function CitizenSection(props) {
    let tokenId = props.stats.tokenId;
    let selected = props.selected;
    let health = getHealthRemaining(props.stats.lastFed, props.stats.maxTime)
    let isOwner = props.isOwner
    let canClean = props.canClean
    // let feedByDate = utcToDate(parseInt(props.stats.lastFed)+parseInt(props.stats.maxTime))
    let ageInHours = getAgeInHours(props.stats.birthDate);
    let img = props.stats.imgSource;
    let ageLabel = ''
    let bgColor = ''

    if(health > 60){
      bgColor = 'PaleGreen'
    }else if (health<=60 && health > 20){
      bgColor = 'SandyBrown'
    }else{
      bgColor = 'LightCoral'
    }

    if(ageInHours >= 48){
      ageLabel =  Math.floor(ageInHours/24) + ' days old'
    }else if (ageInHours<48 && ageInHours >= 2){
      ageLabel =  ageInHours + ' hours old'
    }else{
      ageLabel = 'New born'
    }

    if(health<=0){
      ageLabel = 'Left NFT Town'
    }

    return (
      <div>
        <div className={"citizen-section " + (selected?'selected':'')}>
          <div className="citizen-section-image" alt="" style={{backgroundImage: "url("+img}}/>
          <div className="citizen-section-item">{ageLabel}</div>
          <ProgressBar 
            className="citizen-section-health" 
            completed={health} 
            bgColor={bgColor}
            isLabelVisible={false}
            // labelAlignment={'center'}
            />
          {isOwner && !canClean ? <div className="citizen-section-item"><button className="feed-button button-primary"onClick={(e)=>props.feed(tokenId)}>Feed</button></div> : ''}
          {props.account && canClean? <div className="citizen-section-item"><button className="feed-button button-secondary" onClick={(e)=>props.clean(tokenId)}>Remove</button></div> : ''}
        </div>
        {/* {isOwner ? <div className="citizen-section-item feedby"><i>Feed by {feedByDate}</i></div> : ''} */}
      </div>
    );
  }
  
  export default CitizenSection;
  