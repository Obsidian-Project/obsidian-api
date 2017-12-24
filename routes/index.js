const Router = require('koa-router');
const router = new Router({
  prefix: 'equipments'
});
const queries = require('../database/queries');
const TRACTORS_TYPE = "tractors";
const PLANT_EQUIPMENTS_TYPE = "planting-equipments";
const TRACTORS_URL = `/${TRACTORS_TYPE}`;
const PLANT_EQUIPMENTS_URL = `/${PLANT_EQUIPMENTS_TYPE}`;

router.get('/', async (ctx) => {
  ctx.body = 'API Working!';
})

router
      .get(`${TRACTORS_URL}`, async (ctx) => {
          ctx.equipments = await queries.getEquipmentsByType(TRACTORS_TYPE);             
      })
      .get(`${TRACTORS_URL}/:equipmentId`, async (ctx) => {
          ctx.equipments = await queries.getEquipmentById(ctx.params.equipmentId);    
      });

router
      .get(`${PLANT_EQUIPMENTS_URL}`, async (ctx) => {
          ctx.equipments = await queries.getEquipmentsByType(PLANT_EQUIPMENTS_TYPE);             
      })
      .get(`${PLANT_EQUIPMENTS_URL}/:equipmentId`, async (ctx) => {
          ctx.equipments = await queries.getEquipmentById(ctx.params.equipmentId);   
          //TODO: error handling         
      });

module.exports = router;