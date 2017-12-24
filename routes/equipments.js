const Router = require('koa-router');
const router = new Router({
  prefix: '/equipments'
});
const queries = require('../database/queries');
const TRACTORS_TYPE = "tractors";
const PLANT_EQUIPMENTS_TYPE = "planting-equipments";
const TRACTORS_URL = `/${TRACTORS_TYPE}`;
const PLANT_EQUIPMENTS_URL = `/${PLANT_EQUIPMENTS_TYPE}`;

router
      .get(`${TRACTORS_URL}`, async (ctx) => {
          ctx.body = await queries.getEquipmentsByType(TRACTORS_TYPE);             
      })
      .get(`${TRACTORS_URL}/:equipmentId`, async (ctx) => {
         let equipment = await queries.getEquipmentById(ctx.params.equipmentId);
         if(equipment.length == 0)
            return ctx.status = 404;
         ctx.body = equipment;         
      });

router
      .get(`${PLANT_EQUIPMENTS_URL}`, async (ctx) => {
          ctx.body = await queries.getEquipmentsByType(PLANT_EQUIPMENTS_TYPE);             
      })
      .get(`${PLANT_EQUIPMENTS_URL}/:equipmentId`, async (ctx) => {
        let equipment = await queries.getEquipmentById(ctx.params.equipmentId);
        if(equipment.length == 0)
           return ctx.status = 404;
        ctx.body = equipment;           
      });

module.exports = router;