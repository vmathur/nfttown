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
				"internalType": "uint16",
				"name": "zone",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "row",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "col",
				"type": "uint16"
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
				"internalType": "uint16",
				"name": "zone",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "row",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "col",
				"type": "uint16"
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
				"internalType": "uint16",
				"name": "zone",
				"type": "uint16"
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
				"internalType": "uint16",
				"name": "zone",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "row",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "col",
				"type": "uint16"
			}
		],
		"name": "plant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]