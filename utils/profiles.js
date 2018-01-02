const Web3 = require('web3');
const ETHEREUM_PROVIDER = "http://52.178.92.72:8545";
const web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));
const queries = require('../database/queries');
const DEMO_ADDRESS = require('./smartcontract').DEMO_ADDRESS;

const setupProfiles = () => {   
    let images = ["http://res.cloudinary.com/key-solutions/image/upload/v1514717276/Hackathon/tech-nation/obsidian/farmer1.png",
                  "http://res.cloudinary.com/key-solutions/image/upload/v1514717276/Hackathon/tech-nation/obsidian/farmer3.png",
                  "http://res.cloudinary.com/key-solutions/image/upload/v1514717276/Hackathon/tech-nation/obsidian/farmer2.png"];

    let accounts = web3Instance.eth.accounts;
    let accountFiltered = accounts.filter((item,index) => {
        return item != DEMO_ADDRESS;//only 3
    });
    let onlyThreeAccounts = accountFiltered.filter((item,index) => {
        return index < 2;//only 2
    });

    let names = ["Pedro Alcala", "Jose Lopez", "Juan Blanco"];
   
    let profiles = [];
    for(let i = 0; i < onlyThreeAccounts.length; i++){
        profiles.push({
            profileImageUrl: images[i],
            name: names[i],
            account: onlyThreeAccounts[i],
            assigned: false
        });        
    }

    return profiles;
}

module.exports = setupProfiles;