const Web3 = require('web3');
const Router = require('koa-router');
const router = new Router();

const SMART_CONTRACT_ABI = require('../utils/smartcontract').ABI;
const SMART_CONTRACT_ADDRESS = require('../utils/smartcontract').ADDRESS;

const Readable = require('stream').Readable
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const azure = require('azure');
const notificationHubService = azure.createNotificationHubService('obsidian-hub', 'Endpoint=sb://obsidian.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=XIia7HhtL0aVnnseg4HJW7abu+aROecKWb+nej2hnrc=');
const PROGRAMS_URL = "/programs";

const ETHEREUM_PROVIDER = "http://52.178.92.72:8545";
const web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));
const DEMO_ADDRESS = "0x101a4b7af0523bc8539d353eec163ac207ad680b";

const contractABI = web3Instance.eth.contract(SMART_CONTRACT_ABI);
const ObsidianSmartContract = contractABI.at(SMART_CONTRACT_ADDRESS);

router.get('/', async (ctx) => {
    ctx.body = 'API Working!';
})

router.get('/smartcontract', ctx => {
    ctx.body = {
        abi: SMART_CONTRACT_ABI,
        address: SMART_CONTRACT_ADDRESS
    };
})

router.post('/program', async (ctx) => {
    let jsonProgram = ctx.request.body;//TODO Validate    
    ctx.body = await addJsonToIPFS(jsonProgram);
});


router
    .get(`${PROGRAMS_URL}`, async (ctx) => {
        let programsInfo = await getProgramsInfo();
        //TODO, need to validate if there is no programs
        let programsResult = await getProgramsDetails(programsInfo);
        ctx.body = programsResult;
    })
    .get(`${PROGRAMS_URL}/:hash`, async (ctx) => {
        ctx.body = await getJsonFromIPFS(ctx.params.hash);
    });

const getNumberOfPrograms = () => {
    return new Promise((resolve, reject) => {
        ObsidianSmartContract.numberOfPrograms({}, (error, result) => {
            if (!error) {
                resolve(result.toNumber());
            }
        });
    });
}

const getProgramsDetails = (programsInfo) => {
    return new Promise((resolve, reject) => {
        var actions = programsInfo.map(getJsonFromIPFSBy);
        var results = Promise.all(actions);
        results.then(data => {
            console.log(data);
            resolve(data);
        });
    });
}
const getProgramsInfo = () => {
    return new Promise((resolve, reject) => {
        return getNumberOfPrograms()
            .then((numberOfPrograms) => {                
                if (numberOfPrograms == 0) {
                    resolve([]);
                }
                let programsInfo = [];
                for (let i = 1; i <= numberOfPrograms; i++) {
                    ObsidianSmartContract.programInfo(i, (error, result) => {
                        
                        programsInfo.push({
                            id: i,
                            ipfsHash: result[1]
                        });
                        if (i == numberOfPrograms) {
                            resolve(programsInfo);
                        }
                    });
                }
            });
    });
}

const addStreamToIPFS = (stream) => {
    return new Promise((resolve, reject) => {
        ipfs.util.addFromStream(stream, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result[0].hash);
        });
    });
}

const addJsonToIPFS = (json) => {
    return new Promise((resolve, reject) => {
        ipfs.addJSON(json, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

const convertJsonToStream = (json) => {
    let jsonString = JSON.stringify(json);
    let jsonStream = new Readable();
    jsonStream.push(jsonString);
    jsonStream.push(null);
    return jsonStream;
}

const getJsonFromIPFS = (hash) => {
    return new Promise((resolve, reject) => {
        ipfs.catJSON(hash, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

const getJsonFromIPFSBy = (programInfo) => {
    return new Promise((resolve, reject) => {
        ipfs.catJSON(programInfo.ipfsHash, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            result.programId = programInfo.id;
            resolve(result);
        });
    });
}
module.exports = router;