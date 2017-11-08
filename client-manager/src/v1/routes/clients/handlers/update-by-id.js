const _ = require('lodash');

module.exports = (clientsRepo) => {
    return (req, res, next) => {
        const id = _.get(req, 'params.id');
        const toUpdate = _.get(req, 'body', {});

        if (Object.keys(toUpdate).length === 0) {
            return next({
                status: 400,
                message: 'Updating client with empty data not allowed.'
            });
        }

        return clientsRepo.updateOne(id, toUpdate)
            .then(updateResult => {
                return res.status(200).json(updateResult);
            })
            .catch(next);
    };
};
