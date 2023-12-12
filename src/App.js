import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'
import React, {useRef, useEffect, useState} from 'react'
import Modal from 'react-modal';
import {spriteData, spriteDimensions, startingLocation} from './data/characterData'
import { MdClose } from 'react-icons/md';
import { getCitizens, getOwnedCitizens } from './contract/contractFunctions.js';

Modal.setAppElement('#root');

function App() {
  //game objects
  const [citizens, setCitizens] = useState([]);
  const [ownedCitizens, setOwnedCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState([]);
  const [initialActions, setInitiatlActions] = useState({});

  //state variables
  const [isUpdating, setIsUpdating] = useState(false);
  const [getCitizenDone, setGetCitizenDone] = useState(false)

  //user objects
  const [account, setAccount] = useState(localStorage.getItem('user'));

  //modal
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
    setIsUpdating(true);
    setGetCitizenDone(false)
    getCitizens(setCitizens);
    if(account){
      getOwnedCitizens(setOwnedCitizens, account)
    }
    setGetCitizenDone(true)
    setIsUpdating(false);
  },[account]);

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
        setCitizens={setCitizens}
        setIsUpdating={setIsUpdating}
        setInitiatlActions={setInitiatlActions}/>
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