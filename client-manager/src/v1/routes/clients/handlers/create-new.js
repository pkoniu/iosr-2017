const _ = require('lodash');

module.exports = (clientsRepo) => {
    return (req, res, next) => {
        const newClientData = _.get(req, 'body', {});

        if (Object.keys(newClientData).length === 0) {
            return next({
                status: 400,
                message: 'New client data cannot be empty.'
            });
        }

        return clientsRepo.createNew(newClientData)
            .then(creationResult => {
                return res.status(201).json(creationResult);
            }).catch(next);
    };
};
