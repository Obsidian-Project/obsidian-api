const Router = require('koa-router');
const router = new Router();

const SMART_CONTRACT_ABI = require('../utils/smartcontract').ABI;
const SMART_CONTRACT_ADDRESS = require('../utils/smartcontract').ADDRESS;

const Readable = require('stream').Readable
const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const azure = require('azure');
const notificationHubService = azure.createNotificationHubService('obsidian-hub', 'Endpoint=sb://obsidian.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=XIia7HhtL0aVnnseg4HJW7abu+aROecKWb+nej2hnrc=');

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

router.get('/program/:hash', async (ctx) => {
    ctx.body = await getJsonFromIPFS(ctx.params.hash);
})

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
            if(err){                
                reject(err);
                return;
            }
            resolve(result);
          });
    });

}

ipfs.addJSON({ somevalue: 2, name: 'Nick' }, (err, result) => {
    console.log(err, result);
  });
  
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

module.exports = router;