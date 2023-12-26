import './GameModal.css';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { contractAddress } from './contract/contractFunctions';
import { maxCitizens } from './utils/constants';

export default function InfoModal({modalIsOpen, closeModal, modalType, modalData}){
  Modal.setAppElement('#root');

  return (
    <div>
      <Modal
        className={'game-modal'}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >{modalType === 'help'? getHelpContent(closeModal) : getInfoModalContet(modalData, closeModal)}
    </Modal>
    </div>)
} 

function getInfoModalContet(data, closeModal){
    if(!data){return}
  
    return (<div className={'modal-style'}>
      <MdClose onClick={closeModal} style={{ color: "white", fontSize: "1em", right:'30px', position: 'absolute'}}/>
      <div style={{marginBottom: '20px'}}><b>On chain metadata</b></div>
      <div>owner: &nbsp;&nbsp;&nbsp;&nbsp;{data.owner}</div>
      <div>tokenId:&nbsp;&nbsp;&nbsp;{data.tokenId}</div>
      <div>animal: &nbsp;&nbsp;&nbsp;{data.animalId}</div>
      <div>color: &nbsp;&nbsp;&nbsp;&nbsp;{data.color}</div>
      <div>birthDate: {data.birthDate}</div>
      <div>lastFed: &nbsp;&nbsp;{data.lastFed}</div>
      <div>maxTime: &nbsp;&nbsp;{data.maxTime}</div>
    </div>)
  }

function getHelpContent(closeModal){
    return (<div className={'modal-style'}>
      <MdClose onClick={closeModal} style={{ color: "white", fontSize: "1em", right:'30px', position: 'absolute'}}/>
      {/* <div style={{marginBottom: '20px'}}><b>How to play</b></div> */}
      <div style={{marginBottom: '20px', marginLeft: '0px'}}>NFT Town is an on-chain game inspired by animal crossing and tamagotchi.</div>
      <ol>
      <li style={{marginBottom: '20px', marginLeft: '20px'}}>Connect your wallet and mint a citizen NFT, one per wallet. NFT Town is limited to {maxCitizens} citizens.</li>
      <li style={{marginBottom: '20px', marginLeft: '20px'}}>Feed your citizen to keep them happy. If their hunger gets too low, they will leave town. If a citizen leaves town it can be removed by anyone, burning the NFT forever.</li>
      <li style={{marginBottom: '20px', marginLeft: '20px'}}>Make NFT Town home! People that own citizen NFTs can dig and patch holes by clicking the shovel icon.</li>
      </ol>
      <br/>
      <div style={{marginBottom: '20px'}}><a href={'https://mumbai.polygonscan.com/address/'+contractAddress} style ={{color:'white'}} target={"_blank"} rel="noreferrer">View smart contract</a></div>
      <div style={{marginBottom: '20px'}}><a href={'https://github.com/vmathur/nfttown'} style ={{color:'white'}} target={"_blank"} rel="noreferrer">View source code</a></div>

    </div>)
}