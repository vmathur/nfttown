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
      <div style={{marginBottom: '20px'}}><b>How to play</b></div>
      <div style={{marginBottom: '20px', marginLeft: '20px'}}>1. Connect your wallet and mint a new citizen to get started, one per wallet. NFT Town is limited to {maxCitizens} citizens at a time</div>
      <div style={{marginBottom: '20px', marginLeft: '20px'}}>2. Feed your citizen to keep them happy. If their health goes to 0 they will leave town</div>
      <div style={{marginBottom: '20px', marginLeft: '20px'}}>3. If a citizen leaves town, it can be removed by anyone by burning the NFT forever. This will make room for anyone to mint a new citizen</div>
      <div style={{marginBottom: '20px'}}></div>
      <div style={{marginBottom: '20px'}}><a href={'https://mumbai.polygonscan.com/address/'+contractAddress+'#events'} style ={{color:'white'}} target={"_blank"} rel="noreferrer">View contract</a></div>
      <div style={{marginBottom: '20px'}}><a href={'https://github.com/vmathur/nfttown'} style ={{color:'white'}} target={"_blank"} rel="noreferrer">View source</a></div>

    </div>)
}