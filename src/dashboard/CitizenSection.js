import React from 'react';
import "./CitizenSection.css"
import { getHealthRemaining, getAgeInHours } from '../game/utils';
import ProgressBar from "@ramonak/react-progress-bar";
import { AiFillHeart } from 'react-icons/ai';
import { HiInformationCircle } from 'react-icons/hi'
import { feed, clean } from '../contract/contractFunctions'

function CitizenSection(props) {
    let tokenId = props.stats.tokenId;
    let selected = props.selected;
    let health = getHealthRemaining(props.stats.lastFed, props.stats.maxTime)
    let isOwner = props.isOwner
    let canClean = props.canClean
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
      ageLabel =  Math.floor(ageInHours/24) + ' days old '
    }else if (ageInHours<48 && ageInHours >= 2){
      ageLabel =  ageInHours + ' hours old '
    }else{
      ageLabel = 'New born '
    }

    if(health<=0){
      ageLabel = 'Departed NFT Town '
    }

    const infoClickHandler = () => {
      let modalData = {
        tokenId: tokenId,
        animalId: props.stats.animalId,
        color: props.stats.color,
        lastFed: props.stats.lastFed,
        maxTime: props.stats.maxTime,
        birthDate: props.stats.birthDate,
        owner: props.stats.owner
      }
      props.clickInfoHandler(modalData);

    }

    const callFeed = async () =>{
      props.setIsUpdating(true)
      try{
        await feed(props.stats.tokenId, props.account, props.setCitizens, props.setInitiatlActions)
      }catch(error){
        console.log(error)
      }
      props.setIsUpdating(false)
    }

    const callClean = async () =>{
      props.setIsUpdating(true)
      try{
        await clean(props.stats.tokenId, props.account, props.setCitizens, props.setInitiatlActions)
      }catch(error){
        console.log(error)
      }
      props.setIsUpdating(false)
    }

    return (
      <div>
        <div className={"citizen-section " + (selected?'selected':'')}>
          <div className="citizen-section-image" alt="" style={{backgroundImage: "url("+img}}/>
          <div className="citizen-section-item-text">
            <span className='info-line'>{ageLabel}&nbsp;
              <HiInformationCircle
                className="info-icon"
                onClick={infoClickHandler}
                size={20}
                            />
            </span></div>
          <div>
            <span><AiFillHeart
              className="heart-icon"
              color={'red'}
              size={20}
            />
            <ProgressBar 
              className="citizen-section-health" 
              completed={health} 
              bgColor={bgColor}
              isLabelVisible={false}
              // labelAlignment={'center'}
              /></span>
          </div>
          {props.account ? 
            <div className="citizen-section-item">
              {!canClean && isOwner ? 
              <button className="feed-button button-primary"onClick={callFeed}>Feed</button> 
              : ''}
              {canClean ? 
                <button className="feed-button button-secondary" onClick={callClean}>Remove</button>
              :''}
            </div> : ''}
        </div>
      </div>
    );
  }
  
  export default CitizenSection;
  