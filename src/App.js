import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'
import React, {useRef, useEffect, useState} from 'react'
import { Magic } from "magic-sdk";
import {spriteData, startingLocation} from './data/characterData'
import {abi} from "./contract/abi"

const Web3 = require('web3');

const magic = new Magic("pk_live_1028C005B37C96E7", {
  network: "goerli",
});
const web3 = new Web3(magic.rpcProvider);
const contractAddress ='0xdd8245b6394f31159c5d22a0e2526ab87838b5c9'

function App() {
  const [citizens, setCitizens] = useState([]);
  const [ownedCitizens, setOwnedCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [getCitizenDone, setGetCitizenDone] = useState(false)
  const [account, setAccount] = useState(localStorage.getItem('user'));
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
      color: citizen.color,
      birthDate: citizen.birthDate,
      width: spriteMap.width,
      height: spriteMap.height,
      imgSource : spriteMap.imgSource,
      currentAction: spriteMap.currentAction,
      currentLocation: currentLocation,
    });
  }

  let characters = useRef([])
  characters.current=characterData3

  const getCitizens = async () => {
    console.log('About to fetch latest citizens')
    setIsUpdating(true)
    const contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.getAllTokens().call().then(setCitizens);
    setIsUpdating(false)
    setGetCitizenDone(true)
    console.log('updated')
  }

  const getOwnedCitizens = async (account) => {
    console.log('About to fetch users citizens')
    setIsUpdating(true)
    const contract = new web3.eth.Contract(abi, contractAddress);
    await contract.methods.getAllOwnedTokenIDs().call({ from: account }).then(setOwnedCitizens);
    setIsUpdating(false)
    console.log('updated')
  }

  const feed = async (tokenId) => {
    console.log('calling feed contract')
    setIsUpdating(true)
    const contract = new web3.eth.Contract(abi, contractAddress);
    await contract.methods.feed(tokenId).send({ from: account });
    setIsUpdating(false)
    getCitizens();
  };

  const clean = async (tokenId) => {
    console.log('calling clean contract')
    setIsUpdating(true)
    const contract = new web3.eth.Contract(abi, contractAddress);
    await contract.methods.clean(tokenId).send({ from: account });
    setIsUpdating(false)
    getCitizens();
  };

  const mint = async () => {
    console.log('calling mint contract')
    setIsUpdating(true)
    const contract = new web3.eth.Contract(abi, contractAddress);
    const receipt = await contract.methods.mint().send({ from: account });
    console.log(receipt)
    setIsUpdating(false)
    getCitizens();
    getOwnedCitizens(account);
  };

  useEffect(() => {
    getCitizens();
  },[]);

  return (
    <div className="App">
      <Header account={account} setAccount={setAccount} getOwnedCitizens={getOwnedCitizens} setOwnedCitizens={setOwnedCitizens}/>
      {isUpdating? 'Loading ... ': ''}
      { getCitizenDone ? <Board charactersRef={characters} setSelectedCitizen={setSelectedCitizen}/>: 'loading'}
      <Dashboard charactersRef={characters} account={account} ownedCitizens={ownedCitizens} selectedCitizen={selectedCitizen} mint={mint} clean={clean} feed={feed}/>
    </div>
  );
}

export default App;

// todo:
// get real assets for dog and turtle + all colors
// add to polygon


// figure out how to scale tile sizes
// dao
// new animations
// animation optimization