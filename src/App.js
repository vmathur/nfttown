import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import React, {useRef, useEffect, useState} from 'react'
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import {spriteData, startingLocation} from './data/characterData'
import {abi} from "./contract/abi"

const Web3 = require('web3');

const magic = new Magic("pk_live_73AAE8A5F81B1CF3", {
  network: "goerli",
  locale: "en_US",
  extensions: [new ConnectExtension()]
});
const web3 = new Web3(magic.rpcProvider);
const contractAddress ='0x4F2200E53F90fDFd1E2ebcD05A221596bc545897'


function App() {
  const [citizens, setCitizens] = useState([]);
  const [getCitizenDone, setGetCitizenDone] = useState(false)

  let characterData3 = []
  for (const [i, citizen] of citizens.entries()){
    if(i>=4){break} //can only render 4 NFTs right now
    let spriteMap = spriteData[String(citizen.animal)];
    let currentLocation = startingLocation[String(i)]


    characterData3.push({
      animalId: citizen.animal,
      tokenId: citizen.tokenId,
      lastFed: citizen.lastFed,
      maxTime: citizen.maxTime,
      width: spriteMap.width,
      height: spriteMap.height,
      imgSource : spriteMap.imgSource,
      currentAction: spriteMap.currentAction,
      currentLocation: currentLocation,
    });
  }

  let characters = useRef([])
  characters.current=characterData3

  useEffect(() => {
    getCitizens();
  },[]);

  const getCitizens = async () => {
    console.log('About to fetch latest citizens')
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.getAllTokens().call().then(setCitizens);
    setGetCitizenDone(true)
    console.log('updated')

  }


  return (
    <div className="App">
      { getCitizenDone ? <Board charactersRef={characters}/>: 'loading'}
      <Dashboard charactersRef={characters}/>
    </div>
  );
}

export default App;
