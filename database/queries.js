const Equipments = require('../models/equipment');
const Profile = require('../models/profile');

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
    },

    saveProfiles: function(profileInfo){
        return new Promise((resolve, reject) => {
            Profile.create(profileInfo, function (error, docs) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(docs);
            });
        });
    },

    cleanProfiles: function () {
        return new Promise((resolve, reject) => {
            Profile.remove(function (error) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(true);
            });
        });
    },

    getAvailableProfile: function(){
        return new Promise((resolve, reject) => {
            Profile.findOne({ assigned: false }, function (error, doc) {
                if (error) {
                    reject(error);
                    return;
                }
                doc.assigned = true;
                doc.save();
                resolve(doc);
            });
        });
    }
}