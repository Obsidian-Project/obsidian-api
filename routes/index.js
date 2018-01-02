const Web3 = require('web3');
const Router = require('koa-router');
const router = new Router();

const SMART_CONTRACT_ABI = require('../utils/smartcontract').ABI;
const SMART_CONTRACT_ADDRESS = require('../utils/smartcontract').ADDRESS;
const DEMO_ADDRESS = require('../utils/smartcontract').DEMO_ADDRESS;

const Readable = require('stream').Readable
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// const azure = require('azure');
// const notificationHubService = azure.createNotificationHubService('obsidian-hub', 'Endpoint=sb://obsidian.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=XIia7HhtL0aVnnseg4HJW7abu+aROecKWb+nej2hnrc=');
const PROGRAMS_URL = "/programs";

const ETHEREUM_PROVIDER = "http://52.178.92.72:8545";
const web3Instance = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));

const contractABI = web3Instance.eth.contract(SMART_CONTRACT_ABI);
const ObsidianSmartContract = contractABI.at(SMART_CONTRACT_ADDRESS);
const queries = require('../database/queries');

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


router.get('/programinfo', async (ctx) => {
    ctx.body = await getProgramInformationForGovernment();
});

router.get('/myequipments', async (ctx) => {
    //get my list of equipments, the ones in smart contract
    //call get equipment, with actions all
    // let programsInfo = await getProgramsInfo();
    // let equipments = await getProgramsDetails(programsInfo);
    // let filteredEquipments = equipments.filter((item) => {
    //     return item.delivered == true;
    // })
    let result = await getMyEquipmentsInformation();
    ctx.body = result;
});

router.get('/accountInfo', async (ctx) => {
    if (ctx.query.isweb) {
        ctx.body = { account: DEMO_ADDRESS };
        return;
    }
    let profileInfo = await queries.getAvailableProfile(ctx.query.isweb);
    ctx.body = profileInfo;
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

const getProgramInformationForGovernment = () => {
    return new Promise((resolve, reject) => {
        return getProgramsInfo().then((programsInfo) => {
            return getProgramsDetails(programsInfo).then((programsResult) => {
                let unitsArray = programsResult.map((item) => {
                    return item.units
                });
                let units = 0;
                for (let i = 0; i < unitsArray.length; i++) {
                    units += unitsArray[i].toNumber();
                }
                let response = {
                    numberOfPrograms: programsResult.length,
                    subsidiesDeliverd: programsResult.filter((item) => {
                        return item.delivered == true;
                    }).length,
                    units: units
                }
                resolve(response);
            });
        });
    });
}
//obtener todos los equipos transferidos
//obtener todos los programas liberados
//filter los equipos liberados con los equipos dentro de los programas liberados
//o poner la informacion en los equipos, con la informacion de los programas

const getMyEquipmentsInformation = () => {
    return new Promise((resolve, reject) => {
        getNumberOfEquipmentsTransferrred()
            .then((equipmentIndexes) => {

                let getEquipmentId = equipmentIndexes.map(getEquipmentsTransferred);
                let equipmentIdsPromise = Promise.all(getEquipmentId);
                equipmentIdsPromise.then((equipmentIds) => {
                    let actions = equipmentIds.map(getEquipmentsInformation);
                    let results = Promise.all(actions);
                    results.then((equipmentsResult) => {
                        getProgramsInfo().then((programsInfo) => {
                            getProgramsDetails(programsInfo).then((equipmentsInPrograms) => {
                                let programsDelivered = equipmentsInPrograms.filter((item) => {
                                    return item.delivered == true;
                                });

                                let newEquipmentsResult = equipmentsResult.map((item) => {
                                    for (let i = 0; i < programsDelivered.length; i++) {
                                        if (item.equipmentId == programsDelivered[i].selectedEquipment.equipmentId) {
                                            item.hasSubsidy = true;
                                            item.subsidyAmount = programsDelivered[i].subsidyAmount.toNumber();
                                        }
                                    }
                                    return item;
                                });
                                resolve(newEquipmentsResult);
                            });
                        });
                    });
                })
            });
    });
}

const getEquipmentsTransferred = (id) => {
    return new Promise((resolve, reject) => {
        ObsidianSmartContract.equipmentsTransferred(id, (error, result) => {
            resolve(result.toNumber());
        });
    })
}
const getNumberOfEquipmentsTransferrred = () => {
    return new Promise((resolve, reject) => {
        ObsidianSmartContract.numberOfEquipmentsDelivered((error, result) => {

            let numberOfEquipments = result.toNumber();
            if (numberOfEquipments == 0) {
                resolve([]);
            }
            let equipmentsArray = [];
            for (let i = 1; i <= numberOfEquipments; i++) {
                equipmentsArray.push(i);
            }
            resolve(equipmentsArray);
        });
    })
}

const getEquipmentsInformation = (equipmentId) => {
    return new Promise((resolve, reject) => {
        queries.getEquipmentById(equipmentId).then((equipment) => {
            resolve(equipment[0]);
        });
    })
}

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

const getProgramInformation = (programId) => {
    return new Promise((resolve, reject) => {
        ObsidianSmartContract.programInfo(programId, (error, result) => {
            let programInfo = {
                id: programId,
                ipfsHash: result[1],
                delivered: result[0],
                costPerUnit: result[2],
                subsidyAmount: result[3],
                units: result[4]
            };
            resolve(programInfo);
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
                let programsArray = [];
                for (let i = 0; i < numberOfPrograms; i++) {
                    programsArray.push(i + 1);//to start program with 1
                }
                var actions = programsArray.map(getProgramInformation);
                var results = Promise.all(actions);
                results.then(data => {
                    resolve(data);
                });
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
            result.ipfsHash = programInfo.ipfsHash;

            result.delivered = programInfo.delivered;
            result.costPerUnit = programInfo.costPerUnit;
            result.subsidyAmount = programInfo.subsidyAmount;
            result.units = programInfo.units;
            resolve(result);
        });
    });
}
module.exports = router;