const Sequelize = require("sequelize");

const Carsenquiries = require('./model/carsenquiries');
const Optionitems = require('./model/optionitems');
const Enquiryoptionitem = require('./model/enquiryoptionitem');
const Enquiryuser = require('./model/enquiryuser');
const Userdata = require('./model/userdata');
const Chartitems = require('./model/chartitems');

const sequelize = new Sequelize('beyondcarsdb', 'db_admin', 'beyondcars123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        freezeTableName: true
    }
})

const model = {
    Carsenquiries: Carsenquiries.init(sequelize),
    Optionitems: Optionitems.init(sequelize),
    Enquiryoptionitem: Enquiryoptionitem.init(sequelize),
    Enquiryuser: Enquiryuser.init(sequelize),
    Userdata: Userdata.init(sequelize),
    Chartitems: Chartitems.init(sequelize),
}

module.exports = model