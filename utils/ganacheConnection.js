const Web3 = require('web3');
const SMART_CONTRACT_ABI = require('./smartcontract').ABI;
const SMART_CONTRACT_ADDRESS = require('./smartcontract').ADDRESS;
const MEMBER_ACCOUNT_1 = require('./smartcontract').MEMBER_ACCOUNT_1;
const MEMBER_ACCOUNT_2 = require('./smartcontract').MEMBER_ACCOUNT_2;
const DEMO_ADDRESS = require('./smartcontract').DEMO_ADDRESS;
const ETHEREUM_PROVIDER = "http://obsidian-node.westeurope.cloudapp.azure.com:8545";
const web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));
const contractABI = web3Instance.eth.contract(SMART_CONTRACT_ABI);
const ObsidianContract = contractABI.at(SMART_CONTRACT_ADDRESS);

const setupGanacheAccounts = (accounts) => {    
    return new Promise((resolve, reject) => {
        addMembers(accounts)
            .then(() => {
                registerGroup(accounts).then((result) => {
                    resolve(true);
                })
            }).catch((error) => {
                console.log(error);
                reject(false);
            })
    });
}

const registerGroup = (accounts) => {
    return new Promise((resolve, reject) => {
        ObsidianContract.registerGroup(accounts, {
            gas: 2000000,
            from: DEMO_ADDRESS
        }, (error, txHash) => {
            if (error) { throw error }
            waitForMined(txHash, { blockNumber: null },
                function pendingCB() {
                    // Signal to the user you're still waiting
                    // for a block confirmation
                },
                function successCB(data) {
                    resolve();//don't need to pass nothing
                }
            )
        })
    });
}

const addMembers = (accounts) => {
    return new Promise((resolve, reject) => {
        let actions = accounts.map(addMember);
        let results = Promise.all(actions);
        results.then(() => {
            resolve();
        });
    });
}
const addMember = (account) => {
    return new Promise((resolve, reject) => {
        ObsidianContract.addMember(account, 0, 0, 0, {
            gas: 2000000,
            from: DEMO_ADDRESS
        }, (error, txHash) => {
            if (error) { throw error }
            waitForMined(txHash, { blockNumber: null },
                function pendingCB() {
                    // Signal to the user you're still waiting
                    // for a block confirmation
                },
                function successCB(data) {
                    resolve();//don't need to pass nothing
                }
            )
        })
    });
}

const waitForMined = (txHash, response, pendingCB, successCB) => {
    if (response.blockNumber) {
        successCB();
    } else {
        pendingCB()
        pollingLoop(txHash, response, pendingCB, successCB)
    }
}

const pollingLoop = (txHash, response, pendingCB, successCB) => {
    setTimeout(function () {
        web3Instance.eth.getTransaction(txHash, (error, response) => {
            if (error) { throw error }
            if (response === null) {
                response = { blockNumber: null }
            }
            waitForMined(txHash, response, pendingCB, successCB)
        })
    }, 1000);
}

module.exports = setupGanacheAccounts;
