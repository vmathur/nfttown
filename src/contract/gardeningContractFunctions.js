import magic from '../utils/magic.js'
import provider from '../utils/ethers.js'
import { abi } from "./gardeningAbi.js"
import { map1Dto2DArray} from "../utils/zones.js"

const ethers = require('ethers')
export const contractAddress ='0xC6fc1EAFA39433a5D8320015127861000853b6a4';

const contract = new ethers.Contract(
  contractAddress,
  abi,
  provider,
);

//get all citizens
export async function plant(selectedZone, x,y, setGarden, account){
    console.log('Planting')

    let transaction = await contract.populateTransaction.plant(selectedZone-1, x-1,y-1);
    let result = await magic.wallet.sendGaslessTransaction(account,transaction)

    getGardenFromZone(selectedZone, setGarden)
    console.log('Planted')
    return result;
}

export async function dig(selectedZone, x,y, setGarden, account){
  console.log('Digging')
  let transaction = await contract.populateTransaction.dig(selectedZone, y,x);
  let result = await magic.wallet.sendGaslessTransaction(account,transaction);
  console.log('Dug')
  getGardenFromZone(selectedZone, setGarden)
  return result;
}

export async function getGardenFromZone(selectedZone, setGarden){
  console.log('Fetching garden')
  const result = await contract.getZone(selectedZone);
  let grid = map1Dto2DArray(result,14,24)
  console.log('Fetched garden')
  setGarden(grid)
  return grid
}