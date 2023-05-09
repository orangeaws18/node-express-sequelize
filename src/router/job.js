const express = require('express');
const { Op } = require("sequelize");

const models = require('../../beyondcsrsdb');


const { Carsenquiries, Optionitems, Enquiryoptionitem,
    Enquiryuser, Userdata, Chartitems } = models;

const router = express.Router();

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log('Time: ', Date.now())
//     next()
// })

router.get('/', async (req, res) => {

    const { year, month } = req.query;

    const days = new Date(year, month, 0).getDate();
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month - 1, days);

    const source = await Optionitems.findAll({
        attributes: ['id'],
        where: {
            value: { [Op.in]: ['Team B'] },
            titleId: 5,
            isEnable: true
        }
    })

    const status = await Optionitems.findAll({
        attributes: ['id'],
        where: {
            value: { [Op.in]: ['On Sale', 'Deposit', 'Sold', 'Cancel'] },
            titleId: 6,
            isEnable: true
        }
    })

    const category = await Optionitems.findAll({
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

    const enquiryOptionItems = await Enquiryoptionitem.findAll({
        attributes: ['enquiryId', 'optionItemId']
    });

    const sourceIds_enquiryId = enquiryOptionItems.filter(x => sourceIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);
    const statusIds_enquiryId = enquiryOptionItems.filter(x => statusIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);
    const categoryIds_enquiryId = enquiryOptionItems.filter(x => categoryIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);

    const enquiryIds = intersectMany(sourceIds_enquiryId, statusIds_enquiryId, categoryIds_enquiryId);

    const cars = await Carsenquiries.findAll({
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

    const year_month_enquiryIds = cars.map(car => car.id);

    const enquiryUser = await Enquiryuser.findAll({
        attributes: ['enquiryId', 'userId'],
        where: {
            enquiryId: { [Op.in]: year_month_enquiryIds }
        }
    });

    const users = await Userdata.findAll({
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
        name: `char2-${year}-${formatMonth}`,
        desc: `${formatMonth}月份 BJBM (B) 同事車盤對比`,
        value: JSON.stringify(data)
    }

    await Chartitems.create(db_row_data);

    const response = await Chartitems.findAll();

    res.send(response)
})

router.get('/delete', async (req, res) => {
    await Chartitems.destroy({
        where: {},
        truncate: true
    });
})

router.get('/pic', async (req, res) => {

    const today = new Date();
    const year = today.getFullYear();

    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    const source = await Optionitems.findAll({
        attributes: ['id'],
        where: {
            value: { [Op.in]: ['Team B'] },
            titleId: 5,
            isEnable: true
        }
    })

    const status = await Optionitems.findAll({
        attributes: ['id'],
        where: {
            value: { [Op.in]: ['On Sale', 'Deposit', 'Sold', 'Cancel'] },
            titleId: 6,
            isEnable: true
        }
    })

    const category = await Optionitems.findAll({
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

    const enquiryOptionItems = await Enquiryoptionitem.findAll({
        attributes: ['enquiryId', 'optionItemId']
    });

    const sourceIds_enquiryId = enquiryOptionItems.filter(x => sourceIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);
    const statusIds_enquiryId = enquiryOptionItems.filter(x => statusIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);
    const categoryIds_enquiryId = enquiryOptionItems.filter(x => categoryIds.some(y => y == x.optionItemId)).map(x => x.enquiryId);

    const enquiryIds = intersectMany(sourceIds_enquiryId, statusIds_enquiryId, categoryIds_enquiryId);

    const cars = await Carsenquiries.findAll({
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

    const enquiryUser = await Enquiryuser.findAll({
        attributes: ['enquiryId', 'userId'],
        where: {
            enquiryId: { [Op.in]: year_enquiryIds }
        }
    });

    const users = await Userdata.findAll({
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

    const db_row_data = {
        name: `char3-${year}`,
        desc: `${year} 每個月的車盤對比`,
        value: JSON.stringify(data)
    }

    res.send(db_row_data);
})

module.exports = router;

const intersection = (arr1, arr2) => {
    const res = [];
    for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) {
            continue;
        };
        res.push(arr1[i]);
    };
    return res;
}

const intersectMany = (...arrs) => {
    let res = arrs[0].slice();
    for (let i = 1; i < arrs.length; i++) {
        res = intersection(res, arrs[i]);
    };
    return res;
}