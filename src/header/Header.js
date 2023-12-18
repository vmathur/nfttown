import magic from "../utils/magic"
import './Header.css'

function Header({account, setAccount, clickHelpHandler, getOwnedCitizens, setOwnedCitizens, mapMode, setMapMode}) {
    async function handleLogin(){
      let account = await magic.wallet.connectWithUI();
      localStorage.setItem('user', account[0])
      setAccount(account[0]);
      getOwnedCitizens(setOwnedCitizens, account[0]);
    }

    async function handleWallet(){
      await magic.wallet.showUI().on("disconnect", ()=>{
        setAccount('')
        setOwnedCitizens([])
        localStorage.setItem('user', '')
      })
    }

    function toggleMap(){
      if(mapMode==='game'){
        setMapMode('world')
      }else if(mapMode==='world'){
        setMapMode('game')
      }
    }
  
    return (
      <div className="header-container">
        <div className="header-button-area">
        {mapMode && mapMode==='game' ? <button className="view-map button-secondary button-header" onClick={toggleMap}>View town</button>:''}
        <button className="how-to-play-button button-secondary button-header" onClick={clickHelpHandler}>About</button>

        {!account? 
          <button className="connect-button button-primary button-header" onClick={handleLogin}>Connect</button> : 
          <span>
            <button className="disconnect-button button-secondary button-header" onClick={handleWallet}>Account</button>
          </span>}
          </div>
      </div>
    );
}

export default Header;
