import magic from "../utils/magic"
import './Header.css'

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
