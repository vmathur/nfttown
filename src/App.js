import './App.css';
import Board from './game/Board'
import World from './game/World.js';
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
  const [selectedZone, setSelectedZone] = useState([1,1]);
  const [mapMode, setMapMode] = useState('game')

  //UI update variables
  const [isUpdating, setIsUpdating] = useState(true);

  //user variables
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
      owner: citizen.owner,
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
    const fetchData = async () => {
      await getCitizens(setCitizens);
      setIsUpdating(false);
      if(account){
        getOwnedCitizens(setOwnedCitizens, account)
      }
    }

    fetchData().catch(console.error);
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
        setOwnedCitizens={setOwnedCitizens}
        mapMode={mapMode}
        setMapMode={setMapMode}/>
      {mapMode === 'game' && 
        <Board 
        charactersRef={characters}
        initialActions={initialActions} 
        isUpdating={isUpdating}
        selectedZone={selectedZone}
        setSelectedCitizen={setSelectedCitizen}/>}
      {mapMode === 'world' && 
        <World 
        isUpdating={isUpdating}
        setSelectedZone={setSelectedZone}
        setMapMode={setMapMode}/>}
      <Dashboard 
        charactersRef={characters} 
        account={account} 
        ownedCitizens={ownedCitizens} 
        selectedCitizen={selectedCitizen} 
        clickInfoHandler={clickInfoHandler}
        setCitizens={setCitizens}
        setOwnedCitizens={setOwnedCitizens}
        setIsUpdating={setIsUpdating}
        setInitiatlActions={setInitiatlActions}/>
    </div>
  );
}

export default App;