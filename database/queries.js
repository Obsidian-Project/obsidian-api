const Equipments = require('../models/equipment');

module.exports = {
    getEquipmentById: function (id) {
        return new Promise((resolve, reject) => {
            Equipments.find({ equipmentId: id }, function (error, docs) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(docs);
            });
        });
    },

    getEquipmentsByType: function(type){
        return new Promise((resolve, reject) => {
            Equipments.find({ type: type }, function (error, docs) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(docs);
            });
        });
    }
}