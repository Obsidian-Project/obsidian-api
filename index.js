const Koa = require("koa");
const cors = require('koa-cors');
const Logger = require('koa-logger');
const koaBody = require('koa-body');
const indexRoutes = require('./routes/index');
const equipmentRoutes = require('./routes/equipments');
const config = require('./database/config');
const connectDatabase = require('./database/connection');
const setupGanacheAccounts = require('./utils/ganacheConnection');
const setupProfiles = require('./utils/profiles');
const queries = require('./database/queries');
const PORT = process.env.PORT || 4000;

const app = new Koa();
app.use(cors());
app.use(koaBody({ multipart: true }));
app.use(Logger());
app.use(indexRoutes.routes());
app.use(equipmentRoutes.routes());

const server = app.listen(PORT, async () => {
  try {
    const info = await connectDatabase(config.db); 
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    const profilesInfo = setupProfiles();
    const cleanDb = await queries.cleanProfiles();
    const accounts = profilesInfo.map((item) => {
      return item.account;
    })
    const savedItems = await queries.saveProfiles(profilesInfo);
    const setupGanache = await setupGanacheAccounts(accounts);
    console.log(`Ethereum accounts setup: ${setupGanache}`);

  } catch (error) {
    console.error('Unable to connect to database');
  }
  console.log(`API server listening on port: ${PORT}`);
});

module.exports = server;