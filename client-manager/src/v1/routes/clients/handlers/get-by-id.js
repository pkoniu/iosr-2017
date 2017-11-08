const _ = require('lodash');

module.exports = (clientsRepo) => {
    return (req, res, next) => {
        const id = _.get(req, 'params.id');
        return clientsRepo.getById(id)
            .then(client => {
                return res.status(200).json(client);
            }).catch(next);
    };
};
