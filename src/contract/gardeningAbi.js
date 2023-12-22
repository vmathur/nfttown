export const abi = 
[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "zone",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "row",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "col",
				"type": "uint8"
			}
		],
		"name": "dig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "zone",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "row",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "col",
				"type": "uint8"
			}
		],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "zone",
				"type": "uint8"
			}
		],
		"name": "getZone",
		"outputs": [
			{
				"internalType": "uint256[336]",
				"name": "",
				"type": "uint256[336]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "grid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "forwarder",
				"type": "address"
			}
		],
		"name": "isTrustedForwarder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "zone",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "row",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "col",
				"type": "uint8"
			}
		],
		"name": "plant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]