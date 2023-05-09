const { Op } = require("sequelize");
const model = require('../../beyondcsrsdb');

const job = async () => {
    const today = new Date();
    const year = today.getFullYear();

    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    const source = await model.Optionitems.findAll({
        attributes: ['id'],
        where: {
            value: { [Op.in]: ['Team B'] },
            titleId: 5,
            isEnable: true
        }
    })

    const status = await model.Optionitems.findAll({
        attributes: ['id'],
        where: {
            value: { [Op.in]: ['On Sale', 'Deposit', 'Sold', 'Cancel'] },
            titleId: 6,
            isEnable: true
        }
    })

    const category = await model.Optionitems.findAll({
        attributes: ['id'],
        where: {
            value: { [Op.in]: ['BJBM (B)'] },
            titleId: 7,
            isEnable: true
        }
    })

    const sourceIds = source.map(x => x.id);
    const statusIds = status.map(x => x.id);
    const categoryIds = category.map(x => x.id);

    const enquiryOptionItems = await model.Enquiryoptionitem.findAll({
        attributes: ['enquiryId', 'optionItemId']
    });

    const sourceIds_enquiryId = enquiryOptionItems.filter(x => sourceIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);
    const statusIds_enquiryId = enquiryOptionItems.filter(x => statusIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);
    const categoryIds_enquiryId = enquiryOptionItems.filter(x => categoryIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);

    const enquiryIds = intersectMany(sourceIds_enquiryId, statusIds_enquiryId, categoryIds_enquiryId);

    const cars = await model.Carsenquiries.findAll({
        attributes: ['id', 'carDate'],
        where: {
            id: {
                [Op.in]: enquiryIds
            },
            cardate: {
                [Op.between]: [start, end]
            },
            isEnable: true
        }
    });

    const year_enquiryIds = cars.map(car => car.id);

    const enquiryUser = await model.Enquiryuser.findAll({
        attributes: ['enquiryId', 'userId'],
        where: {
            enquiryId: { [Op.in]: year_enquiryIds }
        }
    });

    const users = await model.Userdata.findAll({
        attributes: ['id', 'firstName', 'lastName'],
        where: {
            isEnable: true
        }
    });

    const data = users.map(user => {
        return {
            userName: `${user.firstName} ${user.lastName}`,
            count: enquiryUser.filter(x => x.userId == user.id).length
        }
    });

    const formatMonth = ("0" + month).slice(-2);

    const db_row_data = {
        name: `char3-${year}`,
        desc: `${formatMonth} 每個月的車盤對比`,
        value: JSON.stringify(data)
    }

    return db_row_data;

}

module.exports = job;