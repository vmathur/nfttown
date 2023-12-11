import { Magic } from "magic-sdk";

const polygonNode = {
    rpcUrl:'https://polygon-mumbai.g.alchemy.com/v2/9b1326CuGOhpxr_RhB2QoPXKpfbuJsDF',
    chainId: 80001, // Polygon chain id 
}

const magic = new Magic("pk_live_BFB02F3E6751D40B", {network: polygonNode});

export default magic;