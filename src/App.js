import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'
import React, {useRef, useEffect, useState} from 'react'
import InfoModal from "./utils/infoModal.js"
import {spriteData, spriteDimensions, startingLocation} from './data/characterData'
import { getCitizens, getOwnedCitizens } from './contract/contractFunctions.js';

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
    setModalType('metadata')
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
      <InfoModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        modalType={modalType}
        modalData={modalData}
      />
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