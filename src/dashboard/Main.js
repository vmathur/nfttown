import React, { useState, useEffect } from 'react';
import BananaCount from './BananaCount'

function Main(props) {
    return (
      <div className="banana-count">
        <BananaCount animal={'Monkey'} maxBananas={100} eatRate={5}/>
        <BananaCount animal={'Penguin'} maxBananas={80} eatRate={2}/>
      </div>
    );
  }
  
  export default Main;
  