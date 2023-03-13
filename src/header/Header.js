import { Magic } from "magic-sdk";
import './Header.css'

const magic = new Magic("pk_live_1028C005B37C96E7", {
    network: "goerli",
});

function Header({account, setAccount, getOwnedCitizens, setOwnedCitizens}) {
    async function handleLogin(){
      await magic.wallet.connectWithUI().then(data=>{
        setAccount(data[0])
        getOwnedCitizens(data[0]);
      })
    }
  
    async function handleLogout(){
      await magic.wallet.disconnect().then(data=>{
        setAccount("")
        setOwnedCitizens('')
      })
    }
  
    async function showWallet(){
      const walletInfo = await magic.wallet.getInfo();
      const walletType = walletInfo.walletType;
      if (walletType === "magic") {
        await magic.wallet.showUI();
      };
    }
  
    return (
      <div className="header-container">
        {!account? 
          <div><button className="connect-button button-primary" onClick={handleLogin}>Login</button></div> : 
          <div>
            <button className="view-account-button button-secondary" onClick={showWallet}>View account</button>
            <button className="logout-button button-secondary" onClick={handleLogout}>Logout</button>
          </div>}
      </div>
    );
}

export default Header;