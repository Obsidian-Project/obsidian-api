const chai = require('chai');
const expect = chai.expect;
const queries = require('../database/queries');


describe("Scrapper", () => {
    it('should get all tractors', (done) => {
        queries.getEquipmentsByType("tractors")
            .then(function (res) {
                expect(res.length).to.equal(15);
                done();
        });
    });

    it('should get 1 tractor', (done) => {
        queries.getEquipmentById(1)
            .then(function (res) {
                expect(res.length).to.equal(15);
                done();
        });
    });   

    it('should get all plant equipments', (done) => {
        queries.getEquipmentsByType("plant-equipments")
            .then(function (res) {
                expect(res.length).to.equal(15);
                done();
        });
    });

    it('should get 1 plant equipments', (done) => {
        queries.getEquipmentById(1)
            .then(function (res) {
                expect(res.length).to.equal(15);
                //expect(res).to.include.all.keys('category', 'model', 'details', 'images');                        
                done();
        });
    });
});
