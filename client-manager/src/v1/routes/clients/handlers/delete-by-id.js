const _ = require('lodash');

module.exports = (clientsRepo) => {
    return (req, res, next) => {
        const id = _.get(req, 'params.id');
        return clientsRepo.deleteOne(id)
            .then(deletionResult => {
                return res.status(200).json(deletionResult);
            }).catch(next);
    };
};
