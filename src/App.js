import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'
import React, {useRef, useEffect, useState} from 'react'
import Modal from 'react-modal';
import { Magic } from "magic-sdk";
import {spriteData, spriteDimensions, startingLocation} from './data/characterData'
import {abi} from "./contract/abi"
import { MdClose } from 'react-icons/md';

const Web3 = require('web3');

const magic = new Magic("pk_live_1028C005B37C96E7", {
  network: "goerli",
});
const web3 = new Web3(magic.rpcProvider);
const contractAddress ='0xdd8245b6394f31159c5d22a0e2526ab87838b5c9'

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

  // characterData3[0].imgSource = spriteData['3']['0'].imgSource;
  // characterData3[1].imgSource = spriteData['2']['0'].imgSource;
  // characterData3[2].imgSource = spriteData['1']['0'].imgSource;
  // characterData3[3].imgSource = spriteData['0']['0'].imgSource;
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
    setInitiatlActions({tokenId: tokenId, currentAction: 'eatLots'})
  };

  const clean = async (tokenId) => {
    console.log('calling clean contract')
    setIsUpdating(true)
    const contract = new web3.eth.Contract(abi, contractAddress);
    await contract.methods.clean(tokenId).send({ from: account });
    setIsUpdating(false)
    getCitizens();
    setInitiatlActions({})
  };

  const mint = async () => {
    console.log('calling mint contract')
    setIsUpdating(true)
    const contract = new web3.eth.Contract(abi, contractAddress);
    const receipt = await contract.methods.mint().send({ from: account });
    console.log(receipt)
    setIsUpdating(false)
    setInitiatlActions({})
    getCitizens();
    getOwnedCitizens(account);
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