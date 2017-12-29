//TODO: just to share between clients and get data from remix

const ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfMembers",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfGroups",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "membersInfo",
		"outputs": [
			{
				"name": "latitude",
				"type": "string"
			},
			{
				"name": "longitude",
				"type": "string"
			},
			{
				"name": "sizeOfLand",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "members",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "element",
				"type": "uint256"
			}
		],
		"name": "getGroupInfo",
		"outputs": [
			{
				"components": [
					{
						"name": "members",
						"type": "address[]"
					}
				],
				"name": "groupInformation",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newMember",
				"type": "address"
			},
			{
				"name": "latitude",
				"type": "string"
			},
			{
				"name": "longitude",
				"type": "string"
			},
			{
				"name": "sizeOfLand",
				"type": "uint256"
			}
		],
		"name": "addMember",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newGroupMembers",
				"type": "address[]"
			}
		],
		"name": "registerGroup",
		"outputs": [
			{
				"name": "result",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "memberAdress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "isRegistered",
				"type": "bool"
			}
		],
		"name": "newMemberAdded",
		"type": "event"
	}
];

const ADDRESS = "0x041c46c4f1f17282a1e92391ad614e6de17118e9";

let SmartContractInfo = {    
    ABI,
    ADDRESS
}
module.exports = SmartContractInfo;
