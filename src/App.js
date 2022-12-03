import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Main'
import React, {useRef, useEffect, useState} from 'react'
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import {initialCharacterParams} from './data/characterData'
import {abi} from "./contract/abi"
import Character from './game/Character';

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

  let characterData = {}
  for (let character of initialCharacterParams){
    characterData[character.id] = {
      maxBananas: character.maxBananas, 
      bananasRemaining: character.maxBananas, 
      eatRate: character.eatRate
    }
  }
  
  let characterData2 = {}
  for (let citizen of citizens){
    let values = mapDataToBananas(citizen.lastFed, citizen.maxTime)
    characterData2[citizen.tokenId] = {
      maxBananas: values[0], 
      bananasRemaining: values[1],
      eatRate: values[2]
    }
  }
  console.log('data 1')
  console.log(characterData)
  console.log('data 2')
  console.log(characterData2)

  let characters = useRef(characterData)

  useEffect(() => {
    getCitizens();
  },[]);

  const getCitizens = async () => {
    console.log('About to fetch latest citizens')
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.getAllTokens().call().then(setCitizens);
    console.log('updated')

  }

  function mapDataToBananas(lastFed, maxTime){
    let maxBananas=maxTime/(60*60);
    let eatRate=0.25;
    let hoursRemaining = getHealth(lastFed, maxTime);
    let bananasRemaining = hoursRemaining > 0 ? hoursRemaining : 0;
 
    return [maxBananas, bananasRemaining, eatRate]
  }

  function getHealth(lastFedTime, maxTime){
    let elapsedTime = getElapsedTime(lastFedTime);
    let health = Math.floor( (maxTime - elapsedTime)/3600)
    return health;
  }


  function getElapsedTime(lastFedTime){
    let lastFed = new Date(0);
    lastFed.setUTCSeconds(lastFedTime);
    let currentDateTime = new Date();
    let elapsedTime = Math.floor((currentDateTime.getTime()-lastFed.getTime())/1000);
    return elapsedTime;
  }


  return (
    <div className="App">
      <div>{citizens[0]}</div>
      <Board characters={characters}/>
      <Dashboard characters={characters}/>
    </div>
  );
}

export default App;
