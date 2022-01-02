import './App.css';
import Board from './game/Board'
import Dashboard from './dashboard/Main'
import Music from './Music/Music'
import React, {useRef} from 'react'
import {initialCharacterParams} from './data/characterData'

function App() {
  let characterData = {}
  for (let character of initialCharacterParams){
    characterData[character.id] = {
      maxBananas: character.maxBananas, 
      bananasRemaining: character.maxBananas, 
      eatRate: character.eatRate
    }
  }
  let characters = useRef(characterData)

  return (
    <div className="App">
      <Board characters={characters}/>
      <Dashboard characters={characters}/>
      <Music/>
    </div>
  );
}

export default App;
