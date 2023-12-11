import { Magic } from "magic-sdk";
import './Header.css'

const polygonNode = {
  rpcUrl:'https://polygon-mumbai.g.alchemy.com/v2/9b1326CuGOhpxr_RhB2QoPXKpfbuJsDF',
  chainId: 80001, // Polygon chain id 
}

const magic = new Magic("pk_live_BFB02F3E6751D40B", {network: polygonNode});

function Header({account, setAccount, clickHelpHandler, getOwnedCitizens, setOwnedCitizens}) {
    async function handleLogin(){
      await magic.wallet.connectWithUI().then(data=>{
        setAccount(data[0])
        getOwnedCitizens(data[0]);
      })
    }

    async function handleWallet(){
      await magic.wallet.showUI().on("disconnect", ()=>{
        setAccount('')
      })
    }
  
    return (
      <div className="header-container">
        <div className="header-button-area">
        <button className="how-to-play-button button-secondary" onClick={clickHelpHandler}>How to play</button>

        {!account? 
          <button className="connect-button button-primary" onClick={handleLogin}>Connect</button> : 
          <span>
            <button className="disconnect-button button-secondary" onClick={handleWallet}>Account</button>
          </span>}
          </div>
      </div>
    );
}

export default Header;
