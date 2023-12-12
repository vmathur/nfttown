import magic from '../utils/magic.js'
import { abi } from "./abi.js"

const ethers = require('ethers')
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

export const contractAddress ='0xb3d2381f29c2d0db43628a130f21b83772820499';

const contract = new ethers.Contract(
  contractAddress,
  abi,
  provider,
);

//get all citizens
export async function getCitizens(setCitizens){
    console.log('Fetching latest citizens')

    const result = await contract.getAllTokens();
    const convertedCitizens = result.map(function(element) {
      return {
        animal : element.animal.toNumber(),
        birthDate: element.birthDate.toNumber(),
        color : element.color.toNumber(),
        lastFed: element.lastFed.toNumber(),
        maxTime: element.maxTime.toNumber(),
        tokenId: element.tokenId.toNumber()
      };
    });

    setCitizens(convertedCitizens)
    console.log('Fetched citizens')
}

//get users citizens
export async function getOwnedCitizens(setOwnedCitizens, account){
    console.log('Fetching users citizens')

    const result = await contract.getAllOwnedTokenIDs(account);
    const newArray = result.map(function(element) {
      return element.toNumber();
    });

    setOwnedCitizens(newArray)
    console.log('Fetched users citizens')
}
  
//mint
export async function mint(setInitiatlActions, setCitizens, account){
    console.log('Calling mint')
    let transaction = await contract.populateTransaction.mint();
    await magic.wallet.sendGaslessTransaction(account,transaction)
    console.log('Minted')

    setInitiatlActions({})
    getCitizens(setCitizens);
    getOwnedCitizens(account);
};

//feed
export async function feed(tokenId, account, setCitizens, setInitiatlActions){
    console.log('Calling feed contract')
    let transaction = await contract.populateTransaction.feed(tokenId);
    await magic.wallet.sendGaslessTransaction(account, transaction)
    console.log('Called feed')
    
    getCitizens(setCitizens); 
    setInitiatlActions({tokenId: tokenId, currentAction: 'eatLots'})
};

//clean
export async function clean(tokenId, account, setCitizens, setInitiatlActions){
    console.log('Calling clean contract')
    let transaction = await contract.populateTransaction.clean(tokenId);
    await magic.wallet.sendGaslessTransaction(account,transaction)
    console.log('Cleaned')

    getCitizens(setCitizens); 
    setInitiatlActions({})
};