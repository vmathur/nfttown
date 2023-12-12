import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';
import { contractAddress } from '../contract/contractFunctions';

export default function InfoModal({modalIsOpen, closeModal, modalType, modalData}){
  Modal.setAppElement('#root');

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalType === 'help'? helpModalStyle : infoModalStyle}
      >{modalType === 'help'? getHelpContent(closeModal) : getInfoModalContet(modalData, closeModal)}
    </Modal>
    </div>)
} 

function getInfoModalContet(data, closeModal){
    if(!data){return}
  
    return (<div className='modal-container'>
      <MdClose onClick={closeModal} style={{ color: "white", fontSize: "1em", right:'30px', position: 'absolute'}}/>
      <div style={{marginBottom: '20px'}}><b>On chain metadata</b></div>
      <div>id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.tokenId}</div>
      <div>animal: &nbsp;&nbsp;&nbsp;{data.animalId}</div>
      <div>color: &nbsp;&nbsp;&nbsp;&nbsp;{data.color}</div>
      <div>lastFed: &nbsp;&nbsp;{data.lastFed}</div>
      <div>maxTime: &nbsp;&nbsp;{data.maxTime}</div>
      <div>birthDate: {data.birthDate}</div>
    </div>)
  }

function getHelpContent(closeModal){
    return (<div className='modal-container'>
      <MdClose onClick={closeModal} style={{ color: "white", fontSize: "1em", right:'30px', position: 'absolute'}}/>
      <div style={{marginBottom: '20px'}}><b>How to play</b></div>
      <div style={{marginBottom: '20px'}}>1. Connect your wallet and mint a new citizen NFT to get started. NFT Town is limited to 4 citizens at a time</div>
      <div style={{marginBottom: '20px'}}>2. Feed your citizen to keep them happy. If their health goes to 0 they will leave town</div>
      <div style={{marginBottom: '20px'}}>3. If a citizen leaves town, it can be removed by anyone burning the NFT forever. This will make room for anyone to mint a new citizen</div>
      <div style={{marginBottom: '20px'}}></div>
      <div style={{marginBottom: '20px'}}><a href={'https://mumbai.polygonscan.com/address/'+contractAddress} style ={{color:'white'}} target={"_blank"} rel="noreferrer">View contract</a></div>
      <div style={{marginBottom: '20px'}}><a href={'https://github.com/vmathur/nfttown'} style ={{color:'white'}} target={"_blank"} rel="noreferrer">View source</a></div>

    </div>)
}
  
const helpModalStyle = {
  content: {
    position: 'relative',
    top: '50%',
    left: '50%',
    width: '60%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    fontFamily: 'Monaco',
    backgroundColor: '#353739',
    borderRadius: '10px',
    fontSize: '20px',
    transform: 'translate(-50%, -50%)',
  },
};

const infoModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    fontFamily: 'Monospace',
    backgroundColor: '#353739',
    borderRadius: '10px',
    fontSize: '20px',
    transform: 'translate(-50%, -50%)',
  },
};
