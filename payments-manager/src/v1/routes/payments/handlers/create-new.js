const _ = require('lodash');

//todo: di maybe?
const ordersService = require('./../../../repositories/remote/orders')();

module.exports = (paymentsRepo) => {
    return (req, res, next) => {
        const newPaymentDetails = _.get(req, 'body', {});

        if (Object.keys(newPaymentDetails).length === 0) {
            return next({
                status: 400,
                message: 'New payment details cannot be empty.'
            });
        }
        if (newPaymentDetails.orderId == null) {
            return next({
               status: 400,
               message: 'New payment orderId cannot be empty.'
           });
        }
        return ordersService.getById(newPaymentDetails.orderId)
            .then(order => {
                if(_.isEmpty(order)){
                    //todo handle non-existing order
                }
                return paymentsRepo.createNew(newPaymentDetails)
            })
            .then(creationResult => {
                return res.status(201).json(creationResult);
            }).catch(next);
    };
};
