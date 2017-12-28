const Router = require('koa-router');
const router = new Router();

const SMART_CONTRACT_ABI = require('../utils/smartcontract').ABI;
const SMART_CONTRACT_ADDRESS = require('../utils/smartcontract').ADDRESS;

const Readable = require('stream').Readable
const ipfsAPI = require('ipfs-api')

// connect to ipfs daemon API server
// connect to ipfs daemon API server
//const ipfs = ipfsAPI('https://ipfs.infura.io ', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'}) // leaving out the arguments will default to these values

router.get('/', async (ctx) => {
  ctx.body = 'API Working!';
})

router.get('/smartcontract', ctx => {
    ctx.body = {
        abi: SMART_CONTRACT_ABI,
        address: SMART_CONTRACT_ADDRESS
    };
})

router.post('/program', ctx => {
    //to change
    //get the json object
    let streamJsonProgram = new Readable();
    let jsonProgram = ctx.request.body;
    //stringify the json
    let jsonProgramString = JSON.stringify(jsonProgram);
    streamJsonProgram.push(jsonProgramString);
    streamJsonProgram.push(null); 
    //push to ipfs and return hash?
    ipfs.add(streamJsonProgram, (err, result) => {
        if (err) {
          throw err
        }
        console.log(result)
        ipfs.cat(result[0].hash, (err, data) => {
            if (err) {
              return console.log(err);
            }
            
            console.log("DATA:" + data);
           });
      })
})




module.exports = router;