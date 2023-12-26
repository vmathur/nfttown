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
      try{
        await magic.wallet.showUI().on("disconnect", ()=>{
          setAccount('')
          setOwnedCitizens([])
          localStorage.setItem('user', '')
        })
      }catch(e){
        setAccount('')
        setOwnedCitizens([])
        localStorage.setItem('user', '')
      }
    }
  
    return (
      <div className="header-container">
        <div className="header-button-area">
        {/* {mapMode && mapMode==='game' ? <button className="view-map button-secondary button-header" onClick={toggleMap}>Zoom out</button>:''} */}
        <button className="how-to-play-button button-secondary button-header" onClick={clickHelpHandler}>Help</button>

        {!account? 
          <button className="connect-button button-primary button-header" onClick={handleLogin}>Connect</button> : 
          <span>
            <button className="disconnect-button button-secondary button-header" onClick={handleWallet}>Wallet</button>
          </span>}
          </div>
      </div>
    );
}

export default Header;
