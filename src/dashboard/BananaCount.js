import React, { useState, useEffect } from 'react';

function BananaCount(props) {
    const maxBananas = props.maxBananas;
    const bananasEatRate = props.eatRate;
    const updateFrequency = 2;
    const [count, setCount] = useState(maxBananas);
    const [lastReplenished, setLastReplenished] = useState(new Date());

    function getLatestBananaCount(){
        let currentTime = new Date ()
        let timeElapsed = new Date((currentTime - lastReplenished)).getSeconds()
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
            setCount(getLatestBananaCount())
        }, updateFrequency*1000);
    
        return () => clearInterval(intervalId);
      }, [count]);


    return (
      <div className="banana-count">
        <div><h1>{props.animal}</h1></div>
        <div><h2>Bananas remaining: {count}</h2></div>
        <div><button onClick={replenishBananaSupply}>Refill</button></div>
      </div>
  
    );
  }
  
  export default BananaCount;
  