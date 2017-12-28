const Router = require('koa-router');
const router = new Router();

const SMART_CONTRACT_ABI = require('../utils/smartcontract').ABI;
const SMART_CONTRACT_ADDRESS = require('../utils/smartcontract').ADDRESS;

const Readable = require('stream').Readable
const ipfsAPI = require('ipfs-api')

const azure = require('azure');
 const notificationHubService = azure.createNotificationHubService('obsidian-hub', 'Endpoint=sb://obsidian.servicebus.windows.net/;SharedAccessKeyName=DefaultFullSharedAccessSignature;SharedAccessKey=XIia7HhtL0aVnnseg4HJW7abu+aROecKWb+nej2hnrc=');

// connect to ipfs daemon API server
// connect to ipfs daemon API server
//const ipfs = ipfsAPI('https://ipfs.infura.io ', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values
//const ipfs = ipfsAPI('https://ipfs.infura.io', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values
// const IPFS = require('ipfs-mini');

// const ipfs = new IPFS({host: 'https://ipfs.infura.io', port: 5001, protocol: 'http'});

const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

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
        ipfs.addJSON('hello world!', (err, result) => {
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

  // result null 'QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j'
  
//   ipfs.catJSON('QmTp2hEo8eXRp6wg7jXv1BLCMh5a4F3B7buAUZNZUu772j', (err, result) => {
//     console.log(err, result);
//   });


const getJsonFromIPFS = (hash) => {
    return new Promise((resolve, reject) => {                   
        ipfs.cat(hash, (err, result) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
        });
    });
}

module.exports = router;