import './App.css';
import Board from './game/Board'
import World from './game/World.js';
import Dashboard from './dashboard/Dashboard'
import Header from './header/Header'
import React, {useRef, useEffect, useState} from 'react'
import InfoModal from "./utils/infoModal.js"
import {spriteData, spriteDimensions } from './data/characterData'
import { getCitizens, getOwnedCitizens } from './contract/contractFunctions.js';
import { maxCitizens } from "./utils/constants.js" 
import { startingPosition } from './utils/startingPosition.js';

function App() {
  //game objects
  const [citizens, setCitizens] = useState([]);
  const [ownedCitizens, setOwnedCitizens] = useState([]);
  const [selectedCitizen, setSelectedCitizen] = useState([]);
  const [initialActions, setInitiatlActions] = useState({});
  const [selectedZone, setSelectedZone] = useState(1);
  const [mapMode, setMapMode] = useState(window.innerWidth>1000? 'game' : 'world')

  //UI update variables
  const [isUpdating, setIsUpdating] = useState(false);

  //user variables
  const [account, setAccount] = useState(localStorage.getItem('user'));

  //modal
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [modalType, setModalType] = useState('help');

  let citizensInSelectedZone = []
  if(mapMode==='game'){
    citizensInSelectedZone = splitCitizensIntoGroups(citizens, selectedZone);
  }else if(mapMode==='world'){
    citizensInSelectedZone=citizens;
  }

  let characterData = []
  if(citizensInSelectedZone.length>0){
    for (const [i, citizen] of citizensInSelectedZone.entries()){
      if(i>=maxCitizens){break}
    
      let spriteMap = spriteData[String(citizen.animal)][String(citizen.color)];
      let currentLocation = startingPosition();
      characterData.push({
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
  }

  let characters = useRef([])
  characters.current=characterData

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
      setIsUpdating(true);
      let cits = await getCitizens(setCitizens);
      setIsUpdating(false);
      if(account){
        let owned = await getOwnedCitizens(setOwnedCitizens, account)
        let zone = getOwnedCitizenZoneFromCitizens(owned, cits);
        setSelectedZone(zone);
      }
    }

    fetchData().catch(console.error)
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

function splitCitizensIntoGroups(citizens, selectedZone) {
  const groups = [];
  let currentGroup = [];

  for (let i = 0; i < citizens.length; i++) {
    currentGroup.push(citizens[i]);

    if (currentGroup.length === 4 || i === citizens.length - 1) {
      groups.push([...currentGroup]); // Make a copy of the current group
      currentGroup = []; // Reset the current group
    }
  }

  if(groups[selectedZone-1]){
    return groups[selectedZone-1];
  }else{
    return []
  }
}

function getOwnedCitizenZoneFromCitizens(ownedCitizen, citizens){
  let zone = 1;
  let tokenId = ownedCitizen[0]
  for(let i=0;i<citizens.length;i++){
    if(citizens[i].tokenId===tokenId){
      zone=Math.floor(i/4)+1
    }
  }
  return zone;
}

export default App;