const ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "membersPrograms",
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
		"inputs": [],
		"name": "numberOfProgramsRequest",
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
		"name": "numberOfProgramsDelivered",
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
		"name": "numberOfPrograms",
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
				"type": "uint256"
			}
		],
		"name": "programInfo",
		"outputs": [
			{
				"name": "delivered",
				"type": "bool"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"name": "costPerUnit",
				"type": "uint256"
			},
			{
				"name": "subsidyAmount",
				"type": "uint256"
			},
			{
				"name": "units",
				"type": "uint256"
			},
			{
				"name": "creator",
				"type": "address"
			},
			{
				"name": "equipmentId",
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
		"inputs": [],
		"name": "numberOfEquipmentsRequest",
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
		"name": "numberOfEquipmentsDelivered",
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
				"type": "uint256"
			}
		],
		"name": "equipmentsTransferred",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "programs",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "memberInfo",
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
				"type": "uint256"
			}
		],
		"name": "equipments",
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
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "membersEquipments",
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
				"type": "uint256"
			}
		],
		"name": "requestInfo",
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
		"name": "membersGroup",
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
		"name": "balance",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "programId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "newSubsidyRequested",
		"type": "event"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "programId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "newSubsidyTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "equipmentId",
				"type": "uint256"
			}
		],
		"name": "transferEquipment",
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
				"name": "equipmentId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "beneficiary",
				"type": "address"
			}
		],
		"name": "newEquipmentRequested",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"name": "costPerUnit",
				"type": "uint256"
			},
			{
				"name": "subsidyAmount",
				"type": "uint256"
			},
			{
				"name": "units",
				"type": "uint256"
			},
			{
				"name": "equipmentId",
				"type": "uint256"
			}
		],
		"name": "addProgram",
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
				"name": "programId",
				"type": "uint256"
			},
			{
				"name": "requester",
				"type": "address"
			}
		],
		"name": "requestSubsidy",
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
				"name": "equipmentId",
				"type": "uint256"
			},
			{
				"name": "requester",
				"type": "address"
			}
		],
		"name": "requestEquipment",
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
				"name": "equipmentId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "newEquipmentTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "programId",
				"type": "uint256"
			}
		],
		"name": "transfer",
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
				"name": "programId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "costPerUnit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "subsidyAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "units",
				"type": "uint256"
			}
		],
		"name": "newProgramAdded",
		"type": "event"
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
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

const SMARTCONTRACT_ADDRESS = "0xfcac619462a931eceb75db97f4059006bf05ee72";

const DEMO_ADDRESS = "0xa1ba512e67b885b38f4e41ebc2cfd316c7ff641e";

let SmartContractInfo = {    
    ABI,
	ADDRESS: SMARTCONTRACT_ADDRESS,
	DEMO_ADDRESS
}
module.exports = SmartContractInfo;
