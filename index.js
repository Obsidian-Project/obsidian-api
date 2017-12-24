const Koa = require("koa");
const cors = require('koa-cors');
const Logger = require('koa-logger');
const koaBody = require('koa-body');

const indexRoutes = require('./routes/index');
const config = require('./database/config');
const connectDatabase = require('./database/connection');
const PORT = process.env.PORT || 4000;

const app = new Koa();
app.use(cors());
app.use(koaBody({ multipart: true }));
app.use(Logger());
app.use(indexRoutes.routes());

const server = app.listen(PORT, async () => {
  try {
    const info = await connectDatabase(config.db);
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);        
  } catch (error) {
    console.error('Unable to connect to database');
  }
  console.log(`API server listening on port: ${PORT}`);
});

module.exports = server;