import React, { useState, useEffect } from 'react';

function BananaCount(props) {
    const maxBananas = props.characters.current[props.id].maxBananas;
    const bananasEatRate = props.characters.current[props.id].eatRate;
    const updateFrequency = 1;
    const [count, setCount] = useState(maxBananas);
    const [lastReplenished, setLastReplenished] = useState(new Date());

    function getLatestBananaCount(){
        let currentTime = new Date ()
        let timeElapsed = Math.floor((currentTime - lastReplenished)/1000)
        let bananasRemaining = maxBananas-(timeElapsed*bananasEatRate)
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
        <div><h1>{props.id}</h1></div>
        <div><h2>Bananas remaining: {count}</h2></div>
        <div><button onClick={replenishBananaSupply}>Refill</button></div>
      </div>
  
    );
  }
  
  export default BananaCount;
  