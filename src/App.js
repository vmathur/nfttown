import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'
import React, {useRef, useEffect, useState} from 'react'
import Modal from 'react-modal';
import { Magic } from "magic-sdk";
import {spriteData, startingLocation} from './data/characterData'
import {abi} from "./contract/abi"

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
        style={customModalStyles}
      >{getModalContet(modalData)}</Modal>
      <Header 
        account={account} 
        setAccount={setAccount} 
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

function getModalContet(data){
  if(!data){return}
  console.log(data.tokenId)

  return (<div className='modal-container'>
    <div style={{marginBottom: '20px'}}><b>On chain metadata</b></div>
    <div>id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.tokenId}</div>
    <div>animal: &nbsp;&nbsp;&nbsp;{data.animalId}</div>
    <div>color: &nbsp;&nbsp;&nbsp;&nbsp;{data.color}</div>
    <div>lastFed: &nbsp;&nbsp;{data.lastFed}</div>
    <div>maxTime: &nbsp;&nbsp;{data.maxTime}</div>
    <div>birthDate: {data.birthDate}</div>

  </div>)
}

const customModalStyles = {
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


// todo:
// get real assets for dog and turtle + all colors
// make header and dashboard in line with canvas
// audit control and verify
// add to polygon

//backlog
// new animations
// scale based on tile size
// dao
// animation optimization
