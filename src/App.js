import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import React, {useRef, useEffect, useState} from 'react'
import { Magic } from "magic-sdk";
import {spriteData, startingLocation} from './data/characterData'
import {abi} from "./contract/abi"

const Web3 = require('web3');

const magic = new Magic("pk_live_1028C005B37C96E7", {
  network: "goerli",
});
const web3 = new Web3(magic.rpcProvider);
const contractAddress ='0x4F2200E53F90fDFd1E2ebcD05A221596bc545897'

console.log(magic)

function App() {
  const [citizens, setCitizens] = useState([]);
  const [getCitizenDone, setGetCitizenDone] = useState(false)
  const [account, setAccount] = useState(localStorage.getItem('user'));

  // const accounts = magic.wallet.connectWithUI();

  async function handleLogin(){
    await magic.wallet.connectWithUI().then(data=>{
      setAccount(data)
    })
  }

  async function handleLogout(){
    await magic.wallet.disconnect().then(data=>{
      setAccount("")
    })
  }

  async function showWallet(){
    console.log('hello2')
    const walletInfo = await magic.wallet.getInfo();
    const walletType = walletInfo.walletType;
    if (walletType === "magic") {
      await magic.wallet.showUI();
    };
  }

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
      {!account? <button onClick={handleLogin}>Connect</button> : <div><button onClick={showWallet}>Show wallet</button><button onClick={handleLogout}>Disconnect</button></div>}
      { getCitizenDone ? <Board charactersRef={characters}/>: 'loading'}
      <Dashboard charactersRef={characters}/>
    </div>
  );
}

export default App;
