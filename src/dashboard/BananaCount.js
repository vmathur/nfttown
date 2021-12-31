import React, { useState, useEffect } from 'react';
import './BananaCount.css'

function BananaCount(props) {
    const maxBananas = props.characters.current[props.id].maxBananas;
    const bananasEatRate = props.characters.current[props.id].eatRate;
    const updateFrequency = 1;
    const [count, setCount] = useState(maxBananas);
    const [lastReplenished, setLastReplenished] = useState(new Date());

    function getLatestBananaCount(){
        let currentTime = new Date ()
        let timeElapsed = Math.floor((currentTime - lastReplenished)/1000)
        let bananasEaten = Math.floor(timeElapsed*bananasEatRate)
        let bananasRemaining = maxBananas-bananasEaten
        bananasRemaining = bananasRemaining > 0 ? bananasRemaining : 0
        return bananasRemaining
    }

    function replenishBananaSupply(){
        setLastReplenished(new Date())
        setCount(maxBananas)
    }

    useEffect(() => {    
        const intervalId = setInterval(() => {
          let latestBananaCount = getLatestBananaCount()
            setCount(latestBananaCount)
            props.characters.current[props.id].bananasRemaining = latestBananaCount
        }, updateFrequency*1000);
    
        return () => clearInterval(intervalId);
      }, [count]);


    return (
      <div className="banana-count">
        <div className="banana-count-container">
          <div className="count-section"><h2>{props.id}'s bananas: {count}</h2></div>
          <div className="count-section"><button className="refill-button" onClick={replenishBananaSupply}>Refill</button></div>
        </div>
        <i>{count===0? 'Press refill to add more bananas':''}</i>
      </div>
  
    );
  }
  
  export default BananaCount;
  