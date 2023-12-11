import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'
import React, {useRef, useEffect, useState} from 'react'
import Modal from 'react-modal';
import { Magic } from "magic-sdk";
import {spriteData, spriteDimensions, startingLocation} from './data/characterData'
import { abi } from "./contract/abi.js"
import { MdClose } from 'react-icons/md';

const polygonNode = {
  rpcUrl:'https://polygon-mumbai.g.alchemy.com/v2/9b1326CuGOhpxr_RhB2QoPXKpfbuJsDF',
  chainId: 80001, // Polygon chain id 
}
const magic = new Magic("pk_live_BFB02F3E6751D40B", {network: polygonNode});

const ethers = require('ethers')
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
const contractAddress ='0xb3d2381f29c2d0db43628a130f21b83772820499'

const contract = new ethers.Contract(
  contractAddress,
  abi,
  provider,
);

Modal.setAppElement('#root');

function App() {
  const [citizens, setCitizens] = useState([]);
  const [ownedCitizens, setOwnedCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [getCitizenDone, setGetCitizenDone] = useState(false)
  const [initialActions, setInitiatlActions] = useState({});
  const [account, setAccount] = useState(localStorage.getItem('user'));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalType, setModalType] = useState('help');

  let characterData3 = []
  for (const [i, citizen] of citizens.entries()){
    if(i>=4){break} //can only render 4 NFTs right now
    let spriteMap = spriteData[String(citizen.animal)][String(citizen.color)];
    let currentLocation = startingLocation[String(i)]
    characterData3.push({
      animalId: citizen.animal,
      tokenId: citizen.tokenId,
      lastFed: citizen.lastFed,
      maxTime: citizen.maxTime,
      color: citizen.color,
      birthDate: citizen.birthDate,
      width: spriteDimensions.width,
      height: spriteDimensions.height,
      imgSource : spriteMap.imgSource,
      currentAction: 'idle',
      currentLocation: currentLocation,
    });
  }

  let characters = useRef([])
  characters.current=characterData3

  //get all
  const getCitizens = async () => {
    console.log('Fetching latest citizens')
    setIsUpdating(true)

    const result = await contract.getAllTokens();
    const convertedCitizens = result.map(function(element) {
      console.log(element)
      return {
        animal : element.animal.toNumber(),
        birthDate: element.birthDate.toNumber(),
        color : element.color.toNumber(),
        lastFed: element.lastFed.toNumber(),
        maxTime: element.maxTime.toNumber(),
        tokenId: element.tokenId.toNumber()
      };
    });

    setCitizens(convertedCitizens)
    setGetCitizenDone(true)
    setIsUpdating(false)
    console.log('Fetched citizens')
  }

  //mint
  const mint = async () => {
    console.log('Calling mint')
    setIsUpdating(true)
    let transaction = await contract.populateTransaction.mint();
    await magic.wallet.sendGaslessTransaction(account,transaction)

    setIsUpdating(false)
    setInitiatlActions({})
    getCitizens();
    getOwnedCitizens(account);
    console.log('Minted')
  };

  //getOwnedCitizens
  const getOwnedCitizens = async (account) => {
    console.log('Fetching wallets citizens')
    setIsUpdating(true)

    const result = await contract.getAllOwnedTokenIDs(account);
    const newArray = result.map(function(element) {
      return element.toNumber();
    });

    setOwnedCitizens(newArray)
    setIsUpdating(false)
    console.log('Fetched wallets citizens')
  }
  
  //feed
  const feed = async (tokenId) => {
    console.log('Calling feed contract')
    setIsUpdating(true)

    let transaction = await contract.populateTransaction.feed(tokenId);
    await magic.wallet.sendGaslessTransaction(account,transaction)

    setIsUpdating(false)
    setInitiatlActions({tokenId: tokenId, currentAction: 'eatLots'})
  };

  //clean
  const clean = async (tokenId) => {
    console.log('Calling clean contract')
    setIsUpdating(true)

    let transaction = await contract.populateTransaction.clean(tokenId);
    await magic.wallet.sendGaslessTransaction(account,transaction)

    console.log('Cleaned')

    setIsUpdating(false)
    getCitizens();
    setInitiatlActions({})
  };

  function clickInfoHandler(modalData) {
    setModalData(modalData)
    setModalType('info')
    setIsOpen(true);
  }

  function clickHelpHandler() {
    setModalType('help')
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getCitizens();
  },[]);

  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalType === 'help'? helpModalStyle : infoModalStyle}
      >{modalType === 'help'? getHelpContent(closeModal) : getInfoModalContet(modalData, closeModal)}</Modal>
      <Header 
        account={account} 
        setAccount={setAccount} 
        clickHelpHandler={clickHelpHandler}
        getOwnedCitizens={getOwnedCitizens} 
        setOwnedCitizens={setOwnedCitizens}/>
      { getCitizenDone ? 
        <Board 
          charactersRef={characters}
          initialActions={initialActions} 
          isUpdating={isUpdating}
          setSelectedCitizen={setSelectedCitizen}/>: 'loading'}
      <Dashboard 
        charactersRef={characters} 
        account={account} 
        ownedCitizens={ownedCitizens} 
        selectedCitizen={selectedCitizen} 
        clickInfoHandler={clickInfoHandler}
        mint={mint} 
        clean={clean} 
        feed={feed}/>
    </div>
  );
}

export default App;

function getHelpContent(closeModal){
  return (<div className='modal-container'>
    <MdClose onClick={closeModal} style={{ color: "white", fontSize: "1em", right:'30px', position: 'absolute'}}/>
    <div style={{marginBottom: '20px'}}><b>How to play</b></div>
    <div style={{marginBottom: '20px'}}>1. Connect your wallet and mint a new citizen NFT to get started. NFT Town is limited to 4 citizens at a time</div>
    <div style={{marginBottom: '20px'}}>2. Feed your citizen to keep them happy. If their health goes to 0 they will leave town</div>
    <div style={{marginBottom: '20px'}}>3. If a citizen leaves town, it can be removed by anyone burning the NFT forever. This will make room for anyone to mint a new citizen</div>
    <div style={{marginBottom: '20px'}}></div>
    <div style={{marginBottom: '20px'}}><a href={'https://mumbai.polygonscan.com/address/0xb3d2381f29c2d0db43628a130f21b83772820499'} style ={{color:'white'}} target={"_blank"} rel="noreferrer">View contract</a></div>
  </div>)
}

function getInfoModalContet(data, closeModal){
  if(!data){return}

  return (<div className='modal-container'>
    <MdClose onClick={closeModal} style={{ color: "white", fontSize: "1em", right:'30px', position: 'absolute'}}/>
    <div style={{marginBottom: '20px'}}><b>On chain metadata</b></div>
    <div>id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.tokenId}</div>
    <div>animal: &nbsp;&nbsp;&nbsp;{data.animalId}</div>
    <div>color: &nbsp;&nbsp;&nbsp;&nbsp;{data.color}</div>
    <div>lastFed: &nbsp;&nbsp;{data.lastFed}</div>
    <div>maxTime: &nbsp;&nbsp;{data.maxTime}</div>
    <div>birthDate: {data.birthDate}</div>
  </div>)
}

const helpModalStyle = {
  content: {
    position: 'relative',
    top: '50%',
    left: '50%',
    width: '60%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    fontFamily: 'Monaco',
    backgroundColor: '#353739',
    borderRadius: '10px',
    fontSize: '20px',
    transform: 'translate(-50%, -50%)',
  },
};

const infoModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    fontFamily: 'Monospace',
    backgroundColor: '#353739',
    borderRadius: '10px',
    fontSize: '20px',
    transform: 'translate(-50%, -50%)',
  },
};