import magic from '../utils/magic.js'

const ethers = require('ethers')
const provider = new ethers.providers.Web3Provider(magic.rpcProvider);

export default provider;